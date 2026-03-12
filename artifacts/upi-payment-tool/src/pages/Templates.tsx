import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ALL_TEMPLATES, Template } from "@/lib/templates";
import { PaymentPreview } from "@/components/PaymentPreview";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Templates() {
  const [, setLocation] = useLocation();
  const [selectedId, setSelectedId] = useState<string>("template-1");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const saved = localStorage.getItem("selectedTemplateId");
    if (saved) setSelectedId(saved);
  }, []);

  const handleSelect = (template: Template) => {
    setSelectedId(template.id);
    localStorage.setItem("selectedTemplateId", template.id);
    setLocation("/");
  };

  const categories = ["All", ...Array.from(new Set(ALL_TEMPLATES.map(t => t.category)))];

  const filteredTemplates = activeCategory === "All" 
    ? ALL_TEMPLATES 
    : ALL_TEMPLATES.filter(t => t.category === activeCategory);

  return (
    <AppLayout>
      <Helmet>
        <title>Payment Page Templates - 50+ Designs | Pay Linker</title>
        <meta name="description" content="Browse 50+ beautiful, conversion-optimized UPI payment page templates. Apply instantly to your payment links." />
      </Helmet>

      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Template Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from over 50 premium designs for your payment page. High-converting layouts that look stunning on every device.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((template, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
              key={template.id} 
              className={`group flex flex-col rounded-2xl overflow-hidden border-2 transition-all ${
                selectedId === template.id 
                  ? 'border-primary shadow-xl shadow-primary/20 scale-[1.02]' 
                  : 'border-border hover:border-primary/30 hover:shadow-lg'
              }`}
            >
              <div className="relative">
                <PaymentPreview template={template} />
                
                {selectedId === template.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg z-10">
                    <Check className="w-5 h-5" />
                  </div>
                )}
                
                {/* Overlay Action */}
                <div className={`absolute inset-0 bg-background/60 backdrop-blur-sm z-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${selectedId === template.id ? 'hidden' : ''}`}>
                  <button 
                    onClick={() => handleSelect(template)}
                    className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Use Template
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-card border-t border-border flex items-center justify-between z-10 relative">
                <div>
                  <h3 className="font-bold text-foreground">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.category}</p>
                </div>
                {selectedId === template.id ? (
                  <span className="text-xs font-semibold text-primary px-2 py-1 bg-primary/10 rounded-md">Selected</span>
                ) : (
                  <button 
                    onClick={() => handleSelect(template)}
                    className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                  >
                    Select
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
