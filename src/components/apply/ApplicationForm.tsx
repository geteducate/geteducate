import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, CheckCircle } from "lucide-react";

const applicationSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone must be at least 10 characters").max(20),
  portfolio_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  resume_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  why_interested: z.string().min(50, "Please write at least 50 characters").max(1000),
  relevant_experience: z.string().min(50, "Please write at least 50 characters").max(1000),
  what_stands_out: z.string().min(50, "Please write at least 50 characters").max(1000),
  availability: z.string().max(200).optional(),
  expected_salary: z.string().max(100).optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  job: { id: string; title: string };
  onBack: () => void;
}

const ApplicationForm = ({ job, onBack }: ApplicationFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      portfolio_url: "",
      resume_url: "",
      why_interested: "",
      relevant_experience: "",
      what_stands_out: "",
      availability: "",
      expected_salary: "",
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    const { error } = await supabase.from("applications").insert({
      job_category_id: job.id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      portfolio_url: data.portfolio_url || null,
      resume_url: data.resume_url || null,
      why_interested: data.why_interested,
      relevant_experience: data.relevant_experience,
      what_stands_out: data.what_stands_out,
      availability: data.availability || null,
      expected_salary: data.expected_salary || null,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-4">Application Submitted!</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for applying to the {job.title} position. We'll review your application and get back to you within 5-7 business days.
        </p>
        <Button onClick={() => navigate("/")} className="gradient-primary">
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <span className="text-sm font-medium text-primary">Applying for</span>
        </div>
        <h2 className="font-display text-3xl font-bold">{job.title}</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Info */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
            
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="portfolio_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourportfolio.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume/CV URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://link-to-resume.pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <h3 className="font-semibold text-lg mb-4">Application Questions</h3>

            <FormField
              control={form.control}
              name="why_interested"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why are you interested in this role? *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us what excites you about this opportunity..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relevant_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe your relevant experience *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your background and relevant skills..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="what_stands_out"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What makes you stand out from other candidates? *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us what makes you unique..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Info */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
            <h3 className="font-semibold text-lg mb-4">Additional Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Immediately, 2 weeks notice" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expected_salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $50,000 - $70,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Privacy Notice */}
          <p className="text-sm text-muted-foreground text-center">
            By submitting this application, you agree to our{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms & Conditions
            </Link>
            .
          </p>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full gradient-primary text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
