export default function LogsTable({ data }) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-right">#</th>
            <th className="p-3 text-right">العملية</th>
            <th className="p-3 text-right">الجدول</th>
            <th className="p-3 text-right">السجل</th>
            <th className="p-3 text-right">المستخدم</th>
            <th className="p-3 text-right">الوقت</th>
          </tr>
        </thead>

        <tbody>
          {data.map((log) => (
            <tr key={log.logid} className="border-t">
              <td className="p-3">{log.logid}</td>

              <td className="p-3">{log.operationtype}</td>

              <td className="p-3">{log.targettable}</td>

              <td className="p-3">{log.recordid}</td>

              <td className="p-3">
                {log.users?.fullname}
              </td>

              <td className="p-3">
                {new Date(log.operationtime).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
