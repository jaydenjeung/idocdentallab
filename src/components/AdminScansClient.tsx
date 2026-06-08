"use client";

import { useState } from "react";
import { fileNameFromPath } from "@/lib/scan-files";

export interface AdminScanRow {
  id: string;
  source: "digital-impression" | "client-portal";
  createdAt: string;
  practiceName: string;
  doctorName: string;
  patient: string;
  caseSummary: string;
  toothNumbers: string;
  dueDate: string;
  notes: string;
  status: string;
  filePaths: string[];
  fileNames: string[];
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminScansClient({ rows }: { rows: AdminScanRow[] }) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState("");

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

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
        <p className="text-sm text-gray-500">No scan uploads yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {rows.map((row) => (
          <article
            key={`${row.source}-${row.id}`}
            className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      row.source === "digital-impression"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {row.source === "digital-impression"
                      ? "Digital impression"
                      : "Client portal"}
                  </span>
                  <span className="text-[12px] text-gray-400">{formatDate(row.createdAt)}</span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                    {row.status}
                  </span>
                </div>

                <h2 className="text-base font-semibold text-gray-900">
                  {row.practiceName}
                  {row.doctorName ? (
                    <span className="font-normal text-gray-500"> · {row.doctorName}</span>
                  ) : null}
                </h2>

                <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-gray-400">Patient</dt>
                    <dd className="text-gray-800">{row.patient || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Case</dt>
                    <dd className="text-gray-800">{row.caseSummary || "—"}</dd>
                  </div>
                  {row.toothNumbers ? (
                    <div>
                      <dt className="text-gray-400">Teeth</dt>
                      <dd className="text-gray-800">{row.toothNumbers}</dd>
                    </div>
                  ) : null}
                  {row.dueDate ? (
                    <div>
                      <dt className="text-gray-400">Due</dt>
                      <dd className="text-gray-800">{row.dueDate}</dd>
                    </div>
                  ) : null}
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
                <ul className="space-y-2">
                  {row.filePaths.map((path, i) => {
                    const name = row.fileNames[i] || fileNameFromPath(path);
                    return (
                      <li key={path}>
                        <button
                          type="button"
                          onClick={() => downloadFile(path)}
                          disabled={downloading === path}
                          className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-2 text-left text-[12px] font-medium text-gray-700 transition-colors hover:border-green-600 hover:bg-green-50 hover:text-green-900 disabled:opacity-50"
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
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
