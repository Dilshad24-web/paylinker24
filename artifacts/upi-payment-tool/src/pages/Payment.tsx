import { useRoute } from "wouter";
import { usePayment } from "@/hooks/use-payment";
import { getTemplateById } from "@/lib/templates";
import { Helmet } from "react-helmet-async";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, ShieldCheck, AlertCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Payment() {
  const [, params] = useRoute("/pay/:paymentId");
  const paymentId = params?.paymentId || "";
  
  const { data: payment, isLoading, error } = usePayment(paymentId);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-medium animate-pulse">Loading secure payment...</p>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full glass-card rounded-2xl p-8 text-center border-destructive/20">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Not Found</h1>
          <p className="text-muted-foreground mb-8">This payment link is invalid or has expired.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const template = getTemplateById(payment.templateID);
  const { styles } = template;

  // Generate the actual UPI intent URI
  const upiUrl = `upi://pay?pa=${payment.upiID}&pn=${encodeURIComponent(payment.merchantName)}&am=${payment.amount}&cu=INR${payment.productName ? `&tn=${encodeURIComponent(payment.productName)}` : ''}`;

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative"
      style={{ background: styles.background }}
    >
      <Helmet>
        <title>{`Pay ₹${payment.amount} to ${payment.merchantName} | Pay Linker`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Decorative desktop elements */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 z-10 w-full max-w-4xl justify-center">
        
        {/* Mobile View / Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[360px] rounded-[2rem] overflow-hidden shadow-2xl relative"
          style={{ 
            background: styles.card, 
            border: `1px solid ${styles.border}`,
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}
        >
          {/* Top Bar Pattern */}
          <div className="h-2 w-full opacity-50" style={{ background: styles.buttonBg }}></div>
          
          <div className="p-8 flex flex-col items-center text-center">
            
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full mb-6 flex items-center gap-1.5 text-xs font-semibold border border-green-200 dark:border-green-800">
              <ShieldCheck className="w-4 h-4" />
              Verified Merchant
            </div>
            
            <div 
              className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl font-bold uppercase shadow-sm border border-black/5"
              style={{ background: styles.buttonBg, color: styles.buttonText }}
            >
              {payment.merchantName.charAt(0)}
            </div>
            
            <h1 className="font-bold text-2xl leading-tight mb-2" style={{ color: styles.textMain }}>
              {payment.merchantName}
            </h1>
            
            {payment.productName && (
              <p className="text-sm font-medium mb-6 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5" style={{ color: styles.textSecondary }}>
                {payment.productName}
              </p>
            )}
            
            <div className="font-display font-extrabold text-5xl mb-8 tracking-tight" style={{ color: styles.textMain }}>
              <span className="text-3xl mr-1 opacity-70">₹</span>
              {payment.amount}
            </div>
            
            <a 
              href={upiUrl}
              className="w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-transform flex items-center justify-center gap-2"
              style={{ background: styles.buttonBg, color: styles.buttonText }}
            >
              <Zap className="w-5 h-5 fill-current" />
              Pay Now via UPI
            </a>
            
            <div className="mt-6 flex flex-col items-center gap-2 w-full">
              <p className="text-xs uppercase tracking-wider font-semibold opacity-50" style={{ color: styles.textSecondary }}>
                Or copy UPI ID
              </p>
              <div 
                className="w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 border cursor-pointer hover:opacity-80 transition-opacity"
                style={{ borderColor: styles.border, color: styles.textSecondary, background: 'rgba(0,0,0,0.02)' }}
                onClick={() => {
                  navigator.clipboard.writeText(payment.upiID);
                  alert("UPI ID Copied!");
                }}
              >
                <span className="font-mono text-sm">{payment.upiID}</span>
              </div>
            </div>

          </div>
          
          <div className="py-4 border-t text-center" style={{ borderColor: styles.border, background: 'rgba(0,0,0,0.02)' }}>
            <a href="/" className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center justify-center gap-1" style={{ color: styles.textMain }}>
              Powered by Pay Linker
            </a>
          </div>
        </motion.div>

        {/* Desktop QR Code Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:flex flex-col items-center bg-white/90 dark:bg-black/80 backdrop-blur-xl p-8 rounded-3xl border shadow-xl max-w-sm"
        >
          <div className="text-center mb-6">
            <h3 className="font-bold text-xl mb-2 text-foreground">Paying on Desktop?</h3>
            <p className="text-sm text-muted-foreground">Scan this QR code with any UPI app on your phone (GPay, PhonePe, Paytm, etc.)</p>
          </div>
          
          <div className="p-4 bg-white rounded-2xl shadow-inner mb-6 border">
            <QRCodeSVG value={upiUrl} size={200} level="H" includeMargin={true} />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>100% Secure Transaction</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
