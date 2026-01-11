import { Link } from "react-router-dom";
import logoImage from "@/assets/geteducate-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5 shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[12px] bg-background flex items-center justify-center overflow-hidden">
                <img 
                  src={logoImage} 
                  alt="GetEducate Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Get<span className="text-gradient">Educate</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/creators" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              For Creators
            </Link>
            <Link to="/apply" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Apply Now
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GetEducate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
