export default function LogsCards({ data = [] }) {
  if (!data.length) return null;

  return (
    <div className="space-y-4">
      {data.map((log) => (
        <div
          key={log.logid}
          className="rounded-2xl border bg-card shadow-sm p-4 space-y-3"
        >
          {/* header */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm">
              #{log.logid}
            </span>

            <span className="text-xs text-muted-foreground">
              {new Date(log.operationtime).toLocaleString()}
            </span>
          </div>

          {/* body */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            <Field label="العملية" value={log.operationtype} />

            <Field label="الجدول" value={log.targettable} />

            <Field label="رقم السجل" value={log.recordid} />

            <Field
              label="المستخدم"
              value={log.users?.fullname || "—"}
            />

            <Field
              label="البريد"
              value={log.users?.email || "—"}
            />

          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================= */
/* reusable field */
/* ================================= */

function Field({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">
        {label}
      </span>
      <span className="font-medium break-words">
        {value}
      </span>
    </div>
  );
}
