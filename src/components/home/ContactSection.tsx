import { Mail, Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Have questions? We'd love to hear from you. Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Email */}
          <a
            href="mailto:elmurodovshuhrat977@gmail.com"
            className="text-center p-6 rounded-2xl bg-card border border-border card-interactive group"
          >
            <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email Us</h3>
            <Button variant="outline" size="sm" className="mt-2">
              Send Email
            </Button>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/geteducate.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-6 rounded-2xl bg-card border border-border card-interactive group"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Instagram className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Instagram</h3>
            <Button variant="outline" size="sm" className="mt-2">
              Follow Us
            </Button>
          </a>

          {/* Twitter/X */}
          <a
            href="https://x.com/Shukhrat_E"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-6 rounded-2xl bg-card border border-border card-interactive group"
          >
            <div className="w-14 h-14 rounded-xl bg-foreground flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-background" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Twitter / X</h3>
            <Button variant="outline" size="sm" className="mt-2">
              Follow Us
            </Button>
          </a>

          {/* Portfolio */}
          <a
            href="https://my-project-delta-ochre.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-6 rounded-2xl bg-card border border-border card-interactive group"
          >
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ExternalLink className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Portfolio</h3>
            <Button variant="outline" size="sm" className="mt-2">
              View Work
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
