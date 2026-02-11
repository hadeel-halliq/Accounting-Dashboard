import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BranchesService from "@/services/branches.service";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BranchDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openPlan, setOpenPlan] = useState(false);

  const [planNotes, setPlanNotes] = useState("");
  const [startDate, setStartDate] = useState("");

  /* ==============================
     Fetch
  ============================== */

  const fetchBranch = async () => {
    try {
      setLoading(true);
      const data = await BranchesService.get(id);

      setBranch(data);

      setPlanNotes(data.plannotes || "");
      setStartDate(data.startdate?.slice(0, 10));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, [id]);

  useEffect(() => {
    document.title = "تفاصيل الفرع - السلام للمحاسبة";
  }, []);

  /* ==============================
     Actions
  ============================== */

  const toggleActive = async () => {
    await BranchesService.toggleActive(id, !branch.isactive);
    fetchBranch();
  };

  const updatePlan = async () => {
    await BranchesService.update(id, {
      startdate: startDate,
      plannotes: planNotes,
    });

    setOpenPlan(false);
    fetchBranch();
  };

  /* ==============================
     UI
  ============================== */

  if (loading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        جاري التحميل...
      </div>
    );
  }

  if (!branch) {
    return (
      <div className="text-center py-16 text-destructive">الفرع غير موجود</div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تفاصيل الفرع</h1>

        <Button variant="outline" onClick={() => navigate("/branches")}>
          رجوع
        </Button>
      </div>

      {/* ================= Info Card ================= */}
      <Card>
        <CardContent className="grid gap-4 p-6 text-sm">
          <Row label="اسم الفرع" value={branch.branchname} />
          <Row label="العنوان" value={branch.address} />
          <Row label="الهاتف" value={branch.phone} />
        </CardContent>
      </Card>

      {/* ================= Plan Card ================= */}
      <Card>
        <CardContent className="space-y-5 p-6">
          <h2 className="font-semibold text-lg">إدارة الاشتراك / الخطة</h2>

          <Row label="الحالة" value={branch.isactive ? "مفعل" : "غير مفعل"} />
          <Row
            label="تاريخ البداية"
            value={new Date(branch.startdate).toLocaleDateString()}
          />
          <Row label="ملاحظات الخطة" value={branch.plannotes || "—"} />

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button variant="secondary" onClick={() => setOpenPlan(true)}>
              تعديل الخطة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= Dialog ================= */}
      <Dialog open={openPlan} onOpenChange={setOpenPlan}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بيانات الخطة</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>تاريخ البداية</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <Label>ملاحظات الخطة</Label>
              <Input
                value={planNotes}
                onChange={(e) => setPlanNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpenPlan(false)}>
              إلغاء
            </Button>

            <Button onClick={updatePlan}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ==============================
   Row
============================== */

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
