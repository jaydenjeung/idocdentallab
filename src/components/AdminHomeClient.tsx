"use client";

import { useMemo, useState } from "react";
import { fileNameFromPath } from "@/lib/scan-files";

export interface AdminClinicRow {
  id: string;
  practiceName: string;
  doctorName: string;
  email: string;
  phone: string;
  address: string;
  npi: string;
  status: string;
  caseCount: number;
}

export interface AdminCaseRow {
  id: string;
  clinicId: string;
  practiceName: string;
  doctorName: string;
  patient: string;
  caseType: string;
  material: string;
  shade: string;
  toothNumbers: string;
  dueDate: string;
  notes: string;
  status: string;
  createdAt: string;
  filePaths: string[];
  fileNames: string[];
}

export interface AdminLeadRow {
  id: string;
  practiceName: string;
  doctorName: string;
  email: string;
  phone: string;
  service: string;
  patient: string;
  notes: string;
  createdAt: string;
}

const STATUSES = ["received", "in_progress", "completed", "shipped"] as const;

const STATUS_LABEL: Record<string, string> = {
  received: "Received",
  in_progress: "In progress",
  completed: "Completed",
  shipped: "Shipped",
};

type Tab = "clinics" | "cases" | "leads";

function formatDate(iso: string) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function matches(query: string, parts: string[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return parts.join(" ").toLowerCase().includes(q);
}

export default function AdminHomeClient({
  clinics,
  cases,
  leads,
  clinicsError,
  casesError,
  leadsError,
}: {
  clinics: AdminClinicRow[];
  cases: AdminCaseRow[];
  leads: AdminLeadRow[];
  clinicsError: string;
  casesError: string;
  leadsError: string;
}) {
  const [tab, setTab] = useState<Tab>("clinics");
  const [query, setQuery] = useState("");
  const [clinicFilter, setClinicFilter] = useState("");
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredClinics = useMemo(
    () =>
      clinics.filter((c) =>
        matches(query, [c.practiceName, c.doctorName, c.email, c.phone, c.npi, c.address])
      ),
    [clinics, query]
  );

  const filteredCases = useMemo(
    () =>
      cases.filter((c) => {
        if (clinicFilter && c.clinicId !== clinicFilter) return false;
        return matches(query, [
          c.practiceName,
          c.doctorName,
          c.patient,
          c.caseType,
          c.material,
          c.toothNumbers,
        ]);
      }),
    [cases, query, clinicFilter]
  );

  const filteredLeads = useMemo(
    () =>
      leads.filter((l) =>
        matches(query, [l.practiceName, l.doctorName, l.email, l.phone, l.service, l.patient])
      ),
    [leads, query]
  );

  const filterClinic = clinics.find((c) => c.id === clinicFilter);

  const openCases = (clinicId: string) => {
    setClinicFilter(clinicId);
    setTab("cases");
    setQuery("");
  };

  const downloadFile = async (path: string) => {
    setDownloading(path);
    setError("");
    try {
      const res = await fetch(`/api/admin/download?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Download failed");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setDownloading(null);
    }
  };

  const changeStatus = async (id: string, status: string) => {
    setSaving(id);
    setError("");
    try {
      const res = await fetch("/api/admin/cases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update status");
      setStatuses((prev) => ({ ...prev, [id]: status }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update status");
    } finally {
      setSaving(null);
    }
  };

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "clinics", label: "Clinics", count: clinics.length },
    { id: "cases", label: "Cases", count: cases.length },
    { id: "leads", label: "Inquiries", count: leads.length },
  ];

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
              tab === item.id
                ? "border-green-700 bg-white shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
              {item.label}
            </p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{item.count}</p>
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            tab === "clinics"
              ? "Search practice, doctor, email, phone, NPI"
              : tab === "cases"
                ? "Search practice, patient, case type"
                : "Search inquiry"
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />
        {tab === "cases" && clinicFilter ? (
          <button
            type="button"
            onClick={() => setClinicFilter("")}
            className="shrink-0 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:border-gray-300"
          >
            Clear {filterClinic?.practiceName || "clinic"} filter
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {tab === "clinics" ? (
        <ClinicList
          rows={filteredClinics}
          error={clinicsError}
          onOpenCases={openCases}
        />
      ) : null}

      {tab === "cases" ? (
        <CaseList
          rows={filteredCases}
          error={casesError}
          statuses={statuses}
          saving={saving}
          downloading={downloading}
          onStatus={changeStatus}
          onDownload={downloadFile}
        />
      ) : null}

      {tab === "leads" ? <LeadList rows={filteredLeads} error={leadsError} /> : null}
    </div>
  );
}

function ClinicList({
  rows,
  error,
  onOpenCases,
}: {
  rows: AdminClinicRow[];
  error: string;
  onOpenCases: (id: string) => void;
}) {
  if (error) return <ErrorNote message={error} />;
  if (rows.length === 0) return <EmptyNote message="No registered clinics yet." />;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="divide-y divide-gray-100">
        {rows.map((row) => (
          <article key={row.id} className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-gray-900">{row.practiceName}</h2>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                  {row.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{row.doctorName || "—"}</p>
              <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <Info label="Email" value={row.email} href={row.email ? `mailto:${row.email}` : undefined} />
                <Info label="Phone" value={row.phone} href={row.phone ? `tel:${row.phone}` : undefined} />
                <Info label="NPI" value={row.npi} />
                <Info label="Address" value={row.address} />
              </dl>
            </div>
            <button
              type="button"
              onClick={() => onOpenCases(row.id)}
              className="shrink-0 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-green-700 hover:text-green-800"
            >
              {row.caseCount} case{row.caseCount === 1 ? "" : "s"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function CaseList({
  rows,
  error,
  statuses,
  saving,
  downloading,
  onStatus,
  onDownload,
}: {
  rows: AdminCaseRow[];
  error: string;
  statuses: Record<string, string>;
  saving: string | null;
  downloading: string | null;
  onStatus: (id: string, status: string) => void;
  onDownload: (path: string) => void;
}) {
  if (error) return <ErrorNote message={error} />;
  if (rows.length === 0) return <EmptyNote message="No cases yet." />;

  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const status = statuses[row.id] || row.status;
        return (
          <article key={row.id} className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-gray-400">{formatDate(row.createdAt)}</span>
                  <select
                    value={STATUSES.includes(status as (typeof STATUSES)[number]) ? status : "received"}
                    disabled={saving === row.id}
                    onChange={(e) => onStatus(row.id, e.target.value)}
                    className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-700"
                  >
                    {STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {STATUS_LABEL[item]}
                      </option>
                    ))}
                  </select>
                </div>
                <h2 className="text-base font-semibold text-gray-900">
                  {row.practiceName}
                  {row.doctorName ? (
                    <span className="font-normal text-gray-500"> · {row.doctorName}</span>
                  ) : null}
                </h2>
                <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <Info label="Patient" value={row.patient} />
                  <Info
                    label="Case"
                    value={[row.caseType, row.material].filter(Boolean).join(" · ")}
                  />
                  <Info label="Teeth" value={row.toothNumbers} />
                  <Info label="Shade" value={row.shade} />
                  <Info label="Due" value={row.dueDate} />
                </dl>
                {row.notes ? (
                  <p className="mt-3 text-sm text-gray-600">
                    <span className="text-gray-400">Notes: </span>
                    {row.notes}
                  </p>
                ) : null}
              </div>
              <div className="w-full shrink-0 md:w-56">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Scan files ({row.filePaths.length})
                </p>
                {row.filePaths.length === 0 ? (
                  <p className="text-xs text-gray-400">No files attached.</p>
                ) : (
                  <ul className="space-y-2">
                    {row.filePaths.map((path, i) => {
                      const name = row.fileNames[i] || fileNameFromPath(path);
                      return (
                        <li key={path}>
                          <button
                            type="button"
                            onClick={() => onDownload(path)}
                            disabled={downloading === path}
                            className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-2 text-left text-[12px] font-medium text-gray-700 hover:border-green-600 hover:bg-green-50 hover:text-green-900 disabled:opacity-50"
                          >
                            <span className="truncate">{name}</span>
                            <span className="shrink-0 text-green-700">
                              {downloading === path ? "…" : "↓"}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function LeadList({ rows, error }: { rows: AdminLeadRow[]; error: string }) {
  if (error) return <ErrorNote message={error} />;
  if (rows.length === 0) return <EmptyNote message="No website inquiries yet." />;

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <article key={row.id} className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-gray-900">{row.practiceName}</h2>
            {row.service ? (
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-medium text-green-800">
                {row.service}
              </span>
            ) : null}
            <span className="text-[12px] text-gray-400">{formatDate(row.createdAt)}</span>
          </div>
          <p className="text-sm text-gray-600">{row.doctorName || "—"}</p>
          <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            <Info label="Email" value={row.email} href={row.email ? `mailto:${row.email}` : undefined} />
            <Info label="Phone" value={row.phone} href={row.phone ? `tel:${row.phone}` : undefined} />
            <Info label="Patient" value={row.patient} />
          </dl>
          {row.notes ? (
            <p className="mt-3 text-sm text-gray-600">
              <span className="text-gray-400">Notes: </span>
              {row.notes}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function Info({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <dt className="text-gray-400">{label}</dt>
      <dd className="text-gray-800">
        {value ? (
          href ? (
            <a href={href} className="hover:underline">
              {value}
            </a>
          ) : (
            value
          )
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
}

function EmptyNote({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      Could not load this list. {message}
    </div>
  );
}
