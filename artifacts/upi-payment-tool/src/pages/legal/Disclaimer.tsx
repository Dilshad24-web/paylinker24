import { AppLayout } from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";

export default function Disclaimer() {
  return (
    <AppLayout>
      <Helmet>
        <title>Disclaimer | Pay Linker</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="font-display font-bold">Disclaimer</h1>
        
        <p>
          <strong>Pay Linker is NOT a payment gateway, payment aggregator, or financial institution.</strong>
        </p>

        <p>
          We merely provide a software tool that generates standard UPI deep links based on the NPCI (National Payments Corporation of India) specifications. 
        </p>

        <ul>
          <li>We do not facilitate the actual transfer of funds.</li>
          <li>We do not hold or route money.</li>
          <li>We cannot issue refunds or track transaction statuses.</li>
        </ul>

        <p>
          All transaction-related queries must be directed to your respective bank or the UPI application (GPay, PhonePe, Paytm, BHIM, etc.) used to complete the payment.
        </p>
      </div>
    </AppLayout>
  );
}
