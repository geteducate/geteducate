import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import logoImage from "@/assets/geteducate-logo.png";

const VALID_LOGIN = "Geteducatepro1";
const VALID_PASSWORD = "@educate08";

const Creators = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Check if already authenticated on mount
  if (sessionStorage.getItem("creatorAuthenticated") === "true") {
    navigate("/creators/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate slight delay for UX
    setTimeout(() => {
      if (login.trim() === VALID_LOGIN && password.trim() === VALID_PASSWORD) {
        sessionStorage.setItem("creatorAuthenticated", "true");
        toast({ 
          title: "Welcome back!", 
          description: "Redirecting to dashboard..." 
        });
        navigate("/creators/dashboard", { replace: true });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid login credentials. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 shadow-lg">
            <img 
              src={logoImage} 
              alt="GetEducate" 
              className="w-14 h-14 object-contain"
            />
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-display font-bold text-white mb-4">
            Creator Dashboard
          </h1>
          <p className="text-xl text-white/80 max-w-md leading-relaxed">
            Manage applications, view analytics, and track your team's hiring progress all in one place.
          </p>
          
          {/* Stats preview */}
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-white/70 text-sm mt-1">Real-time updates</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-white/70 text-sm mt-1">Secure access</div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="GetEducate" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="font-display font-bold text-xl">GetEducate</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Sign in to access the creator dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Enter your username"
                required
                className="h-12 bg-muted/50 border-border focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-12 bg-muted/50 border-border focus:border-primary transition-colors pr-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Need access?{" "}
              <Link to="/" className="text-primary hover:underline font-medium">
                Contact Administrator
              </Link>
            </p>
          </div>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creators;
