import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    document.title = "الصفحة الرئيسية - السلام للمحاسبة";
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </div>
  );
}
