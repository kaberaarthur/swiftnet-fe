'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert, Badge, Button, Card, CardBody, CardHeader, Col, Collapse, Container, FormGroup, Input, Label, Progress, Row, Spinner, Table,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { RootState } from '../../../../Redux/Store';
import config from '../../config/config.json';

// ---------------------------------------------------------------------------
// Types (match swiftnet-be/plan_migration/allRoutes.js)
// ---------------------------------------------------------------------------
type Phase = 'not_started' | 'db_done' | 'router_in_progress' | 'needs_attention' | 'complete' | 'rolled_back';
type Level = 'info' | 'success' | 'warning' | 'error';

interface MeResponse {
  user: { id: number; name?: string; email?: string; user_type: string; company_id: number | null };
  can_migrate: boolean;
  scope: string;
}

interface RouterOverview {
  id: number;
  router_name: string;
  ip_address: string;
  clients: number;
  logged: number;
  pending: number;
  upgraded: number;
  failed: number;
  rolled_back: number;
  sms_sent: number;
  sms_failed: number;
  plans_created: number;
  plans_repriced: number;
  phase: Phase;
  router_backup_at: string | null;
  last_event: { action: string; level: Level; message: string; created_at: string } | null;
}

interface Overview {
  backup_tables: Record<string, boolean>;
  totals: {
    routers: number; routers_complete: number; routers_started: number; clients: number; logged: number;
    upgraded: number; pending: number; failed: number; sms_sent: number; sms_failed: number; plans_created: number;
  };
  config: { speed_shift: Record<string, number>; new_prices: Record<string, number>; weekly_package: { mbps: number; price: number; validity: number } };
  routers: RouterOverview[];
}

interface ServerEvent {
  id: number; router_id: number | null; router_name: string | null; action: string; level: Level;
  message: string; created_at: string; user_name: string | null; user_email: string | null;
}

interface ClientRow {
  client_id: number; secret: string; old_plan_name: string; new_plan_name: string; old_mbps: number; new_mbps: number;
  plan_fee: string | number; router_status: string; sms_status: string; error: string | null; updated_at: string;
}

interface Preview {
  plans_found: Record<string, { id: number; plan_name: string; plan_price: number | string }[]>;
  weekly_plan: { id: number; plan_name: string } | null;
  plans_to_create: { plan_name: string; mbps: number; rate_limit_string: string; plan_price: number; plan_validity: number; copied_from: string }[];
  price_changes: { plan_id: number; plan_name: string; old_price: number; new_price: number }[];
  client_moves: Record<string, number>;
  clients_to_move: number;
  clients_skipped: { client_id: number; secret: string; reason: string }[];
  plans_with_unknown_speed: { id: number; plan_name: string; rate_limit_string: string }[];
  warnings: string[];
}

interface LogEntry {
  key: string;
  time: string;
  level: Level;
  source: 'server' | 'page';
  router?: string | null;
  user?: string | null;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiResult = Record<string, any>;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const PHASES: Record<Phase, { label: string; color: string }> = {
  not_started: { label: 'Not started', color: 'secondary' },
  db_done: { label: 'DB done – router pending', color: 'info' },
  router_in_progress: { label: 'Router in progress', color: 'primary' },
  needs_attention: { label: 'Needs attention', color: 'warning' },
  complete: { label: 'Complete', color: 'success' },
  rolled_back: { label: 'Rolled back', color: 'dark' },
};

const LEVEL_COLORS: Record<Level, string> = { info: '#9cdcfe', success: '#4ec9b0', warning: '#dcdcaa', error: '#f48771' };

const fmtTime = (value: string) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? value : d.toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'medium' });
};

const kes = (value: number | string) => `Kes ${Number(value).toLocaleString('en-KE')}`;

