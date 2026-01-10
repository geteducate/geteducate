import { Mail, Instagram, ExternalLink } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Have questions? We'd love to hear from you. Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Email */}
          <a
            href="mailto:elmurodovshuhrat977@gmail.com"
            className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
            <p className="text-muted-foreground text-sm break-all">elmurodovshuhrat977@gmail.com</p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/geteducate.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 hover:shadow-glow transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Instagram className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Instagram</h3>
            <p className="text-muted-foreground text-sm">@geteducate.io</p>
          </a>

          {/* Twitter/X */}
          <a
            href="https://x.com/Shukhrat_E"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-6 rounded-2xl bg-card border border-border hover:border-foreground/30 hover:shadow-glow transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl bg-foreground flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-background" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-1">Twitter / X</h3>
            <p className="text-muted-foreground text-sm">@Shukhrat_E</p>
          </a>

          {/* Portfolio */}
          <a
            href="https://my-project-delta-ochre.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-6 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-glow transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <ExternalLink className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Portfolio</h3>
            <p className="text-muted-foreground text-sm">View My Work</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
