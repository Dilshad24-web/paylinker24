import { Template } from "@/lib/templates";
import { CheckCircle2 } from "lucide-react";

interface PaymentPreviewProps {
  template: Template;
  merchantName?: string;
  amount?: number;
  productName?: string;
}

export function PaymentPreview({ 
  template, 
  merchantName = "Demo Merchant", 
  amount = 999,
  productName = "Premium Services"
}: PaymentPreviewProps) {
  const { styles } = template;

  return (
    <div 
      className="w-full aspect-[9/16] rounded-xl overflow-hidden relative shadow-lg isolate flex items-center justify-center p-4 transition-transform duration-300"
      style={{ background: styles.background }}
    >
      <div 
        className="w-full max-w-[280px] rounded-2xl p-6 flex flex-col items-center text-center backdrop-blur-md"
        style={{ 
          background: styles.card, 
          border: `1px solid ${styles.border}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-full mb-4 flex items-center gap-1.5 text-xs font-medium border border-green-200 dark:border-green-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified
        </div>
        
        <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center text-xl font-bold uppercase shadow-sm"
          style={{ background: styles.buttonBg, color: styles.buttonText }}>
          {merchantName.charAt(0)}
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: styles.textMain }}>
          {merchantName}
        </h3>
        
        <p className="text-sm mb-6" style={{ color: styles.textSecondary }}>
          {productName}
        </p>
        
        <div className="font-display font-bold text-4xl mb-8 tracking-tight" style={{ color: styles.textMain }}>
          ₹{amount}
        </div>
        
        <div 
          className="w-full py-3 rounded-xl font-semibold text-sm shadow-md flex items-center justify-center opacity-90 cursor-not-allowed"
          style={{ background: styles.buttonBg, color: styles.buttonText }}
        >
          Pay Now
        </div>
      </div>
    </div>
  );
}
