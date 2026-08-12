"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ACCENT, BORDER, CARD, FAINT, INK, MUTED, PAGE, RED, SHADOW, btnS, inputS } from "@/lib/theme";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const configError = params.get("error") === "config";

  const [password, setPassword] = useState("");
  const [error, setError] = useState(configError ? "Admin auth is not configured on the server yet." : "");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({ ok: false, error: "Network error" }));
      if (json.ok) {
        router.replace(next);
        router.refresh();
      } else {
        setError(json.error || "Incorrect password");
        setBusy(false);
      }
    } catch {
      setError("Network error");
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PAGE,
        color: INK,
        display: "grid",
        placeItems: "center",
        padding: 24,
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: CARD,
          border: BORDER,
          boxShadow: SHADOW,
          borderRadius: 16,
          padding: "34px 30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 22 }}>
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: ACCENT,
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 17,
              fontWeight: 800,
            }}
            aria-hidden
          >
            S
          </span>
          <span style={{ lineHeight: 1.2 }}>
            <span style={{ display: "block", fontSize: 16, fontWeight: 800 }}>Command Center</span>
            <span
              style={{
                display: "block",
                fontSize: 10,
                fontWeight: 800,
                color: FAINT,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Private CRM
            </span>
          </span>
        </div>

        <label style={{ display: "block", fontSize: 13, color: MUTED, fontWeight: 600, marginBottom: 8 }}>
          Enter password to continue
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          placeholder="••••••••"
          style={inputS}
        />

        {error && (
          <p style={{ color: RED, fontSize: 12.5, fontWeight: 600, marginTop: 12 }}>{error}</p>
        )}

        <button type="submit" disabled={busy || !password} style={{ ...btnS, width: "100%", marginTop: 18, opacity: busy || !password ? 0.6 : 1 }}>
          {busy ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
