import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">G</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Get<span className="text-primary">Educate</span>
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
