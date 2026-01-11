import { Link } from "react-router-dom";
import logoImage from "@/assets/geteducate-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-[2px] shadow-md shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[12px] bg-card flex items-center justify-center overflow-hidden">
                <img 
                  src={logoImage} 
                  alt="GetEducate Logo" 
                  className="w-8 h-8 object-contain drop-shadow-md"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-yellow-400/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Get<span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">Educate</span>
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
