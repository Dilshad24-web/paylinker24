import { AppLayout } from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <AppLayout>
      <Helmet>
        <title>Privacy Policy | Pay Linker</title>
      </Helmet>
      <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="font-display font-bold">Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Information We Collect</h2>
        <p>
          Pay Linker operates as a frontend tool that helps you generate UPI payment links. The information you provide 
          (Merchant Name, UPI ID, Amount, Product details) is temporarily stored in our secure database purely for 
          the purpose of rendering the payment page when your customers click the link.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          The data provided is used exclusively to generate the UPI intent links (`upi://pay?...`) and visual 
          payment pages. We do not use your information for marketing, nor do we sell it to third parties.
        </p>

        <h2>3. Payment Processing</h2>
        <p>
          Pay Linker <strong>does not process payments</strong>. We do not touch your money. The payment happens 
          directly between the sender's bank and the receiver's bank via the National Payments Corporation of India (NPCI) UPI network.
        </p>

        <h2>4. Data Storage</h2>
        <p>
          Generated links and associated metadata are stored securely using Firebase infrastructure. Because payment 
          links need to remain active for your customers, data is retained in our database.
        </p>
      </div>
    </AppLayout>
  );
}
