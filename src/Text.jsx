// لما بدخل كسوبر ادمن وبقوم بإنشاء مستخدم لازم يكون حصرا ادمن ولازم اربط هذا الادمن ب branch id ولازم بصفحة الادمن لما انشئ مستخدم بكون حصرا user ومربوط بنفس البرانش تبع الادمن يلي انشئو رح اعطيك الاكواد وعطيني اماكن التعديلات وليش import { createContext, useEffect, useState } from "react";

// import apiClient from "./http/apiClient";
// import { unwrap } from "./http/apiResponse";

// const AuthService = {
//   login: (data) => apiClient.post("/auth/login", data).then(unwrap),

//   logout: () => apiClient.post("/auth/logout").then(unwrap),

//   me: () => apiClient.get("/auth/me").then(unwrap),

//   registerAdmin: (data) =>
//     apiClient
//       .post("/auth/register", {
//         ...data,
//         role: "ADMIN",
//       })
//       .then(unwrap),

//   registerUser: (data) =>
//     apiClient
//       .post("/auth/register", {
//         ...data,
//       })
//       .then(unwrap),
// };

// export default AuthService; import apiClient from "./http/apiClient";
// import { unwrap } from "./http/apiResponse";

// const BranchesService = {

//   list: (params) =>
//     apiClient.get("/branches", { params }).then(unwrap),

//   get: (id) =>
//     apiClient.get(`/branches/${id}`).then(unwrap),

//   create: (data) =>
//     apiClient.post("/branches", data).then(unwrap),

//   update: (id, data) =>
//     apiClient.put(`/branches/${id}`, data).then(unwrap),

//   remove: (id) =>
//     apiClient.delete(`/branches/${id}`).then(unwrap),
// };

// export default BranchesService;
// import apiClient from "./http/apiClient";
// import { unwrap } from "./http/apiResponse";

// const UsersService = {
//   list: (params) => apiClient.get("/users", { params }).then(unwrap),

//   get: (id) => apiClient.get(`/users/${id}`).then(unwrap),

//   update: (id, data) => apiClient.put(`/users/${id}`, data).then(unwrap),

//   toggleActive: (id, isactive) =>
//     apiClient.put(`/users/${id}/toggle-status`, { isactive }).then(unwrap),

//   resetPassword: (id, newpassword) =>
//     apiClient.put(`/users/${id}/reset-password`, { newpassword }).then(unwrap),
// };
 
