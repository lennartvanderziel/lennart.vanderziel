"use client";
import { useRef, useState } from "react";
import { STORE_KEY } from "@/lib/accountability";
import { ACCENT_TEXT, BORDER, FAINT, FILL, GREEN, INK, MUTED, RED, btnS, ghostS, inputS } from "../theme";

/**
 * Move the whole CRM between browsers.
 *
 * Everything here lives in localStorage, so a machine that has the real data
 * (Lennart's laptop) is the only place it exists. Export writes one JSON file;
 * Import loads it on the other machine. This is the migration path until the
 * store moves behind an API.
 */

const KEYS = ["crm-members", "crm-leads", "crm-sequence", "crm-sessions", STORE_KEY] as const;

interface Bundle {
  exportedAt: string;
  data: Record<string, unknown>;
}

function collect(): Bundle {
  const data: Record<string, unknown> = {};
  for (const key of KEYS) {
    const raw = localStorage.getItem(key);
    if (raw === null) continue;
    try {
      data[key] = JSON.parse(raw);
    } catch {
      // Skip anything unparseable rather than exporting a corrupt bundle.
    }
  }
  return { exportedAt: new Date().toISOString(), data };
}

function summarise(data: Record<string, unknown>): string {
  const count = (key: string) => (Array.isArray(data[key]) ? (data[key] as unknown[]).length : 0);
  const weeks = data[STORE_KEY] as { weeks?: Record<string, unknown> } | undefined;
  return [
    `${count("crm-members")} members`,
    `${count("crm-leads")} leads`,
    `${count("crm-sessions")} sessions`,
    `${Object.keys(weeks?.weeks ?? {}).length} accountability weeks`,
  ].join(" · ");
}

export function DataTransfer() {
  const [paste, setPaste] = useState("");
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function exportAll() {
    const bundle = collect();
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sts-crm-${bundle.exportedAt.slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus({ msg: `Exported ${summarise(bundle.data)}`, ok: true });
  }

  function apply(text: string) {
    let bundle: Bundle;
    try {
      bundle = JSON.parse(text) as Bundle;
    } catch {
      setStatus({ msg: "That is not valid JSON.", ok: false });
      return;
    }
    if (!bundle?.data || typeof bundle.data !== "object") {
      setStatus({ msg: "No `data` block found. Use a file produced by Export.", ok: false });
      return;
    }

    const incoming = Object.keys(bundle.data).filter((k) => (KEYS as readonly string[]).includes(k));
    if (incoming.length === 0) {
      setStatus({ msg: "Nothing recognisable in that file.", ok: false });
      return;
    }

    if (!confirm(`Replace this browser's CRM with:\n\n${summarise(bundle.data)}\n\nThis overwrites what is here now.`)) {
      return;
    }

    for (const key of incoming) {
      localStorage.setItem(key, JSON.stringify(bundle.data[key]));
    }
    setStatus({ msg: `Imported ${summarise(bundle.data)}. Reloading…`, ok: true });
    setTimeout(() => window.location.reload(), 900);
  }

  return (
    <div style={{ background: FILL, border: BORDER, borderRadius: 12, padding: "18px 20px", marginTop: 20 }}>
      <h3 style={{ fontSize: 14.5, fontWeight: 800, color: INK, margin: 0 }}>Move this CRM between browsers</h3>
      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.55, margin: "6px 0 14px", maxWidth: 620 }}>
        Everything lives in this browser only. To bring Lennart&apos;s real members and accountability history over,
        run <strong>Export</strong> on the machine that has them, then <strong>Import</strong> the file here.
      </p>

      <div style={{ display: "flex", gap: 9, flexWrap: "wrap", alignItems: "center" }}>
        <button onClick={exportAll} style={btnS}>
          Export all data
        </button>
        <button onClick={() => fileRef.current?.click()} style={ghostS}>
          Import from file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            file.text().then(apply);
            e.target.value = "";
          }}
        />
      </div>

      <details style={{ marginTop: 14 }}>
        <summary style={{ fontSize: 12.5, color: ACCENT_TEXT, cursor: "pointer", fontWeight: 700 }}>
          or paste the JSON directly
        </summary>
        <textarea
          rows={4}
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          placeholder='{"exportedAt":"…","data":{…}}'
          style={{ ...inputS, marginTop: 9, resize: "vertical", fontFamily: "ui-monospace, monospace", fontSize: 12 }}
        />
        <button onClick={() => apply(paste)} style={{ ...ghostS, marginTop: 8 }} disabled={!paste.trim()}>
          Import pasted JSON
        </button>
      </details>

      {status && (
        <p style={{ fontSize: 13, fontWeight: 700, color: status.ok ? GREEN : RED, margin: "12px 0 0" }}>
          {status.msg}
        </p>
      )}
      <p style={{ fontSize: 11.5, color: FAINT, margin: "10px 0 0" }}>
        Exports contain member contact details and revenue. Treat the file as confidential.
      </p>
    </div>
  );
}
