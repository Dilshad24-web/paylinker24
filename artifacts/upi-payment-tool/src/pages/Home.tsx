import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePayment } from "@/hooks/use-payment";
import { getTemplateById } from "@/lib/templates";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle2, ArrowRight, Wallet, Palette, Zap, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  merchantName: z.string().min(1, "Merchant name is required"),
  upiID: z.string().min(3, "Please enter a valid UPI ID").regex(/^[a-zA-Z0-9.\-_+]+@[a-zA-Z0-9]+$/, "Please enter a valid UPI ID (e.g. name@okicici, 9876543210@ybl)"),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  productName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState("template-1");
  const { mutate: createPayment, isPending } = useCreatePayment();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedTemplateId");
    if (saved) {
      setSelectedTemplateId(saved);
    }
  }, []);

  const template = getTemplateById(selectedTemplateId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      merchantName: "",
      upiID: "",
      amount: 0,
      productName: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    createPayment({
      ...data,
      templateID: selectedTemplateId
    }, {
      onSuccess: (result) => {
        const base = window.location.origin + (import.meta.env.BASE_URL !== "/" ? import.meta.env.BASE_URL.replace(/\/$/, "") : "");
        const link = `${base}/pay/${result.paymentID}`;
        setGeneratedLink(link);
        if (result.mode === "local") {
          toast({
            title: "Link Generated!",
            description: "Firebase unavailable — link contains all data and works offline too.",
          });
        }
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: (err as Error).message || "Failed to generate link. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const copyToClipboard = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Payment link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AppLayout>
      <Helmet>
        <title>UPI Payment Link Generator - Create Free UPI Payment Pages | Pay Linker</title>
        <meta name="description" content="Generate beautiful, shareable UPI payment links for free. Choose from 50+ templates. Accept payments directly to your bank account with zero fees." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 md:pt-24 pb-32">
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-10">
          <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
              >
                <Zap className="w-4 h-4" />
                <span>100% Free & Open Source</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-6"
              >
                Create Beautiful <br />
                <span className="gradient-text">UPI Payment Pages</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Generate custom, shareable payment links that open directly in your customer's UPI app. Zero fees, instant settlement, 50+ stunning templates.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-border"
              >
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto lg:mx-0">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-sm">Direct to Bank</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent-foreground mx-auto lg:mx-0">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-sm">50+ Templates</div>
                </div>
                <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400 mx-auto lg:mx-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-sm">QR Code Ready</div>
                </div>
              </motion.div>
            </div>

            {/* Right Form Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2 max-w-md mx-auto"
            >
              <div className="glass-card rounded-2xl p-6 md:p-8 relative">
                {/* Decorative blob behind card */}
                <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl rounded-full opacity-50"></div>
                
                <AnimatePresence mode="wait">
                  {!generatedLink ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold font-display">Generate Link</h2>
                        <Link href="/templates" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                          Change Template <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="mb-6 p-3 rounded-xl border bg-muted/50 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full shadow-sm" style={{ background: template.styles.background, border: `1px solid ${template.styles.border}` }}></div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Using template: </span>
                          <span className="font-semibold">{template.name}</span>
                        </div>
                      </div>

                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">Merchant / Business Name *</label>
                          <input 
                            {...form.register("merchantName")} 
                            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="e.g. Rahul's Coffee Shop"
                          />
                          {form.formState.errors.merchantName && (
                            <p className="text-sm text-destructive">{form.formState.errors.merchantName.message}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">UPI ID (VPA) *</label>
                          <input 
                            {...form.register("upiID")} 
                            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="e.g. merchant@okicici"
                          />
                          {form.formState.errors.upiID && (
                            <p className="text-sm text-destructive">{form.formState.errors.upiID.message}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">Amount (₹) *</label>
                          <input 
                            type="number"
                            {...form.register("amount")} 
                            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="e.g. 500"
                          />
                          {form.formState.errors.amount && (
                            <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">Purpose / Product Name (Optional)</label>
                          <input 
                            {...form.register("productName")} 
                            className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            placeholder="e.g. Order #1234"
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={isPending}
                          className="w-full mt-2 px-6 py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          {isPending ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Generating...
                            </div>
                          ) : "Generate Payment Link"}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-center py-6"
                    >
                      <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold font-display mb-2">Ready to Collect!</h2>
                      <p className="text-muted-foreground mb-8">Share this link with your customer to collect the payment instantly.</p>
                      
                      <div className="p-4 bg-muted rounded-xl break-all text-sm font-mono border text-left mb-6 relative group">
                        {generatedLink}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-muted group-hover:to-muted/50 pointer-events-none rounded-xl transition-all"></div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={copyToClipboard}
                          className="w-full px-6 py-4 rounded-xl font-bold bg-primary text-primary-foreground flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                        >
                          {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          {copied ? "Copied to Clipboard" : "Copy Payment Link"}
                        </button>
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={() => window.open(generatedLink, "_blank")}
                            className="flex-1 px-4 py-3 rounded-xl font-semibold border border-input bg-background hover:bg-muted transition-colors"
                          >
                            Preview Link
                          </button>
                          <button 
                            onClick={() => {
                              setGeneratedLink(null);
                              form.reset();
                            }}
                            className="flex-1 px-4 py-3 rounded-xl font-semibold border border-input bg-background hover:bg-muted transition-colors"
                          >
                            Create New
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
