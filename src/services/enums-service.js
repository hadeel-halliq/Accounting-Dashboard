import api from "./api";

export const getPaymentMethods = () => {
  return api.get("/enums/payment-methods");
}; //cash / bank / cheque

export const getUnits = () => {
  return api.get("/enums/units");
}; //piece / kg / box

export const getInvoiceStatuses = () => {
  return api.get("/enums/invoice-statuses");
}; //paid / unpaid / installment

export const getInvoiceTypes = () => {
  return api.get("/enums/invoice-types");
};  //sale / purchase / expense