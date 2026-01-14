import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/geteducate-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; full_name?: string } | null>(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Our Mission", href: "#mission" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name,
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const displayName = user?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 p-[2px] shadow-lg shadow-amber-500/40 group-hover:shadow-amber-500/60 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                <img 
                  src={logoImage} 
                  alt="GetEducate Logo" 
                  className="w-9 h-9 object-contain drop-shadow-md brightness-0 invert sepia saturate-[10] hue-rotate-[15deg]"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/30 via-yellow-500/30 to-orange-500/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">
              Get<span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">Educate</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[120px] truncate">{displayName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/apply")} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    My Applications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            <Button 
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/30"
              onClick={() => navigate("/apply")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium text-left"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{displayName}</span>
                    </div>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start text-red-500 hover:text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                )}
                <Button 
                  className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500"
                  onClick={() => navigate("/apply")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;