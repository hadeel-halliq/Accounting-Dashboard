import { createContext,  useContext, useEffect, useState } from "react";
import {
  getInvoiceStatuses,
  getInvoiceTypes,
  getPaymentMethods,
  getUnits,
} from "@/services/enums-service";

const EnumsContext = createContext(null);

export function EnumsProvider({ children }) {
  const [units, setUnits] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [invoiceStatuses, setInvoiceStatuses] = useState([]);
  const [invoiceTypes, setInvoiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEnums() {
      try {
        const [unitsRes, paymentMethodsRes, statusesRes, typesRes] =
          await Promise.all([
            getUnits(),
            getPaymentMethods(),
            getInvoiceStatuses(),
            getInvoiceTypes(),
          ]);
        setUnits(unitsRes.data);
        setPaymentMethods(paymentMethodsRes.data);
        setInvoiceStatuses(statusesRes.data);
        setInvoiceTypes(typesRes.data);
      } finally {
        setLoading(false);
      }
    }
    loadEnums();
  }, []);

  return (
    <EnumsContext.Provider
      value={{
        units,
        paymentMethods,
        invoiceStatuses,
        invoiceTypes,
        loading,
      }}
    >
        {children}
    </EnumsContext.Provider>
  );
}

export function useEnums() {
    return useContext(EnumsContext)
}