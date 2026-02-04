import { createContext, useContext, useEffect, useState } from "react";
import {
  getInvoiceStatuses,
  getInvoiceTypes,
  getPaymentMethods,
  getUnits,
} from "@/services/enums-service";
import { useAuth } from "@/context/AuthContext";

const EnumsContext = createContext(null);

export function EnumsProvider({ children }) {
  const { isAuthenticated, branchId } = useAuth();

  const [units, setUnits] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [invoiceStatuses, setInvoiceStatuses] = useState([]);
  const [invoiceTypes, setInvoiceTypes] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // reset when user logs out
      setUnits([]);
      setPaymentMethods([]);
      setInvoiceStatuses([]);
      setInvoiceTypes([]);
      return;
    }

    async function loadEnums() {
      setLoading(true);
      try {
        const [
          unitsRes,
          paymentMethodsRes,
          statusesRes,
          typesRes,
        ] = await Promise.all([
          getUnits(branchId),
          getPaymentMethods(),
          getInvoiceStatuses(),
          getInvoiceTypes(),
        ]);

        setUnits(unitsRes.data?.data ?? []);
        setPaymentMethods(paymentMethodsRes.data?.data ?? []);
        setInvoiceStatuses(statusesRes.data?.data ?? []);
        setInvoiceTypes(typesRes.data?.data ?? []);
      } catch (err) {
        console.error("Failed to load enums", err);
      } finally {
        setLoading(false);
      }
    }

    loadEnums();
  }, [isAuthenticated, branchId]);

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
  const context = useContext(EnumsContext);
  if (!context) {
    throw new Error("useEnums must be used within EnumsProvider");
  }
  return context;
}
