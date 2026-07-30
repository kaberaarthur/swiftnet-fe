export function sanitizeFilename(name: string): string {
  return name.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "export";
}

// e.g. "30-july-2026-10-09-am"
export function formatExportTimestamp(date: Date = new Date()): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" }).toLowerCase();
  const year = date.getFullYear();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const hourStr = String(hours).padStart(2, "0");
  const minuteStr = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}-${hourStr}-${minuteStr}-${ampm}`;
}

export function buildExportFilename(baseName: string, extension: "json" | "zip"): string {
  return `${sanitizeFilename(baseName)}-${formatExportTimestamp()}.${extension}`;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
