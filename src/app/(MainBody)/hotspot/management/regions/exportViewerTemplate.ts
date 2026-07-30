export interface ExportHouse {
  house_label: string;
  notes: string | null;
}

export interface ExportPayment {
  amount: number;
  payment_type: string;
  for_month: string;
  paid_on: string;
  meter_reading: number | null;
  notes: string | null;
}

export interface ExportSite {
  site_name: string;
  phone_number: string;
  location: string | null;
  agreement_type: string | null;
  agreement_value: number | null;
  agreement_notes: string | null;
  status: string;
  houses: ExportHouse[];
  payments: ExportPayment[];
}

export interface RegionExportData {
  region_name: string;
  site_count: number;
  generated_at: string;
  sites: ExportSite[];
}

export interface AllDataExportRegion {
  region_name: string;
  site_count: number;
  sites: ExportSite[];
}

export interface AllDataExport {
  generated_at: string;
  region_count: number;
  total_sites: number;
  regions: AllDataExportRegion[];
  unassigned_sites: ExportSite[];
}

const agreementLabels: Record<string, string> = {
  power_tokens: "Power Tokens",
  amount: "Amount",
  free_voucher: "Free Internet Voucher",
  free_wifi: "Free Wi-Fi",
};

// Prevents a literal "</script>" inside the JSON payload from prematurely closing
// the embedding <script> tag when this string is written into the HTML file.
const escapeForScriptTag = (json: string) => json.replace(/</g, "\\u003c");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Vanilla-JS DOM builders shared by both the single-region and all-data viewers.
// Embedded verbatim into the generated <script> tag - not executed here.
const SITE_TREE_SCRIPT_CORE = `
    const AGREEMENT_LABELS = ${JSON.stringify(agreementLabels)};

    function el(tag, className, children) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      (children || []).forEach((c) => {
        if (c === null || c === undefined) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
      return node;
    }

    function chevron() {
      const span = el("span", "chevron inline-block text-slate-400 mr-2");
      span.innerHTML = "\\u25B8";
      return span;
    }

    function badge(text, colorClass) {
      return el("span", "inline-block px-2 py-0.5 rounded-full text-xs font-medium " + colorClass, [text]);
    }

    function statusBadge(status) {
      const s = (status || "").toLowerCase();
      if (s === "installed") return badge(status, "bg-emerald-100 text-emerald-700");
      if (s === "pending") return badge(status, "bg-amber-100 text-amber-700");
      return badge(status, "bg-slate-200 text-slate-700");
    }

    function fieldRow(label, value) {
      return el("div", "flex gap-2 py-1 border-b border-slate-100 last:border-0", [
        el("span", "w-40 shrink-0 text-slate-500 text-sm", [label]),
        el("span", "text-slate-800 text-sm break-words", [value === null || value === undefined || value === "" ? "\\u2014" : String(value)]),
      ]);
    }

    function agreementLabel(site) {
      const label = site.agreement_type ? (AGREEMENT_LABELS[site.agreement_type] || site.agreement_type) : "\\u2014";
      const value = site.agreement_value ? " (Kes. " + Number(site.agreement_value).toLocaleString() + "/mo)" : "";
      return label + value;
    }

    function buildHousesSection(houses) {
      const details = el("details", "border border-slate-200 rounded-lg bg-white");
      const summary = el("summary", "px-4 py-2 font-medium text-sm text-slate-700 flex items-center", [
        chevron(),
        "Houses Covered (" + houses.length + ")",
      ]);
      details.appendChild(summary);

      const body = el("div", "px-4 pb-3");
      if (houses.length === 0) {
        body.appendChild(el("p", "text-sm text-slate-400 italic", ["No houses recorded."]));
      } else {
        const list = el("ul", "space-y-1");
        houses.forEach((h) => {
          list.appendChild(
            el("li", "text-sm text-slate-700 flex gap-2", [
              el("span", "font-medium", [h.house_label]),
              h.notes ? el("span", "text-slate-400", ["\\u2014 " + h.notes]) : null,
            ])
          );
        });
        body.appendChild(list);
      }
      details.appendChild(body);
      return details;
    }

    function buildPaymentsSection(payments) {
      const details = el("details", "border border-slate-200 rounded-lg bg-white");
      const summary = el("summary", "px-4 py-2 font-medium text-sm text-slate-700 flex items-center", [
        chevron(),
        "Payment History (" + payments.length + ")",
      ]);
      details.appendChild(summary);

      const body = el("div", "px-4 pb-3 overflow-x-auto");
      if (payments.length === 0) {
        body.appendChild(el("p", "text-sm text-slate-400 italic", ["No payments recorded."]));
      } else {
        const table = el("table", "w-full text-sm text-left mt-1");
        const thead = el("thead", "", [
          el("tr", "text-slate-500 border-b border-slate-200", [
            el("th", "py-1 pr-3 font-medium", ["Month"]),
            el("th", "py-1 pr-3 font-medium", ["Amount"]),
            el("th", "py-1 pr-3 font-medium", ["Type"]),
            el("th", "py-1 pr-3 font-medium", ["Paid On"]),
            el("th", "py-1 pr-3 font-medium", ["Meter Reading"]),
            el("th", "py-1 font-medium", ["Notes"]),
          ]),
        ]);
        table.appendChild(thead);

        const tbody = el("tbody");
        payments.forEach((p) => {
          tbody.appendChild(
            el("tr", "border-b border-slate-100 last:border-0", [
              el("td", "py-1 pr-3", [(p.for_month || "").slice(0, 7)]),
              el("td", "py-1 pr-3", ["Kes. " + Number(p.amount).toLocaleString()]),
              el("td", "py-1 pr-3", [AGREEMENT_LABELS[p.payment_type] || p.payment_type]),
              el("td", "py-1 pr-3", [(p.paid_on || "").slice(0, 10)]),
              el("td", "py-1 pr-3", [p.meter_reading === null || p.meter_reading === undefined ? "\\u2014" : String(p.meter_reading)]),
              el("td", "py-1", [p.notes || "\\u2014"]),
            ])
          );
        });
        table.appendChild(tbody);
        body.appendChild(table);
      }
      details.appendChild(body);
      return details;
    }

    function buildSiteNode(site) {
      const details = el("details", "border border-slate-200 rounded-xl bg-white shadow-sm");
      const summary = el("summary", "px-4 py-3 flex flex-wrap items-center gap-2");
      summary.appendChild(chevron());
      summary.appendChild(el("span", "font-semibold text-slate-900", [site.site_name]));
      summary.appendChild(statusBadge(site.status));
      summary.appendChild(el("span", "text-xs text-slate-400 ml-auto", [
        site.houses.length + " house(s) \\u00b7 " + site.payments.length + " payment(s)",
      ]));
      details.appendChild(summary);

      const body = el("div", "px-4 pb-4 space-y-3 border-t border-slate-100 pt-3");
      const fields = el("div", "");
      fields.appendChild(fieldRow("Phone Number", site.phone_number));
      fields.appendChild(fieldRow("Location", site.location));
      fields.appendChild(fieldRow("Agreement", agreementLabel(site)));
      fields.appendChild(fieldRow("Agreement Notes", site.agreement_notes));
      body.appendChild(fields);

      body.appendChild(buildHousesSection(site.houses));
      body.appendChild(buildPaymentsSection(site.payments));

      details.appendChild(body);
      return details;
    }

    function buildSiteListNode(sites) {
      const wrap = el("div", "space-y-3 mt-2");
      if (sites.length === 0) {
        wrap.appendChild(el("p", "text-slate-400 italic text-sm", ["No sites here yet."]));
      } else {
        sites.forEach((site) => wrap.appendChild(buildSiteNode(site)));
      }
      return wrap;
    }
`;

