import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Hardcoded credentials as requested
const CREATOR_LOGIN = "Geteducatee";
const CREATOR_PASSWORD = "@Education26";

const Creators = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (login === CREATOR_LOGIN && password === CREATOR_PASSWORD) {
      // Store creator session in sessionStorage (cleared when browser closes)
      sessionStorage.setItem("creator_authenticated", "true");
      toast({ title: "Welcome!", description: "You've logged in to the Creator Dashboard." });
      navigate("/creators/dashboard");
    } else {
      toast({ 
        title: "Access Denied", 
        description: "Invalid login or password.", 
        variant: "destructive" 
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark opacity-5" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="p-8 rounded-2xl bg-card border border-border shadow-card animate-fade-in">
          {/* Header */}
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-accent-foreground" />
          </div>

          <h1 className="font-display text-2xl font-bold mb-2">Creator Access</h1>
          <p className="text-muted-foreground mb-6">
            This area is restricted to authorized creators only.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Enter your login"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-accent"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Creators;
