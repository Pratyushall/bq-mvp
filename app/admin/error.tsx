"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-4 border border-yellow-500/20 rounded-2xl p-6 bg-zinc-900">
        <h1 className="text-xl font-semibold">Admin crashed</h1>
        <p className="text-sm text-zinc-400">
          {error?.message || "A client error occurred."}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              try {
                localStorage.removeItem("bq.cms");
              } catch {}
              reset();
            }}
            className="px-3 py-2 rounded bg-yellow-500 text-black"
          >
            Clear CMS & Retry
          </button>
          <button
            onClick={() => location.reload()}
            className="px-3 py-2 rounded border border-yellow-500/30"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}
