import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Headphones, Video, Palette, PenTool, Code, Film, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ApplicationForm from "@/components/apply/ApplicationForm";

const iconMap: { [key: string]: any } = {
  Headphones,
  Video,
  Palette,
  PenTool,
  Code,
  Film,
};

interface JobCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const Apply = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobCategory[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("job_categories")
        .select("*")
        .eq("is_active", true);

      if (!error && data) {
        setJobs(data);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => setSelectedJob(null)}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Roles
            </Button>
            <ApplicationForm job={selectedJob} onBack={() => setSelectedJob(null)} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Open <span className="text-gradient">Roles</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our team and be part of something amazing. Select a role that matches your skills and passion.
            </p>
          </div>

          {/* Job Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => {
                const IconComponent = iconMap[job.icon] || Code;
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300 text-left animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {job.description}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Apply;
