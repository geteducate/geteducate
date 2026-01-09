import { Mail, MapPin, Phone } from "lucide-react";

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

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <Mail className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-muted-foreground">hello@geteducate.com</p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <Phone className="w-7 h-7 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
            <p className="text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
