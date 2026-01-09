import { Quote } from "lucide-react";

const QuoteSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Icon */}
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8 shadow-glow animate-pulse-glow">
            <Quote className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-2xl md:text-4xl font-display font-medium text-foreground leading-relaxed mb-8">
            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-accent" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Steve Jobs</div>
              <div className="text-muted-foreground text-sm">Co-founder of Apple</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