// export default UsersService; // login https://mini-erp-system-eight.vercel.app/api/v1/auth/login  body {
//   "email": "hadeelhalliq@gmail.com",
//   "password": "Password123!@#h"
// } res  {
//     "success": true,
//     "message": "Logged in",
//     "data": null,
//     "error": null
// } // get me https://mini-erp-system-eight.vercel.app/api/v1/auth/me  res {
//     "success": true,
//     "message": "User retrieved successfully",
//     "data": {
//         "userid": 3,
//         "fullname": "hadeel halliq",
//         "email": "hadeelhalliq@gmail.com",
//         "role": "ADMIN",
//         "branchid": 2,
//         "lastlogindate": "2026-02-14T14:48:22.690Z",
//         "isactive": true
//     },
//     "error": null
// } // Login (Cookie for Branches+)  https://mini-erp-system-eight.vercel.app/api/v1/auth/login body  {
//   "email": "hadeelhalliq@gmail.com",
//   "password": "Password123!@#h"
// } res {
//     "success": true,
//     "message": "Logged in",
//     "data": null,
//     "error": null
// } // greate branch https://mini-erp-system-eight.vercel.app/api/v1/branches body  {
//   "branchname": "hadeel branch",
//   "address": "latakia",
//   "phone": "090000"
// } res {
//     "success": true,
//     "message": "Branch created successfully",
//     "data": {
//         "branchid": 7,
//         "branchname": "hadeel branch",
//         "address": "latakia",
//         "phone": "090000",
//         "isactive": true,
//         "startdate": "2026-02-14T15:29:26.294Z",
//         "plannotes": null
//     },
//     "error": null
// } // get all branches https://mini-erp-system-eight.vercel.app/api/v1/invoices?page=1&limit=10  res {
//     "success": true,
//     "message": "Invoices retrieved successfully",
//     "data": {
//         "invoices": [
//             {
//                 "invoiceid": 13,
//                 "invoicedate": "2026-02-13T15:43:19.801Z",
//                 "customerid": 7,
//                 "createdbyuserid": 3,
//                 "paymenttype": "CASH",
//                 "paymentmethod": null,
//                 "status": "PROCESSING",
//                 "currency": "USD",
//                 "totalbeforediscount": 0,
//                 "discountvalue": 0,
//                 "nettotal": 0,
//                 "totalpaid": 0,
//                 "invoiceitems": [
//                     {
//                         "itemid": 14,
//                         "invoiceid": 13,
//                         "productid": 24,
//                         "selectedunit": "BOX",
//                         "quantity": 0,
//                         "dozensinbox": 0,
//                         "unitprice": 15,
//                         "itemdiscount": 0,
//                         "totalbeforediscount": 0,
//                         "totalafterdiscount": 0,
//                         "notes": null,
//                         "products": {
//                             "productid": 24,
//                             "productname": "صندوق",
//                             "barcode": "dddii"
//                         }
//                     }
//                 ],
//                 "customers": {
//                     "customerid": 7,
//                     "firstname": "عيسى",
//                     "lastname": "الابراهيم",
//                     "companyname": "مدري"
//                 },
//                 "users": {
//                     "userid": 3,
//                     "fullname": "hadeel halliq"
//                 }
//             },
//             {
//                 "invoiceid": 12,
//                 "invoicedate": "2026-02-13T15:33:25.539Z",
//                 "customerid": 7,
//                 "createdbyuserid": 26,
//                 "paymenttype": "CASH",
//                 "paymentmethod": null,
//                 "status": "SHIPPED",
//                 "currency": "USD",
//                 "totalbeforediscount": 444,
//                 "discountvalue": 0,
//                 "nettotal": 444,
//                 "totalpaid": 0,
//                 "invoiceitems": [
//                     {
//                         "itemid": 13,
//                         "invoiceid": 12,
//                         "productid": 21,
//                         "selectedunit": "PIECE",
//                         "quantity": 1,
//                         "dozensinbox": 0,
//                         "unitprice": 444,
//                         "itemdiscount": 0,
//                         "totalbeforediscount": 444,
//                         "totalafterdiscount": 444,
//                         "notes": null,
//                         "products": {
//                             "productid": 21,
//                             "productname": "111113",
//                             "barcode": "4444"
//                         }
//                     }
//                 ],
//                 "customers": {
//                     "customerid": 7,
//                     "firstname": "عيسى",
//                     "lastname": "الابراهيم",
//                     "companyname": "مدري"
//                 },
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz"
//                 }
//             },
//             {
//                 "invoiceid": 10,
//                 "invoicedate": "2026-02-13T15:16:00.967Z",
//                 "customerid": 4,
//                 "createdbyuserid": 26,
//                 "paymenttype": "CASH",
//                 "paymentmethod": "CASH",
//                 "status": "DRAFT",
//                 "currency": "USD",
//                 "totalbeforediscount": 55,
//                 "discountvalue": 0,
//                 "nettotal": 55,
//                 "totalpaid": 0,
//                 "invoiceitems": [
//                     {
//                         "itemid": 11,
//                         "invoiceid": 10,
//                         "productid": 22,
//                         "selectedunit": "PIECE",
//                         "quantity": 1,
//                         "dozensinbox": 0,
//                         "unitprice": 55,
//                         "itemdiscount": 0,
//                         "totalbeforediscount": 55,
//                         "totalafterdiscount": 55,
//                         "notes": null,
//                         "products": {
//                             "productid": 22,
//                             "productname": "555",
//                             "barcode": "55"
//                         }
//                     }
//                 ],
//                 "customers": {
//                     "customerid": 4,
//                     "firstname": "هديل",
//                     "lastname": "مم",
//                     "companyname": "devmmnd"
//                 },
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz"
//                 }
//             },
//             {
//                 "invoiceid": 9,
//                 "invoicedate": "2026-02-13T13:51:30.447Z",
//                 "customerid": 4,
//                 "createdbyuserid": 26,
//                 "paymenttype": "CASH",
//                 "paymentmethod": "AL_HARAM",
//                 "status": "DRAFT",
//                 "currency": "USD",
//                 "totalbeforediscount": 160,
//                 "discountvalue": 0,
//                 "nettotal": 160,
//                 "totalpaid": 0,
//                 "invoiceitems": [
//                     {
//                         "itemid": 10,
//                         "invoiceid": 9,
//                         "productid": 13,
//                         "selectedunit": "PIECE",
//                         "quantity": 8,
//                         "dozensinbox": 0,
//                         "unitprice": 20,
//                         "itemdiscount": 0,
//                         "totalbeforediscount": 160,
//                         "totalafterdiscount": 160,
//                         "notes": null,
//                         "products": {
//                             "productid": 13,
//                             "productname": "كاسات صغيرة",
//                             "barcode": "BAR_1771027292_559"
//                         }
//                     }
//                 ],
//                 "customers": {
//                     "customerid": 4,
//                     "firstname": "هديل",
//                     "lastname": "مم",
//                     "companyname": "devmmnd"
//                 },
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz"
//                 }
//             },
//             {
//                 "invoiceid": 7,
//                 "invoicedate": "2026-02-13T12:16:28.334Z",
//                 "customerid": 3,
//                 "createdbyuserid": 4,
//                 "paymenttype": "CASH",
//                 "paymentmethod": "AL_HARAM",
//                 "status": "DRAFT",
//                 "currency": "USD",
//                 "totalbeforediscount": 240,
//                 "discountvalue": 0,
//                 "nettotal": 240,
//                 "totalpaid": 0,
//                 "invoiceitems": [
//                     {
//                         "itemid": 8,
//                         "invoiceid": 7,
//                         "productid": 11,
//                         "selectedunit": "DOZEN",
//                         "quantity": 12,
//                         "dozensinbox": 0,
//                         "unitprice": 20,
//                         "itemdiscount": 0,
//                         "totalbeforediscount": 240,
//                         "totalafterdiscount": 240,
//                         "notes": null,
//                         "products": {
//                             "productid": 11,
//                             "productname": "Product_1770980837",
//                             "barcode": "BAR_1770980837_64"
//                         }
//                     }
//                 ],
//                 "customers": {
//                     "customerid": 3,
//                     "firstname": "amr",
//                     "lastname": "ahmad",
//                     "companyname": "devmmnd"
//                 },
//                 "users": {
//                     "userid": 4,
//                     "fullname": "yazan saghir"
//                 }
//             },
//             {
//                 "invoiceid": 6,
//                 "invoicedate": "2026-02-13T11:09:41.073Z",
//                 "customerid": 2,
//                 "createdbyuserid": 4,
//                 "paymenttype": "CASH",
//                 "paymentmethod": "CASH",
//                 "status": "DRAFT",
//                 "currency": "USD",
//                 "totalbeforediscount": 960,
//                 "discountvalue": 0,
//                 "nettotal": 960,
//                 "totalpaid": 0,
//                 "invoiceitems": [
//                     {
//                         "itemid": 7,
//                         "invoiceid": 6,
//                         "productid": 11,
//                         "selectedunit": "BOX",
//                         "quantity": 48,
//                         "dozensinbox": 4,
//                         "unitprice": 20,
//                         "itemdiscount": 0,
//                         "totalbeforediscount": 960,
//                         "totalafterdiscount": 960,
//                         "notes": null,
//                         "products": {
//                             "productid": 11,
//                             "productname": "Product_1770980837",
//                             "barcode": "BAR_1770980837_64"
//                         }
//                     }
//                 ],
//                 "customers": {
//                     "customerid": 2,
//                     "firstname": "mohye",
//                     "lastname": "aldeen",
//                     "companyname": "studymode"
//                 },
//                 "users": {
//                     "userid": 4,
//                     "fullname": "yazan saghir"
//                 }
//             }
//         ],
//         "total": 6,
//         "page": 1,
//         "limit": 10,
//         "totalPages": 1
//     },
//     "error": null
// }  get one branche https://mini-erp-system-eight.vercel.app/api/v1/branches/2  res {
//     "success": true,
//     "message": "Branch retrieved successfully",
//     "data": {
//         "branchid": 2,
//         "branchname": "Branch_Updated_1771019676",
//         "address": "Syria - Aleppo",
//         "phone": "+963969146843",
//         "isactive": true,
//         "startdate": "2026-02-10T17:26:27.587Z",
//         "plannotes": null
//     },
//     "error": null
// } // update branch https://mini-erp-system-eight.vercel.app/api/v1/branches/2  body {
//   "branchname": "Branch_Updated_18"
// }  res {
//     "success": true,
//     "message": "Branch updated successfully",
//     "data": {
//         "branchid": 2,
//         "branchname": "Branch_Updated_18",
//         "address": "Syria - Aleppo",
//         "phone": "+963969146843",
//         "isactive": true,
//         "startdate": "2026-02-10T17:26:27.587Z",
//         "plannotes": null
//     },
//     "error": null
// } ------ get users https://mini-erp-system-eight.vercel.app/api/v1/users?page=1&limit=10  res {
//     "success": true,
//     "message": "Users retrieved successfully",
//     "data": {
//         "users": [
//             {
//                 "userid": 25,
//                 "fullname": "gbhnjmk,",
//                 "email": "f5rgthyuji@khjg.kjh",
//                 "role": "USER",
//                 "branchid": 2,
//                 "branchname": null,
//                 "branchName": null,
//                 "lastlogindate": null,
//                 "isactive": true
//             },
//             {
//                 "userid": 8,
//                 "fullname": "noor",
//                 "email": "noor@gmail.com",
//                 "role": "USER",
//                 "branchid": 2,
//                 "branchname": null,
//                 "branchName": null,
//                 "lastlogindate": null,
//                 "isactive": true
//             },
//             {
//                 "userid": 7,
//                 "fullname": "Admin 1770918664",
//                 "email": "admin_1770918664_41@test.com",
//                 "role": "USER",
//                 "branchid": 2,
//                 "branchname": null,
//                 "branchName": null,
//                 "lastlogindate": "2026-02-12T17:51:09.051Z",
//                 "isactive": true
//             }
//         ],
//         "total": 3,
//         "page": 1,
//         "limit": 10,
//         "totalPages": 1
//     },
//     "error": null
// } // get one user https://mini-erp-system-eight.vercel.app/api/v1/users/8 // 8 is user id  {
//     "success": true,
//     "message": "User retrieved successfully",
//     "data": {
//         "userid": 8,
//         "fullname": "noor",
//         "email": "noor@gmail.com",
//         "role": "USER",
//         "branchid": 2,
//         "branchname": null,
//         "branchName": null,
//         "lastlogindate": null,
//         "isactive": true
//     },
//     "error": null
// } Toggle User Status // https://mini-erp-system-eight.vercel.app/api/v1/users/8/toggle-status  body {
//   "isactive": false
// }  res {
//     "success": true,
//     "message": "User status updated successfully",
//     "data": {
//         "userid": 8,
//         "fullname": "noor",
//         "email": "noor@gmail.com",
//         "role": "USER",
//         "branchid": 2,
//         "branchname": null,
//         "branchName": null,
//         "lastlogindate": null,
//         "isactive": false
//     },
//     "error": null
// } // Create Permission https://mini-erp-system-eight.vercel.app/api/v1/permissions body {
//   "userid": 8,
//   "targettable": "invoices",
//   "canadd": true,
//   "canedit": true,
//   "candelete": false,
//   "canprint": true
// } res {
//     "success": true,
//     "message": "Permission created successfully",
//     "data": {
//         "permissionid": 38,
//         "userid": 8,
//         "targettable": "invoices",
//         "canadd": true,
//         "canedit": true,
//         "candelete": false,
//         "canprint": true,
//         "users": {
//             "userid": 8,
//             "fullname": "noor",
//             "email": "noor@gmail.com"
//         }
//     },
//     "error": null
// } // Get User Permissions https://mini-erp-system-eight.vercel.app/api/v1/permissions/user/8 res  {
//     "success": true,
//     "message": "User permissions retrieved successfully",
//     "data": {
//         "permissions": [
//             {
//                 "permissionid": 38,
//                 "userid": 8,
//                 "targettable": "invoices",
//                 "canadd": true,
//                 "canedit": true,
//                 "candelete": false,
//                 "canprint": true,
//                 "users": {
//                     "userid": 8,
//                     "fullname": "noor",
//                     "email": "noor@gmail.com"
//                 }
//             }
//         ]
//     },
//     "error": null
// } // Get One Permission https://mini-erp-system-eight.vercel.app/api/v1/permissions/{{permission_id}}  https://mini-erp-system-eight.vercel.app/api/v1/permissions/38 res {
//     "success": true,
//     "message": "Permission retrieved successfully",
//     "data": {
//         "permissionid": 38,
//         "userid": 8,
//         "targettable": "invoices",
//         "canadd": true,
//         "canedit": true,
//         "candelete": false,
//         "canprint": true,
//         "users": {
//             "userid": 8,
//             "fullname": "noor",
//             "email": "noor@gmail.com"
//         }
//     },
//     "error": null
// } // Update Permission https://mini-erp-system-eight.vercel.app/api/v1/permissions/{{permission_id}}  https://mini-erp-system-eight.vercel.app/api/v1/permissions/38 res {
//     "success": true,
//     "message": "Permission updated successfully",
//     "data": {
//         "permissionid": 38,
//         "userid": 8,
//         "targettable": "invoices",
//         "canadd": true,
//         "canedit": true,
//         "candelete": false,
//         "canprint": true,
//         "users": {
//             "userid": 8,
//             "fullname": "noor",
//             "email": "noor@gmail.com"
//         }
//     },
//     "error": null
// } // Delete Permission https://mini-erp-system-eight.vercel.app/api/v1/permissions/{{permission_id}} https://mini-erp-system-eight.vercel.app/api/v1/permissions/38 res {
//     "success": true,
//     "message": "Permission deleted successfully",
//     "data": null,
//     "error": null
// } // Get Logs https://mini-erp-system-eight.vercel.app/api/v1/logs?page=1&limit=10&targettable=&operationtype=CREATE  res {
//     "success": true,
//     "message": "Logs retrieved successfully",
//     "data": {
//         "logs": [
//             {
//                 "logid": 176,
//                 "operationtype": "CREATE",
//                 "targettable": "permissions",
//                 "recordid": 38,
//                 "operationtime": "2026-02-14T15:37:29.590Z",
//                 "userid": 3,
//                 "users": {
//                     "userid": 3,
//                     "fullname": "hadeel halliq",
//                     "email": "hadeelhalliq@gmail.com"
//                 }
//             },
//             {
//                 "logid": 173,
//                 "operationtype": "CREATE",
//                 "targettable": "branches",
//                 "recordid": 7,
//                 "operationtime": "2026-02-14T15:29:26.375Z",
//                 "userid": 3,
//                 "users": {
//                     "userid": 3,
//                     "fullname": "hadeel halliq",
//                     "email": "hadeelhalliq@gmail.com"
//                 }
//             },
//             {
//                 "logid": 171,
//                 "operationtype": "CREATE",
//                 "targettable": "invoices",
//                 "recordid": 14,
//                 "operationtime": "2026-02-13T17:03:15.546Z",
//                 "userid": 26,
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz",
//                     "email": "mnb@gmail.com"
//                 }
//             },
//             {
//                 "logid": 167,
//                 "operationtype": "CREATE",
//                 "targettable": "invoices",
//                 "recordid": 13,
//                 "operationtime": "2026-02-13T15:43:19.857Z",
//                 "userid": 3,
//                 "users": {
//                     "userid": 3,
//                     "fullname": "hadeel halliq",
//                     "email": "hadeelhalliq@gmail.com"
//                 }
//             },
//             {
//                 "logid": 164,
//                 "operationtype": "CREATE",
//                 "targettable": "invoices",
//                 "recordid": 12,
//                 "operationtime": "2026-02-13T15:33:25.607Z",
//                 "userid": 26,
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz",
//                     "email": "mnb@gmail.com"
//                 }
//             },
//             {
//                 "logid": 162,
//                 "operationtype": "CREATE",
//                 "targettable": "invoices",
//                 "recordid": 11,
//                 "operationtime": "2026-02-13T15:17:29.544Z",
//                 "userid": 26,
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz",
//                     "email": "mnb@gmail.com"
//                 }
//             },
//             {
//                 "logid": 161,
//                 "operationtype": "CREATE",
//                 "targettable": "invoices",
//                 "recordid": 10,
//                 "operationtime": "2026-02-13T15:16:01.033Z",
//                 "userid": 26,
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz",
//                     "email": "mnb@gmail.com"
//                 }
//             },
//             {
//                 "logid": 160,
//                 "operationtype": "CREATE",
//                 "targettable": "customers",
//                 "recordid": 6,
//                 "operationtime": "2026-02-13T15:04:47.235Z",
//                 "userid": 26,
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz",
//                     "email": "mnb@gmail.com"
//                 }
//             },
//             {
//                 "logid": 159,
//                 "operationtype": "CREATE",
//                 "targettable": "customers",
//                 "recordid": 7,
//                 "operationtime": "2026-02-13T15:04:47.235Z",
//                 "userid": 26,
//                 "users": {
//                     "userid": 26,
//                     "fullname": "yaz",
//                     "email": "mnb@gmail.com"
//                 }
//             },
//             {
//                 "logid": 158,
//                 "operationtype": "CREATE",
//                 "targettable": "products",
//                 "recordid": 25,
//                 "operationtime": "2026-02-13T14:57:11.281Z",
//                 "userid": 3,
//                 "users": {
//                     "userid": 3,
//                     "fullname": "hadeel halliq",
//                     "email": "hadeelhalliq@gmail.com"
//                 }
//             }
//         ],
//         "total": 90,
//         "page": 1,
//         "limit": 10,
//         "totalPages": 9
//     },
//     "error": null
// عطيني كل كود بدو تعديل كامل  
// } 