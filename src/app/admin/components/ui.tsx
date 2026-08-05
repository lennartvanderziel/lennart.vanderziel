"use client";
import type { CSSProperties, ReactNode } from "react";
import { BORDER, CARD, FAINT, INK, MUTED, RADIUS, SHADOW, cardS, labelS } from "../theme";

export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <section style={{ ...cardS, ...style }}>{children}</section>;
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 14,
        marginBottom: 26,
      }}
    >
      <div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: INK, letterSpacing: "-0.025em", margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: "7px 0 0", fontSize: 14.5, color: MUTED, maxWidth: 620, lineHeight: 1.55 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}

export function StatTile({
  label,
  value,
  hint,
  color = INK,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  color?: string;
  icon?: string;
}) {
  return (
    <div
      style={{
        background: CARD,
        border: BORDER,
        borderRadius: RADIUS,
        padding: "20px 22px",
        boxShadow: SHADOW,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <span style={labelS}>{label}</span>
        {icon && <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>}
      </div>
      <div style={{ fontSize: 34, fontWeight: 800, color, letterSpacing: "-0.03em", marginTop: 10 }}>
        {value}
      </div>
      {hint && <div style={{ fontSize: 12.5, color: FAINT, marginTop: 2 }}>{hint}</div>}
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: 16,
        marginBottom: 22,
      }}
    >
      {children}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, maxWidth: 560, margin: "6px 0 0" }}>
      {children}
    </p>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <h2 style={{ fontSize: 16, fontWeight: 800, color: INK, margin: 0, letterSpacing: "-0.01em" }}>
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 800,
        color,
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        padding: "3px 10px",
        borderRadius: 100,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
