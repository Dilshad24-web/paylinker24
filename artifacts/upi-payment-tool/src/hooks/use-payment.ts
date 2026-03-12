import { useQuery, useMutation } from "@tanstack/react-query";
import { ref, set, get, child } from "firebase/database";
import { db } from "@/lib/firebase";

export interface PaymentData {
  paymentID: string;
  merchantName: string;
  upiID: string;
  amount: number;
  productName?: string;
  templateID: string;
  createdAt: number;
}

// URL-safe base64 (no +, /, or = characters that break URL routing)
function toUrlSafeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function fromUrlSafeBase64(str: string): string {
  const padded = str + "===".slice(0, (4 - (str.length % 4)) % 4);
  return decodeURIComponent(escape(atob(padded.replace(/-/g, "+").replace(/_/g, "/"))));
}

function encodePaymentToURL(data: PaymentData): string {
  return toUrlSafeBase64(JSON.stringify(data));
}

function decodePaymentFromURL(encoded: string): PaymentData | null {
  try {
    return JSON.parse(fromUrlSafeBase64(encoded)) as PaymentData;
  } catch {
    return null;
  }
}

export function usePayment(paymentId: string) {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async (): Promise<PaymentData> => {
      // Local fallback mode: payment data is encoded directly in the ID
      if (paymentId.startsWith("L_")) {
        const encoded = paymentId.slice(2);
        const decoded = decodePaymentFromURL(encoded);
        if (decoded) return decoded;
        throw new Error("Invalid payment link");
      }

      // Firebase mode
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `payments/${paymentId}`));
        if (snapshot.exists()) {
          return snapshot.val() as PaymentData;
        }
        throw new Error("Payment page not found");
      } catch (err: unknown) {
        const error = err as Error;
        if (error.message === "Payment page not found") throw error;
        throw new Error("Could not load payment page.");
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationFn: async (data: Omit<PaymentData, "paymentID" | "createdAt">) => {
      const paymentID =
        Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      const fullData: PaymentData = {
        ...data,
        paymentID,
        createdAt: Date.now(),
      };

      // Try Firebase with a timeout
      try {
        const writePromise = set(ref(db, `payments/${paymentID}`), fullData);
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Firebase timeout")), 8000)
        );
        await Promise.race([writePromise, timeoutPromise]);
        // Firebase success — return normal short payment ID
        return { ...fullData, mode: "firebase" as const };
      } catch {
        // Fallback — encode all data in the URL itself (always works, no server needed)
        const encoded = encodePaymentToURL(fullData);
        const fallbackID = `L_${encoded}`;
        return { ...fullData, paymentID: fallbackID, mode: "local" as const };
      }
    },
  });
}