const HEAD = (title: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  details > summary { list-style: none; cursor: pointer; }
  details > summary::-webkit-details-marker { display: none; }
  details[open] > summary .chevron { transform: rotate(90deg); }
  .chevron { transition: transform 0.15s ease; }
</style>
</head>`;

export function buildRegionExportHtml(data: RegionExportData): string {
  const embeddedJson = escapeForScriptTag(JSON.stringify(data));

  return `${HEAD(data.region_name + " — Hotspot Region Export")}
<body class="bg-slate-50 text-slate-800 min-h-screen">
  <div class="max-w-4xl mx-auto px-4 py-10 md:py-14">
    <header class="mb-8">
      <p class="text-sm font-medium text-teal-600 mb-1">Hotspot Region Export</p>
      <h1 id="region-name" class="text-3xl font-bold text-slate-900"></h1>
      <p id="meta" class="text-slate-500 mt-2 text-sm"></p>
    </header>
    <div id="tree" class="space-y-3"></div>
    <footer class="mt-12 text-center text-xs text-slate-400">Generated by Swiftnet &middot; Hotspot Management</footer>
  </div>

  <script>
    const DATA = ${embeddedJson};
${SITE_TREE_SCRIPT_CORE}
    function render() {
      document.getElementById("region-name").textContent = DATA.region_name;
      document.getElementById("meta").textContent =
        DATA.site_count + " site(s) \\u00b7 generated " + new Date(DATA.generated_at).toLocaleString();

      const tree = document.getElementById("tree");
      if (DATA.sites.length === 0) {
        tree.appendChild(el("p", "text-slate-400 italic", ["No sites in this region yet."]));
        return;
      }
      DATA.sites.forEach((site) => tree.appendChild(buildSiteNode(site)));
    }

    render();
  </script>
</body>
</html>
`;
}

export function buildAllDataExportHtml(data: AllDataExport): string {
  const embeddedJson = escapeForScriptTag(JSON.stringify(data));

  return `${HEAD("All Hotspot Data Export")}
<body class="bg-slate-50 text-slate-800 min-h-screen">
  <div class="max-w-4xl mx-auto px-4 py-10 md:py-14">
    <header class="mb-8">
      <p class="text-sm font-medium text-teal-600 mb-1">Hotspot Management</p>
      <h1 class="text-3xl font-bold text-slate-900">All Regions &amp; Sites</h1>
      <p id="meta" class="text-slate-500 mt-2 text-sm"></p>
    </header>
    <div id="tree" class="space-y-3"></div>
    <footer class="mt-12 text-center text-xs text-slate-400">Generated by Swiftnet &middot; Hotspot Management</footer>
  </div>

  <script>
    const DATA = ${embeddedJson};
${SITE_TREE_SCRIPT_CORE}
    function buildRegionNode(region) {
      const details = el("details", "border border-slate-300 rounded-xl bg-slate-100/60");
      const summary = el("summary", "px-4 py-3 flex flex-wrap items-center gap-2");
      summary.appendChild(chevron());
      summary.appendChild(el("span", "font-bold text-slate-900 text-lg", [region.region_name]));
      summary.appendChild(el("span", "text-xs text-slate-500 ml-auto", [region.site_count + " site(s)"]));
      details.appendChild(summary);

      const body = el("div", "px-4 pb-4");
      body.appendChild(buildSiteListNode(region.sites));
      details.appendChild(body);
      return details;
    }

    function render() {
      document.getElementById("meta").textContent =
        DATA.region_count + " region(s) \\u00b7 " + DATA.total_sites + " site(s) total \\u00b7 generated " +
        new Date(DATA.generated_at).toLocaleString();

      const tree = document.getElementById("tree");

      if (DATA.regions.length === 0 && DATA.unassigned_sites.length === 0) {
        tree.appendChild(el("p", "text-slate-400 italic", ["No regions or sites recorded yet."]));
        return;
      }

      DATA.regions.forEach((region) => tree.appendChild(buildRegionNode(region)));

      if (DATA.unassigned_sites.length > 0) {
        const details = el("details", "border border-dashed border-slate-300 rounded-xl bg-white");
        const summary = el("summary", "px-4 py-3 flex flex-wrap items-center gap-2");
        summary.appendChild(chevron());
        summary.appendChild(el("span", "font-bold text-slate-900 text-lg", ["Unassigned Sites"]));
        summary.appendChild(el("span", "text-xs text-slate-500 ml-auto", [DATA.unassigned_sites.length + " site(s)"]));
        details.appendChild(summary);

        const body = el("div", "px-4 pb-4");
        body.appendChild(buildSiteListNode(DATA.unassigned_sites));
        details.appendChild(body);
        tree.appendChild(details);
      }
    }

    render();
  </script>
</body>
</html>
`;
}
