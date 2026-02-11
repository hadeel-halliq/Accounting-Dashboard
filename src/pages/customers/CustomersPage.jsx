import { useEffect } from "react";

export default function CustomersPage() {
  useEffect(() => {
    document.title = "إدارة العملاء - السلام للمحاسبة";
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      {/* table لاحقاً */}
    </div>
  );
}
