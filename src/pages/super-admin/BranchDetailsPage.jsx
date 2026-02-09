import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BranchesService from "@/services/branches.service";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BranchDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ==============================
     Fetch branch
  ============================== */

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const data = await BranchesService.get(id);
        setBranch(data); // object فقط
      } finally {
        setLoading(false);
      }
    };

    fetchBranch();
  }, [id]);

  /* ==============================
     UI
  ============================== */

  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        جاري تحميل بيانات الفرع...
      </div>
    );
  }

  if (!branch) {
    return (
      <div className="text-center py-16 text-destructive">
        الفرع غير موجود
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6 max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تفاصيل الفرع</h1>

        <Button variant="outline" onClick={() => navigate("/branches")}>
          رجوع
        </Button>
      </div>

      {/* Card */}
      <Card>
        <CardContent className="grid gap-4 p-6 text-sm">

          <Row label="اسم الفرع" value={branch.branchname} />
          <Row label="العنوان" value={branch.address} />
          <Row label="الهاتف" value={branch.phone} />
          <Row label="الحالة" value={branch.isactive ? "مفعل" : "غير مفعل"} />
          <Row
            label="تاريخ البدء"
            value={new Date(branch.startdate).toLocaleDateString()}
          />
          <Row label="ملاحظات الخطة" value={branch.plannotes || "—"} />

        </CardContent>
      </Card>
    </div>
  );
}

/* ==============================
   Row Component
============================== */

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