const StatTile = ({ label, value, sub, color = 'primary' }: { label: string; value: React.ReactNode; sub?: string; color?: string }) => (
  <Card className="mb-3 h-100" style={{ borderLeft: `4px solid var(--bs-${color})` }}>
    <CardBody className="py-3">
      <div className="text-muted small text-uppercase">{label}</div>
      <div className="fs-4 fw-bold">{value}</div>
      {sub && <div className="small text-muted">{sub}</div>}
    </CardBody>
  </Card>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const SpeedUpgradePage: React.FC = () => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const [me, setMe] = useState<MeResponse | null>(null);
  const [meError, setMeError] = useState<string | null>(null);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [lastResult, setLastResult] = useState<ApiResult | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [autoRunning, setAutoRunning] = useState(false);
  const stopRef = useRef(false);

  const [batchSize, setBatchSize] = useState(20);
  const [sendSms, setSendSms] = useState(true);
  const [kick, setKick] = useState(true);

  const [serverEvents, setServerEvents] = useState<ServerEvent[]>([]);
  const [pageLog, setPageLog] = useState<LogEntry[]>([]);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const lastEventIdRef = useRef(0);

  const [showHelp, setShowHelp] = useState(false);
  const [showSkipped, setShowSkipped] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [logFilter, setLogFilter] = useState<'all' | Level>('all');

  const token = typeof window !== 'undefined' ? (Cookies.get('accessToken') || localStorage.getItem('accessToken')) : null;

  const api = useCallback(async (path: string, init?: { method?: string; body?: unknown }): Promise<ApiResult> => {
    const response = await fetch(`${config.baseUrl}/plan-migration${path}`, {
      method: init?.method || 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: init?.body ? JSON.stringify(init.body) : undefined,
    });
    let data: ApiResult = {};
    try { data = await response.json(); } catch { /* non JSON (e.g. proxy timeout) */ }
    if (!response.ok || data.success === false) {
      const message = data.message || data.error || `${response.status} ${response.statusText}`;
      throw new Error(response.status === 504 ? 'Request timed out at the proxy. The server may still be working – watch the log, then refresh.' : message);
    }
    return data;
  }, [token]);

  const log = useCallback((level: Level, message: string, router?: string | null) => {
    setPageLog(prev => [{ key: `p${Date.now()}${Math.random()}`, time: new Date().toISOString(), level, source: 'page' as const, router, message }, ...prev].slice(0, 300));
  }, []);

  const selected = useMemo(() => overview?.routers.find(r => r.id === selectedId) || null, [overview, selectedId]);
  const backupTablesReady = !!overview && Object.values(overview.backup_tables).every(Boolean);

  // --- Loaders ---------------------------------------------------------------
  const loadOverview = useCallback(async () => {
    try {
      const data = await api('/overview');
      setOverview(data as unknown as Overview);
    } catch (e) {
      log('error', `Could not load overview: ${(e as Error).message}`);
    }
  }, [api, log]);

  const loadEvents = useCallback(async () => {
    try {
      const params = new URLSearchParams({ after_id: String(lastEventIdRef.current), limit: '200' });
      if (selectedId) params.set('router_id', String(selectedId));
      const data = await api(`/events?${params.toString()}`);
      const fresh = (data.events || []) as ServerEvent[];
      if (fresh.length) {
        lastEventIdRef.current = Math.max(lastEventIdRef.current, ...fresh.map(e => e.id));
        setServerEvents(prev => [...fresh, ...prev].slice(0, 500));
      }
      if (selectedId) setClients((data.clients || []) as ClientRow[]);
    } catch {
      /* polling errors are not worth shouting about */
    }
  }, [api, selectedId]);

  useEffect(() => {
    if (!token) { setMeError('You are not logged in.'); return; }
    api('/me')
      .then(data => setMe(data as unknown as MeResponse))
      .catch(e => setMeError((e as Error).message));
  }, [api, token]);

  useEffect(() => {
    if (me?.can_migrate) loadOverview();
  }, [me, loadOverview]);

  // Reset the log feed when the router changes
  useEffect(() => {
    lastEventIdRef.current = 0;
    setServerEvents([]);
    setClients([]);
    setPreview(null);
    if (me?.can_migrate) loadEvents();
  }, [selectedId, me]); // eslint-disable-line react-hooks/exhaustive-deps

  // Poll faster while something is running
  useEffect(() => {
    if (!me?.can_migrate) return;
    const events = setInterval(loadEvents, busy ? 2500 : 8000);
    const stats = setInterval(loadOverview, busy ? 5000 : 20000);
    return () => { clearInterval(events); clearInterval(stats); };
  }, [me, busy, loadEvents, loadOverview]);

  // --- Actions ---------------------------------------------------------------
  const confirm = async (title: string, html: string, confirmButtonText: string, danger = false) => {
    const result = await Swal.fire({
      title, html, icon: danger ? 'warning' : 'question', showCancelButton: true, confirmButtonText,
      confirmButtonColor: danger ? '#d33' : undefined,
    });
    return result.isConfirmed;
  };

  const run = async (label: string, fn: () => Promise<ApiResult>, describe: (r: ApiResult) => string) => {
    setBusy(label);
    log('info', `${label}…`, selected?.router_name);
    try {
      const result = await fn();
      setLastResult(result);
      log(result.failed ? 'warning' : 'success', describe(result), selected?.router_name);
      return result;
    } catch (e) {
      log('error', `${label} failed: ${(e as Error).message}`, selected?.router_name);
      Swal.fire({ title: `${label} failed`, text: (e as Error).message, icon: 'error' });
      return null;
    } finally {
      setBusy(null);
      loadOverview();
      loadEvents();
    }
  };

  const doBackup = async () => {
    if (!selected) return;
    await run('Backup', () => api('/backup', { method: 'POST', body: { router_id: selected.id } }),
      r => `Backup done – DB: ${Object.values(r.database || {}).join('; ')}${r.router ? ` – router files: ${(r.router.files || []).join(', ')}` : ''}`);
  };

  const doPreview = async () => {
    if (!selected) return;
    const r = await run('Preview', () => api(`/preview?router_id=${selected.id}`),
      r => `Preview: ${r.clients_to_move} clients to move, ${r.plans_to_create.length} plans to create, ${r.price_changes.length} price changes, ${r.clients_skipped.length} skipped`);
    if (r) setPreview(r as unknown as Preview);
  };

  const doDb = async (dryRun: boolean, force = false) => {
    if (!selected) return;
    if (!dryRun && !(await confirm('Save to database?',
      `This moves the clients of <b>${selected.router_name}</b> to their new plans in the database and sets the new plan prices.<br/>Client fees stay the same. The router is not touched yet.`,
      'Yes, save'))) return;
    await run(dryRun ? 'Database dry run' : 'Database step',
      () => api('/run', { method: 'POST', body: { router_id: selected.id, step: 'db', dry_run: dryRun, force } }),
      r => `${r.dry_run ? 'DB dry run (rolled back)' : 'DB saved'}: ${r.clients_moved} clients moved, ${r.plans_created.length} plans created, ${r.price_changes.length} prices changed, ${r.clients_skipped.length} skipped`);
  };

  const routerBatch = (limit: number, retryFailed = false) =>
    api('/run', { method: 'POST', body: { router_id: selected?.id, step: 'router', limit, send_sms: sendSms, kick, retry_failed: retryFailed } });

  const describeBatch = (r: ApiResult) => r.processed === 0
    ? (r.message || 'Nothing to do')
    : `Router batch: ${r.done} upgraded, ${r.failed} failed, ${r.sms_sent} SMS sent, ${r.remaining} still pending`;

  const doRouterTest = async () => {
    if (!selected) return;
    if (!(await confirm('Upgrade 5 test clients?',
      `5 clients on <b>${selected.router_name}</b> will be moved to their new profile${kick ? ' and briefly disconnected' : ''}${sendSms ? ', and receive the upgrade SMS' : ''}.`,
      'Run test'))) return;
    await run('Router test (5 clients)', () => routerBatch(5), describeBatch);
  };

  const doRouterRetry = async () => {
    if (!selected) return;
    await run('Retry failed clients', () => routerBatch(batchSize, true), describeBatch);
  };

  const doRouterAll = async () => {
    if (!selected) return;
    if (!(await confirm('Upgrade all remaining clients?',
      `Clients on <b>${selected.router_name}</b> will be processed in batches of ${batchSize}${kick ? ' and briefly disconnected' : ''}${sendSms ? ', each receiving the upgrade SMS' : ''}.<br/>You can press <b>Stop</b> at any time – the current batch finishes first.`,
      'Start'))) return;

    stopRef.current = false;
    setAutoRunning(true);
    setBusy('Router – all remaining');
    log('info', `Started upgrading all remaining clients in batches of ${batchSize}`, selected.router_name);

    let batch = 0;
    try {
      while (!stopRef.current) {
        batch += 1;
        const r = await routerBatch(batchSize);
        setLastResult(r);
        log(r.failed ? 'warning' : 'success', `Batch ${batch}: ${describeBatch(r)}`, selected.router_name);
        loadOverview();
        loadEvents();
        if (!r.processed || !r.remaining) break;
      }
      log(stopRef.current ? 'warning' : 'success', stopRef.current ? 'Stopped by you.' : 'All pending clients processed.', selected.router_name);
    } catch (e) {
      log('error', `Batch ${batch} failed: ${(e as Error).message}`, selected.router_name);
      Swal.fire({ title: 'Batch failed', text: (e as Error).message, icon: 'error' });
    } finally {
      setAutoRunning(false);
      setBusy(null);
      loadOverview();
      loadEvents();
    }
  };

  const doRollback = async (step: 'router' | 'db') => {
    if (!selected) return;
    const text = step === 'router'
      ? `Every upgraded client on <b>${selected.router_name}</b> will be put back on their old profile${kick ? ' and briefly disconnected' : ''}.`
      : `Clients and plan prices of <b>${selected.router_name}</b> will be restored in the database and created plans removed.`;
    if (!(await confirm(`Rollback ${step}?`, text, 'Yes, roll back', true))) return;
    await run(`Rollback ${step}`, () => api('/rollback', { method: 'POST', body: { router_id: selected.id, step, kick } }),
      r => step === 'router'
        ? `Router rollback: ${r.restored} restored, ${r.failed} failed`
        : `DB rollback: ${r.clients_restored} clients restored, ${r.plan_prices_restored} prices restored, ${r.plans_deleted} plans deleted`);
  };

  // --- Derived ---------------------------------------------------------------
  const nextStep = useMemo(() => {
    if (!selected) return null;
    if (!backupTablesReady || !selected.router_backup_at) return 'backup';
    if (selected.phase === 'not_started' || selected.phase === 'rolled_back') return preview ? 'db' : 'preview';
    if (selected.pending > 0) return selected.upgraded + selected.failed === 0 ? 'test' : 'router';
    if (selected.failed > 0) return 'retry';
    return 'done';
  }, [selected, backupTablesReady, preview]);

  const logEntries = useMemo(() => {
    const server: LogEntry[] = serverEvents.map(e => ({
      key: `s${e.id}`, time: e.created_at, level: e.level, source: 'server' as const,
      router: e.router_name, user: e.user_name || e.user_email, message: e.message,
    }));
    return [...server, ...pageLog]
      .filter(e => logFilter === 'all' || e.level === logFilter)
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }, [serverEvents, pageLog, logFilter]);

  const isBusy = busy !== null;
  const btn = (step: string) => (nextStep === step ? 'primary' : 'outline-primary');

  // --- Render ----------------------------------------------------------------
  if (meError) {
    return (
      <>
        <Breadcrumbs mainTitle="Speed Upgrade" parent="Network" />
        <Container fluid><Alert color="danger">Could not verify your account: {meError}</Alert></Container>
      </>
    );
  }

  if (!me) {
    return (
      <>
        <Breadcrumbs mainTitle="Speed Upgrade" parent="Network" />
        <Container fluid><Spinner size="sm" /> Checking your account…</Container>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs mainTitle="Speed Upgrade" parent="Network" />
      <Container fluid>
        {/* Logged in user */}
        <Card className="mb-3">
          <CardBody className="d-flex flex-wrap align-items-center justify-content-between gap-2 py-3">
            <div>
              <div className="text-muted small">Logged in as</div>
              <div className="fw-bold">
                {me.user.name || reduxUser.name || 'Unknown'} <span className="text-muted fw-normal">({me.user.email || reduxUser.email})</span>{' '}
                <Badge color={me.user.user_type === 'superadmin' ? 'danger' : 'primary'}>{me.user.user_type}</Badge>
              </div>
              <div className="small text-muted">Access: {me.can_migrate ? me.scope : 'none'}</div>
            </div>
            <div className="d-flex gap-2">
              <Button color="light" size="sm" onClick={() => setShowHelp(v => !v)}>{showHelp ? 'Hide' : 'How to use this page'}</Button>
              <Button color="light" size="sm" onClick={() => { loadOverview(); loadEvents(); }} disabled={!me.can_migrate}>Refresh</Button>
            </div>
          </CardBody>
        </Card>

        {!me.can_migrate && (
          <Alert color="danger">Only a <b>superadmin</b> or an <b>admin</b> can run the speed upgrade. Your role is <b>{me.user.user_type}</b>.</Alert>
        )}

        <Collapse isOpen={showHelp}>
          <Card className="mb-3">
            <CardHeader><h5 className="mb-0">How to use this page</h5></CardHeader>
            <CardBody>
              <ol className="mb-2">
                <li><b>Select a router</b> in the table. Everything below works on that router only.</li>
                <li><b>Back up</b> – copies plans and clients to backup tables (first time only) and saves a backup file on the router.</li>
                <li><b>Preview</b> – shows which clients move to which plan, plans to create and new prices. Nothing is saved.</li>
                <li><b>Dry run</b> the database step to confirm it works, then <b>Save to database</b>.</li>
                <li><b>Test 5 clients</b> on the router. Check on MikroTik that they are on the new profile and online.</li>
                <li><b>Upgrade all remaining</b> – runs in batches until done. Press <b>Stop</b> to pause, and continue any time.</li>
                <li>If some fail, read the reason in the log or the client table, fix it, then <b>Retry failed</b>.</li>
              </ol>
              <p className="mb-1"><b>Undo:</b> Rollback router first, then Rollback database.</p>
              <p className="mb-0 text-muted small">
                Speeds: {overview && Object.entries(overview.config.speed_shift).map(([a, b]) => `${a}→${b}Mbps`).join(', ')}.
                {' '}Clients keep paying their current fee. The log updates automatically; entries marked <i>page</i> come from this browser, the rest from the server.
              </p>
            </CardBody>
          </Card>
        </Collapse>

        {me.can_migrate && overview && (
          <>
            {/* Totals */}
            <Row>
              <Col xl="2" md="4" sm="6"><StatTile label="Routers complete" value={`${overview.totals.routers_complete} / ${overview.totals.routers}`} sub={`${overview.totals.routers_started} started`} color="success" /></Col>
              <Col xl="2" md="4" sm="6"><StatTile label="Clients upgraded" value={overview.totals.upgraded} sub={`of ${overview.totals.clients} PPPoE clients`} color="primary" /></Col>
              <Col xl="2" md="4" sm="6"><StatTile label="Pending on router" value={overview.totals.pending} sub="moved in DB, router not yet" color="info" /></Col>
              <Col xl="2" md="4" sm="6"><StatTile label="Failed" value={overview.totals.failed} sub="need attention" color={overview.totals.failed ? 'danger' : 'secondary'} /></Col>
              <Col xl="2" md="4" sm="6"><StatTile label="SMS sent" value={overview.totals.sms_sent} sub={`${overview.totals.sms_failed} failed`} color="warning" /></Col>
              <Col xl="2" md="4" sm="6">
                <StatTile label="Backup tables" value={backupTablesReady ? 'Ready' : 'Missing'} sub={backupTablesReady ? 'safe to start' : 'run Back up first'} color={backupTablesReady ? 'success' : 'danger'} />
              </Col>
            </Row>

            {/* Routers */}
            <Card className="mb-3">
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Routers</h5>
                <span className="small text-muted">Click a router to work on it</span>
              </CardHeader>
              <CardBody className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>Router</th><th>Clients</th><th>Moved in DB</th><th>Upgraded</th><th>Pending</th><th>Failed</th><th>SMS</th>
                        <th style={{ minWidth: 140 }}>Progress</th><th>Status</th><th>Last activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overview.routers.map(r => (
                        <tr key={r.id} onClick={() => !isBusy && setSelectedId(r.id)}
                          style={{ cursor: isBusy ? 'not-allowed' : 'pointer' }} className={r.id === selectedId ? 'table-active' : ''}>
                          <td><b>{r.router_name}</b><div className="small text-muted">#{r.id} · {r.ip_address}</div></td>
                          <td>{r.clients}</td>
                          <td>{r.logged}</td>
                          <td className="text-success">{r.upgraded}</td>
                          <td>{r.pending}</td>
                          <td className={r.failed ? 'text-danger fw-bold' : ''}>{r.failed}</td>
                          <td>{r.sms_sent}{r.sms_failed ? <span className="text-danger"> / {r.sms_failed}✗</span> : null}</td>
                          <td>{r.logged > 0 ? <Progress value={(r.upgraded / r.logged) * 100} color={r.failed ? 'warning' : 'success'} style={{ height: 8 }} /> : <span className="text-muted small">–</span>}</td>
                          <td><Badge color={PHASES[r.phase].color}>{PHASES[r.phase].label}</Badge></td>
                          <td className="small text-muted" style={{ maxWidth: 260 }}>
                            {r.last_event ? <>{fmtTime(r.last_event.created_at)}<div className="text-truncate">{r.last_event.message}</div></> : '–'}
                          </td>
                        </tr>
                      ))}
                      {overview.routers.length === 0 && <tr><td colSpan={10} className="text-center text-muted py-4">No routers found</td></tr>}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>

            {selected && (
              <Row>
                {/* Steps */}
                <Col xl="5">
                  <Card className="mb-3">
                    <CardHeader>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{selected.router_name}</h5>
                        <Badge color={PHASES[selected.phase].color}>{PHASES[selected.phase].label}</Badge>
                      </div>
                      <div className="small text-muted mt-1">
                        {selected.clients} clients · {selected.logged} moved in DB · {selected.upgraded} upgraded · {selected.pending} pending · {selected.failed} failed
                      </div>
                      {selected.logged > 0 && <Progress className="mt-2" value={(selected.upgraded / selected.logged) * 100} color="success" style={{ height: 8 }} />}
                    </CardHeader>
                    <CardBody>
                      {busy && <Alert color="info" className="py-2"><Spinner size="sm" /> {busy}… keep this page open.</Alert>}
                      {nextStep === 'done' && <Alert color="success" className="py-2">This router is complete.</Alert>}

                      <div className="mb-3">
                        <div className="fw-bold">1. Back up</div>
                        <div className="small text-muted mb-1">
                          Backup tables: {backupTablesReady ? 'ready' : 'missing'} · Router backup: {selected.router_backup_at ? fmtTime(selected.router_backup_at) : 'not done'}
                        </div>
                        <Button size="sm" color={btn('backup')} disabled={isBusy} onClick={doBackup}>Back up</Button>
                      </div>

                      <div className="mb-3">
                        <div className="fw-bold">2. Preview</div>
                        <div className="small text-muted mb-1">See exactly what will change. Nothing is saved.</div>
                        <Button size="sm" color={btn('preview')} disabled={isBusy} onClick={doPreview}>Preview changes</Button>
                      </div>

                      <div className="mb-3">
                        <div className="fw-bold">3. Database</div>
                        <div className="small text-muted mb-1">Moves clients to their new plan and sets new plan prices. Fees stay the same.</div>
                        <div className="d-flex flex-wrap gap-2">
                          <Button size="sm" color="outline-secondary" disabled={isBusy || !backupTablesReady} onClick={() => doDb(true)}>Dry run</Button>
                          <Button size="sm" color={btn('db')} disabled={isBusy || !backupTablesReady || selected.logged > 0} onClick={() => doDb(false)}>Save to database</Button>
                          {selected.logged > 0 && (
                            <Button size="sm" color="outline-secondary" disabled={isBusy} onClick={() => doDb(false, true)} title="Migrate clients added after the database step">
                              Include new clients
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="fw-bold">4. Router</div>
                        <div className="small text-muted mb-2">Changes each client&apos;s profile on MikroTik.</div>
                        <Row className="g-2 mb-2">
                          <Col xs="5">
                            <Label className="small mb-0" for="batchSize">Batch size</Label>
                            <Input id="batchSize" bsSize="sm" type="number" min={1} max={100} value={batchSize}
                              onChange={e => setBatchSize(Math.min(100, Math.max(1, Number(e.target.value) || 1)))} disabled={isBusy} />
                          </Col>
                          <Col xs="7" className="d-flex flex-column justify-content-end">
                            <FormGroup check className="mb-0">
                              <Input id="sendSms" type="checkbox" checked={sendSms} onChange={e => setSendSms(e.target.checked)} disabled={isBusy} />
                              <Label check for="sendSms" className="small">Send upgrade SMS</Label>
                            </FormGroup>
                            <FormGroup check className="mb-0">
                              <Input id="kick" type="checkbox" checked={kick} onChange={e => setKick(e.target.checked)} disabled={isBusy} />
                              <Label check for="kick" className="small">Reconnect clients now</Label>
                            </FormGroup>
                          </Col>
                        </Row>
                        <div className="d-flex flex-wrap gap-2">
                          <Button size="sm" color={btn('test')} disabled={isBusy || selected.pending === 0} onClick={doRouterTest}>Test 5 clients</Button>
                          {!autoRunning ? (
                            <Button size="sm" color={btn('router')} disabled={isBusy || selected.pending === 0} onClick={doRouterAll}>
                              Upgrade all remaining ({selected.pending})
                            </Button>
                          ) : (
                            <Button size="sm" color="danger" onClick={() => { stopRef.current = true; log('warning', 'Stop requested – finishing current batch…', selected.router_name); }}>
                              Stop
                            </Button>
                          )}
                          <Button size="sm" color={nextStep === 'retry' ? 'warning' : 'outline-warning'} disabled={isBusy || selected.failed === 0} onClick={doRouterRetry}>
                            Retry failed ({selected.failed})
                          </Button>
                        </div>
                      </div>

                      <div className="border-top pt-3">
                        <div className="fw-bold text-danger">Rollback</div>
                        <div className="small text-muted mb-1">Router first, then database.</div>
                        <div className="d-flex flex-wrap gap-2">
                          <Button size="sm" color="outline-danger" disabled={isBusy || selected.upgraded + selected.failed === 0} onClick={() => doRollback('router')}>Rollback router</Button>
                          <Button size="sm" color="outline-danger" disabled={isBusy || selected.upgraded > 0 || selected.logged + selected.plans_created + selected.plans_repriced === 0} onClick={() => doRollback('db')}>Rollback database</Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                {/* Activity log */}
                <Col xl="7">
                  <Card className="mb-3">
                    <CardHeader className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Activity log {busy && <Spinner size="sm" className="ms-2" />}</h5>
                      <div className="d-flex gap-2 align-items-center">
                        <Input type="select" bsSize="sm" value={logFilter} onChange={e => setLogFilter(e.target.value as 'all' | Level)} style={{ width: 120 }}>
                          <option value="all">All</option>
                          <option value="success">Success</option>
                          <option value="warning">Warnings</option>
                          <option value="error">Errors</option>
                          <option value="info">Info</option>
                        </Input>
                        <Button size="sm" color="light" onClick={() => setPageLog([])}>Clear page entries</Button>
                      </div>
                    </CardHeader>
                    <CardBody className="p-0">
                      <div style={{ background: '#1e1e1e', color: '#d4d4d4', fontFamily: 'Consolas, Menlo, monospace', fontSize: 12, height: 520, overflowY: 'auto', padding: 12 }}>
                        {logEntries.length === 0 && <div style={{ color: '#888' }}>No activity yet for this router.</div>}
                        {logEntries.map(e => (
                          <div key={e.key} style={{ borderBottom: '1px solid #2d2d2d', padding: '3px 0' }}>
                            <span style={{ color: '#888' }}>{fmtTime(e.time)}</span>{' '}
                            <span style={{ color: LEVEL_COLORS[e.level], fontWeight: 600 }}>[{e.level.toUpperCase()}]</span>{' '}
                            <span style={{ color: '#c586c0' }}>{e.source === 'page' ? 'page' : (e.user || 'server')}</span>{' '}
                            {e.router && <span style={{ color: '#888' }}>({e.router})</span>}{' '}
                            <span>{e.message}</span>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                {/* Preview */}
                {preview && (
                  <Col xs="12">
                    <Card className="mb-3">
                      <CardHeader className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Preview – {preview.clients_to_move} clients will move</h5>
                        <Button size="sm" color="light" onClick={() => setPreview(null)}>Close</Button>
                      </CardHeader>
                      <CardBody>
                        {preview.warnings.map(w => <Alert key={w} color="warning" className="py-2">{w}</Alert>)}
                        <Row>
                          <Col lg="4">
                            <h6>Client moves</h6>
                            <Table size="sm" bordered>
                              <tbody>
                                {Object.entries(preview.client_moves).map(([move, count]) => <tr key={move}><td>{move}</td><td className="text-end fw-bold">{count}</td></tr>)}
                                {Object.keys(preview.client_moves).length === 0 && <tr><td className="text-muted">No clients to move</td></tr>}
                              </tbody>
                            </Table>
                          </Col>
                          <Col lg="4">
                            <h6>Plans to create</h6>
                            <Table size="sm" bordered>
                              <tbody>
                                {preview.plans_to_create.map(p => (
                                  <tr key={p.plan_name}><td>{p.plan_name}<div className="small text-muted">{p.rate_limit_string} · {p.plan_validity} days · from {p.copied_from}</div></td><td className="text-end">{kes(p.plan_price)}</td></tr>
                                ))}
                                {preview.plans_to_create.length === 0 && <tr><td className="text-muted">None</td></tr>}
                              </tbody>
                            </Table>
                            <div className="small text-muted">Weekly plan: {preview.weekly_plan ? `exists (${preview.weekly_plan.plan_name})` : 'will be created'}</div>
                          </Col>
                          <Col lg="4">
                            <h6>New plan prices</h6>
                            <Table size="sm" bordered>
                              <tbody>
                                {preview.price_changes.map(p => <tr key={p.plan_id}><td>{p.plan_name}</td><td className="text-end"><s className="text-muted">{kes(p.old_price)}</s> → <b>{kes(p.new_price)}</b></td></tr>)}
                                {preview.price_changes.length === 0 && <tr><td className="text-muted">No price changes</td></tr>}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        {(preview.clients_skipped.length > 0 || preview.plans_with_unknown_speed.length > 0) && (
                          <>
                            <Button size="sm" color="link" className="px-0" onClick={() => setShowSkipped(v => !v)}>
                              {showSkipped ? 'Hide' : 'Show'} {preview.clients_skipped.length} skipped clients{preview.plans_with_unknown_speed.length ? ` and ${preview.plans_with_unknown_speed.length} plans with unknown speed` : ''}
                            </Button>
                            <Collapse isOpen={showSkipped}>
                              {preview.plans_with_unknown_speed.length > 0 && (
                                <Alert color="warning" className="py-2">
                                  Speed could not be read for: {preview.plans_with_unknown_speed.map(p => `${p.plan_name} (${p.rate_limit_string || 'no rate'})`).join(', ')}
                                </Alert>
                              )}
                              <Table size="sm" bordered>
                                <thead><tr><th>Client</th><th>Secret</th><th>Reason</th></tr></thead>
                                <tbody>{preview.clients_skipped.map(s => <tr key={s.client_id}><td>{s.client_id}</td><td>{s.secret}</td><td>{s.reason}</td></tr>)}</tbody>
                              </Table>
                            </Collapse>
                          </>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                )}

                {/* Client changes */}
                <Col xs="12">
                  <Card className="mb-3">
                    <CardHeader><h5 className="mb-0">Clients on this router (failed first, then latest)</h5></CardHeader>
                    <CardBody className="p-0">
                      <div className="table-responsive" style={{ maxHeight: 420 }}>
                        <Table size="sm" hover className="mb-0">
                          <thead><tr><th>Client</th><th>Secret</th><th>From</th><th>To</th><th>Fee</th><th>Router</th><th>SMS</th><th>Error</th><th>Updated</th></tr></thead>
                          <tbody>
                            {clients.map(c => (
                              <tr key={c.client_id}>
                                <td>{c.client_id}</td>
                                <td>{c.secret}</td>
                                <td>{c.old_plan_name}</td>
                                <td>{c.new_plan_name}</td>
                                <td>{kes(c.plan_fee || 0)}</td>
                                <td><Badge color={{ done: 'success', failed: 'danger', pending: 'secondary', rolled_back: 'dark' }[c.router_status] || 'secondary'}>{c.router_status}</Badge></td>
                                <td><Badge color={{ sent: 'success', failed: 'danger', skipped: 'secondary', pending: 'light' }[c.sms_status] || 'light'} className={c.sms_status === 'pending' ? 'text-dark' : ''}>{c.sms_status}</Badge></td>
                                <td className="small text-danger">{c.error}</td>
                                <td className="small text-muted">{fmtTime(c.updated_at)}</td>
                              </tr>
                            ))}
                            {clients.length === 0 && <tr><td colSpan={9} className="text-center text-muted py-3">No clients migrated yet</td></tr>}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                {/* Raw response */}
                {lastResult && (
                  <Col xs="12">
                    <Button size="sm" color="link" className="px-0 mb-2" onClick={() => setShowRaw(v => !v)}>{showRaw ? 'Hide' : 'Show'} last server response</Button>
                    <Collapse isOpen={showRaw}>
                      <pre className="bg-light p-3 small" style={{ maxHeight: 400, overflow: 'auto' }}>{JSON.stringify(lastResult, null, 2)}</pre>
                    </Collapse>
                  </Col>
                )}
              </Row>
            )}

            {!selected && <Alert color="light" className="border">Select a router above to start.</Alert>}
          </>
        )}

        {me.can_migrate && !overview && <div><Spinner size="sm" /> Loading routers…</div>}
      </Container>
    </>
  );
};

export default SpeedUpgradePage;
