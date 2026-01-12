import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import logoImage from "@/assets/geteducate-logo.png";

const Creators = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user is already logged in via session storage
    const isAuthenticated = sessionStorage.getItem("creator_authenticated");
    if (isAuthenticated === "true") {
      navigate("/creators/dashboard", { replace: true });
      return;
    }
    setCheckingAuth(false);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate credentials
    const validLogin = "Geteducatepro1";
    const validPassword = "@Geteducate08";

    if (login === validLogin && password === validPassword) {
      // Store authentication in session
      sessionStorage.setItem("creator_authenticated", "true");
      toast({ title: "Welcome!", description: "You've logged in to the Creator Dashboard." });
      navigate("/creators/dashboard", { replace: true });
    } else {
      toast({ 
        title: "Access Denied", 
        description: "Invalid login or password. Please try again.", 
        variant: "destructive" 
      });
    }

    setIsLoading(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background */}
      <div className="absolute inset-0 gradient-ocean opacity-50" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="p-8 rounded-2xl bg-card border border-border shadow-card animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center overflow-hidden p-1">
              <img 
                src={logoImage} 
                alt="GetEducate Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold mb-2">Creator Access</h1>
          <p className="text-muted-foreground mb-6 font-medium">
            This area is restricted to authorized creators only. Please sign in with your credentials.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="login" className="font-semibold">Login</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Enter your login"
                required
                className="mt-1 font-medium"
              />
            </div>

            <div>
              <Label htmlFor="password" className="font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 font-medium"
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-accent font-bold text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>

          <p className="text-muted-foreground text-sm mt-6 text-center font-medium">
            Need creator access? Contact the administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Creators;
