import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "creator" | "user";

export function useRequireRole(requiredRoles: AppRole[]) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session?.user) {
        navigate("/creators", { replace: true });
        return;
      }

      const { data, error } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "creator",
      });

      if (!mounted) return;

      const isCreator = !error && data === true;

      if (!isCreator && requiredRoles.includes("admin")) {
        // If a page requires admin, check admin role too
        const adminCheck = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });
        const isAdmin = !adminCheck.error && adminCheck.data === true;
        if (!isAdmin) navigate("/creators", { replace: true });
      } else if (!isCreator && requiredRoles.includes("creator")) {
        navigate("/creators", { replace: true });
      }

      setLoading(false);
    };

    check();

    return () => {
      mounted = false;
    };
  }, [navigate, requiredRoles]);

  return { loading };
}
