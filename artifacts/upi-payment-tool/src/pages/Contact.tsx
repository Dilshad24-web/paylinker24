import { AppLayout } from "@/components/layout/AppLayout";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <AppLayout>
      <Helmet>
        <title>{"Contact Us | Pay Linker"}</title>
        <meta name="description" content="Contact Pay Linker support for help with UPI payment link generation, templates, or any questions." />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about generating UPI payment links, templates, or feature requests? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="glass-card p-6 rounded-2xl flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Us</h3>
                <p className="text-muted-foreground mb-2">For general inquiries and support.</p>
                <a
                  href="mailto:dilshadansari78606490@gmail.com"
                  className="text-primary font-medium hover:underline break-all"
                >
                  dilshadansari78606490@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Feedback</h3>
                <p className="text-muted-foreground">
                  Your feedback helps us improve Pay Linker. Tell us what features you'd like to see next!
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-3xl border"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Your Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-background border focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Rahul Sharma" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl bg-background border focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="your@email.com" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-background border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="How can we help?"></textarea>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </AppLayout>
  );
}
