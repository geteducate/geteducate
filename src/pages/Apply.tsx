import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Headphones, Video, Palette, PenTool, Code, Film, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ApplicationForm from "@/components/apply/ApplicationForm";
import JobDetailModal from "@/components/apply/JobDetailModal";

// Job role images
import customerSupportImg from "@/assets/roles/customer-support.jpg";
import shortFormEditorImg from "@/assets/roles/short-form-editor.jpg";
import creativeDesignerImg from "@/assets/roles/creative-designer.jpg";
import seniorCopywriterImg from "@/assets/roles/senior-copywriter.jpg";
import fullStackDeveloperImg from "@/assets/roles/full-stack-developer.jpg";
import vlogEditorImg from "@/assets/roles/vlog-editor.jpg";

const iconMap: { [key: string]: any } = {
  Headphones,
  Video,
  Palette,
  PenTool,
  Code,
  Film,
};

const imageMap: { [key: string]: string } = {
  "Customer Support": customerSupportImg,
  "Short-Form Editor": shortFormEditorImg,
  "Creative Designer": creativeDesignerImg,
  "Senior Copywriter": seniorCopywriterImg,
  "Full-Stack Developer": fullStackDeveloperImg,
  "Vlog Editor": vlogEditorImg,
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
  const [detailJob, setDetailJob] = useState<JobCategory | null>(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleJobClick = (job: JobCategory) => {
    setDetailJob(job);
    setShowModal(true);
  };

  const handleApplyFromModal = () => {
    setShowModal(false);
    setSelectedJob(detailJob);
  };

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
                <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => {
                const IconComponent = iconMap[job.icon] || Code;
                const jobImage = imageMap[job.title];
                return (
                  <button
                    key={job.id}
                    onClick={() => handleJobClick(job)}
                    className="group rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300 text-left animate-fade-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Job Image */}
                    {jobImage && (
                      <div className="w-full h-40 overflow-hidden">
                        <img 
                          src={jobImage} 
                          alt={job.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    {/* Job Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {job.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal 
        job={detailJob}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onApply={handleApplyFromModal}
      />

      <Footer />
    </div>
  );
};

export default Apply;
