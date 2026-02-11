// import { useEffect, useState } from "react";

// import LogsService from "@/services/logs.service";

// import LogsTable from "@/components/logs/LogsTable";
// import LogsCards from "@/components/logs/LogsCards";
// import Pagination from "@/components/common/Pagination";

// const LIMIT = 10;

// export default function LogsPage() {
//   /* ================= state ================= */

//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [tableFilter, setTableFilter] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");

//   /* ================= fetch ================= */

//   // useEffect(() => {
//   //   const fetchLogs = async () => {
//   //     try {
//   //       setLoading(true);

//   //       const res =
//   //         (await LogsService.list({
//   //           page,
//   //           limit: LIMIT,
//   //         })) || {};

//   //       setLogs(res.logs ?? []);
//   //       console.log(res.logs);
//   //       setTotalPages(res.totalPages ?? 1);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchLogs();
//   // }, [page]);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         setLoading(true);

//         const res =
//           (await LogsService.list({
//             page,
//             limit: LIMIT,
//             targettable: tableFilter || undefined,
//             operationtype: typeFilter || undefined,
//           })) || {};

//         setLogs(res.logs ?? []);
//         setTotalPages(res.totalPages ?? 1);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, [page, tableFilter, typeFilter]);

//   /* ================= UI ================= */

//   return (
//     <div dir="rtl" className="space-y-6">
//       <h1 className="text-2xl font-bold">سجل العمليات (Logs)</h1>
//       {/* ================= filters ================= */}

//       <div className="flex gap-3 flex-wrap">
//         {/* table filter */}
//         <select
//           className="border rounded-lg px-3 py-2"
//           value={tableFilter}
//           onChange={(e) => {
//             setPage(1);
//             setTableFilter(e.target.value);
//           }}
//         >
//           <option value="">كل الجداول</option>
//           <option value="users">users</option>
//           <option value="products">products</option>
//           <option value="categories">categories</option>
//           <option value="customers">customers</option>
//           <option value="invoices">invoices</option>
//           <option value="payments">payments</option>
//           <option value="permissions">permissions</option>
//         </select>

//         {/* type filter */}
//         <select
//           className="border rounded-lg px-3 py-2"
//           value={typeFilter}
//           onChange={(e) => {
//             setPage(1);
//             setTypeFilter(e.target.value);
//           }}
//         >
//           <option value="">كل العمليات</option>
//           <option value="CREATE">CREATE</option>
//           <option value="UPDATE">UPDATE</option>
//           <option value="DELETE">DELETE</option>
//         </select>
//       </div>

//       {loading && (
//         <div className="text-center py-12 text-muted-foreground">
//           جاري التحميل...
//         </div>
//       )}

//       {!loading && logs.length === 0 && (
//         <div className="text-center py-12 text-muted-foreground">
//           لا يوجد سجلات
//         </div>
//       )}

//       {!loading && logs.length > 0 && (
//         <>
//           {/* mobile */}
//           <div className="md:hidden">
//             <LogsCards data={logs} />
//           </div>

//           {/* desktop */}
//           <div className="hidden md:block">
//             <LogsTable data={logs} />
//           </div>

//           <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//         </>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";

import LogsService from "@/services/logs.service";

import LogsTable from "@/components/_logs/LogsTable";
import LogsCards from "@/components/_logs/LogsCards";
import Pagination from "@/components/common/Pagination";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const LIMIT = 10;

/* ========================================= */

export default function LogsPage() {
  /* ================= state ================= */

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //  الفلاتر الجديدة
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [tableFilter, setTableFilter] = useState("ALL");

  /* ================= fetch ================= */

  useEffect(() => {
    document.title = "سجلات الحركة - السلام للمحاسبة";
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);

        const params = {
          page,
          limit: LIMIT,
          _t: Date.now(), // يمنع الكاش
        };

        // فلترة النوع
        if (typeFilter !== "ALL") {
          params.operationtype = typeFilter;
        }

        // فلترة الجدول
        if (tableFilter !== "ALL") {
          params.targettable = tableFilter;
        }

        const res = (await LogsService.list(params)) || {};

        setLogs(res.logs ?? []);
        setTotalPages(res.totalPages ?? 1);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [page, typeFilter, tableFilter]); //  مهم جداً
  console.log("REQUEST PARAMS:", {
    page,
    typeFilter,
  });

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="text-2xl font-bold">سجل العمليات (Logs)</h1>

      {/* ================= filters ================= */}
      <div className="flex gap-3 flex-wrap">
        {/* فلتر نوع العملية */}
        <Select
          value={typeFilter}
          onValueChange={(v) => {
            setTypeFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="نوع العملية" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">الكل</SelectItem>
            <SelectItem value="CREATE">CREATE</SelectItem>
            <SelectItem value="UPDATE">UPDATE</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>

        {/* فلتر الجدول */}
        <Select
          value={tableFilter}
          onValueChange={(v) => {
            setTableFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="الجدول" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">الكل</SelectItem>
            <SelectItem value="users">users</SelectItem>
            <SelectItem value="permissions">permissions</SelectItem>
            <SelectItem value="invoices">invoices</SelectItem>
            <SelectItem value="products">products</SelectItem>
            <SelectItem value="customers">customers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ================= loading ================= */}

      {loading && (
        <div className="text-center py-12 text-muted-foreground">
          جاري التحميل...
        </div>
      )}

      {/* ================= empty ================= */}

      {!loading && logs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          لا يوجد سجلات
        </div>
      )}

      {/* ================= data ================= */}

      {!loading && logs.length > 0 && (
        <>
          <div className="md:hidden">
            <LogsCards data={logs} />
          </div>

          <div className="hidden md:block">
            <LogsTable data={logs} />
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
