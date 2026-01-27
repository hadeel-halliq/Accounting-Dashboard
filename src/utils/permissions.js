export function getPermissionsByRole(role) {
  return {
    // Products
    canCreateProduct: role === "admin" || role === "super_admin",
    canEditProduct: role === "admin" || role === "super_admin",
    canDeleteProduct: role === "super_admin",

    // Categories
    canManageCategories: role === "super_admin",

    // Branches
    canManageBranches: role === "super_admin",

    // Users
    canManageUsers: role === "super_admin",

    // Invoices
    canCreateInvoice: role === "admin" || role === "super_admin",
    canDeleteInvoice: role === "super_admin",
  };
}

