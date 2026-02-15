import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersService from "@/services/users.service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await UsersService.get(id);
        setUser(data);
      } finally { setLoading(false); }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center py-16 text-muted-foreground">جاري التحميل...</div>;
  if (!user) return <div className="text-center py-16 text-destructive">المستخدم غير موجود</div>;

  return (
    <div dir="rtl" className="space-y-6 max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">تفاصيل المستخدم</h1>
        <Button variant="outline" onClick={() => navigate("/users")}>رجوع</Button>
      </div>

      <Card>
        <CardContent className="p-6 grid gap-4 text-sm">
          <Row label="الاسم الكامل" value={user.fullname} />
          <Row label="البريد الإلكتروني" value={user.email} />
          <Row label="رقم الفرع (Branch ID)" value={<span className="font-mono font-bold text-blue-600">{user.branchid || "—"}</span>} />
          <Row label="الرتبة" value={user.role} />
          <Row label="الحالة" value={
            <Badge variant={user.isactive ? "default" : "secondary"}>
              {user.isactive ? "مفعل" : "غير مفعل"}
            </Badge>
          } />
          <Row label="آخر تسجيل دخول" value={user.lastlogindate ? new Date(user.lastlogindate).toLocaleString("ar-SY") : "—"} />
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2 items-center">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

