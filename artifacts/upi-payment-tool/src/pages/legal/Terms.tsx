import { AppLayout } from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <AppLayout>
      <Helmet>
        <title>Terms & Conditions | Pay Linker</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="font-display font-bold">Terms and Conditions</h1>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using Pay Linker, you agree to these terms. If you disagree, do not use the tool. 
          Pay Linker provides a free utility to generate UPI links and is provided "as is" without warranties.
        </p>

        <h2>2. Service Description</h2>
        <p>
          Pay Linker is a URI generator. It takes your valid UPI Virtual Payment Address (VPA) and creates a 
          standardized deep link that opens installed UPI apps on mobile devices.
        </p>

        <h2>3. Liability</h2>
        <p>
          Pay Linker is not responsible for failed transactions, incorrect UPI IDs entered by the user, or network 
          failures on the NPCI infrastructure. Always verify your generated link before sending it to customers.
        </p>

        <h2>4. Acceptable Use</h2>
        <p>
          You agree not to use Pay Linker to generate links for fraudulent activities, scams, or illegal products. 
          We reserve the right to remove any payment page found to be violating these terms.
        </p>
      </div>
    </AppLayout>
  );
}
