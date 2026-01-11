import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Briefcase, Users, Target, AlertTriangle, ArrowRight } from "lucide-react";

// Job role images
import customerSupportImg from "@/assets/roles/customer-support.jpg";
import shortFormEditorImg from "@/assets/roles/short-form-editor.jpg";
import creativeDesignerImg from "@/assets/roles/creative-designer.jpg";
import seniorCopywriterImg from "@/assets/roles/senior-copywriter.jpg";
import fullStackDeveloperImg from "@/assets/roles/full-stack-developer.jpg";
import vlogEditorImg from "@/assets/roles/vlog-editor.jpg";

const imageMap: { [key: string]: string } = {
  "Customer Support": customerSupportImg,
  "Short-Form Editor": shortFormEditorImg,
  "Creative Designer": creativeDesignerImg,
  "Senior Copywriter": seniorCopywriterImg,
  "Full-Stack Developer": fullStackDeveloperImg,
  "Vlog Editor": vlogEditorImg,
};

// Creative job details for each role
const jobDetails: { [key: string]: {
  summary: string;
  roleDescription: string;
  idealCandidate: string[];
  requirements: { title: string; description: string }[];
  shouldNotApply: string[];
  meta: { posted: string; department: string; location: string; type: string };
}} = {
  "Customer Support": {
    summary: "Join GetEducate as a Customer Support Specialist. We believe that support is more than just answering questions – it's about empowering our community of learners at every step of their educational journey. We're seeking a passionate problem-solver who thrives in fast-paced environments and is driven by helping others succeed.",
    roleDescription: "As a Customer Support Specialist at GetEducate, you'll be the primary point of contact for our community. Your mission involves guiding students to success through active engagement via email and community forums, using our tools effectively. You'll develop innovative solutions to improve customer satisfaction, refine support processes, and continuously improve our proactive customer-facing aspects.",
    idealCandidate: [
      "Passionate about helping others: You have a natural desire to solve problems and help customers succeed in their goals.",
      "Excellent communicator: Your communication skills are top-notch, whether it's written, via email or chat, or verbally on calls with customers.",
      "Detail-oriented: You pay attention to the details and nothing gets past you.",
      "Adaptable: You thrive in a fast-paced environment and are quick to learn new systems and technologies."
    ],
    requirements: [
      { title: "Enhancing Customer Satisfaction", description: "As the first point of contact, identify opportunities to elevate the customer experience through the implementation of streamlined support processes and adept use of customer service tools and platforms." },
      { title: "Data-Driven Support", description: "Develop and implement strategies for tracking metrics across customer interactions, utilizing data to drive improvements and provide personalized support." },
      { title: "Precise Assistance", description: "Ensure precise and effective communication in every customer interaction, fostering seamless and satisfying experiences." },
      { title: "Team Collaboration", description: "Work closely with other team members under the guidance of our CS manager, synchronizing efforts to maximize collective productivity and customer satisfaction." },
      { title: "Mentored Excellence", description: "Engage in personalized coaching sessions led by seasoned experts, enhancing your customer support skills and contributing to your professional growth." }
    ],
    shouldNotApply: [
      "You want a normal 9-5. This role is NOT easy. It requires an all-in mentality. We're looking for an applicant who will put in the work that others won't.",
      "You are married to your ideas or cannot take constructive criticism.",
      "If you can't handle stress and pressure."
    ],
    meta: { posted: "Jan 2026", department: "Customer Support", location: "Remote", type: "Full Time" }
  },
  "Short-Form Editor": {
    summary: "Become a Short-Form Editor at GetEducate and transform educational content into viral, engaging clips. We're looking for someone who understands the pulse of social media, knows what captures attention in the first 3 seconds, and can turn complex ideas into digestible, shareable content.",
    roleDescription: "You'll be crafting high-impact short-form videos for TikTok, Instagram Reels, and YouTube Shorts. Your work will directly influence our reach and engagement, turning passive viewers into active learners. You'll work with raw footage and create thumb-stopping content that educates and entertains.",
    idealCandidate: [
      "Trend-savvy: You're always on top of what's viral and know how to adapt trends for educational content.",
      "Visual storyteller: You can convey complex concepts in under 60 seconds through compelling visual narratives.",
      "Fast and efficient: You can produce high-quality content quickly without sacrificing creativity.",
      "Platform expert: You understand the nuances of different short-form platforms and optimize content accordingly."
    ],
    requirements: [
      { title: "Content Creation", description: "Edit and produce 10-15 short-form videos weekly that maintain our quality standards while meeting tight deadlines." },
      { title: "Trend Integration", description: "Stay ahead of platform trends and seamlessly incorporate them into educational content that resonates with our audience." },
      { title: "Motion Graphics", description: "Create eye-catching text animations, transitions, and visual effects that enhance viewer retention." },
      { title: "Audio Mastery", description: "Select and sync music, sound effects, and voiceovers that amplify the emotional impact of each video." },
      { title: "Analytics-Driven", description: "Review performance metrics and iterate on content strategy based on what drives the highest engagement." }
    ],
    shouldNotApply: [
      "You're not active on social media and don't understand short-form content consumption.",
      "You prefer long, detailed projects over quick-turnaround content.",
      "You can't handle feedback and rapid iteration cycles."
    ],
    meta: { posted: "Jan 2026", department: "Content", location: "Remote", type: "Full Time" }
  },
  "Creative Designer": {
    summary: "As a Creative Designer at GetEducate, you'll be the visual voice of our brand. We need someone who can translate educational concepts into stunning visuals that stop scrolls, inspire clicks, and make learning look as exciting as it truly is.",
    roleDescription: "You'll design everything from social media graphics and course thumbnails to marketing materials and brand assets. Your work will be the first impression for millions of potential learners. You'll collaborate with content creators, marketers, and the leadership team to ensure visual consistency across all touchpoints.",
    idealCandidate: [
      "Visually bold: You push creative boundaries and aren't afraid to experiment with new styles and techniques.",
      "Brand-conscious: You understand how to maintain brand consistency while keeping designs fresh and engaging.",
      "Multi-disciplinary: You're comfortable with illustration, typography, layout design, and photo editing.",
      "Speed and quality: You can produce high-quality work under tight deadlines without compromising creativity."
    ],
    requirements: [
      { title: "Social Media Design", description: "Create scroll-stopping graphics for Instagram, Twitter, LinkedIn, and other platforms that drive engagement and shares." },
      { title: "Thumbnail Mastery", description: "Design click-worthy thumbnails for YouTube videos and course content that maximize click-through rates." },
      { title: "Brand Evolution", description: "Contribute to the evolution of our visual identity while maintaining consistency across all materials." },
      { title: "Motion Design", description: "Create simple animations and GIFs that add life to our social presence and marketing campaigns." },
      { title: "Collaborative Creation", description: "Work closely with content and marketing teams to bring creative visions to life efficiently." }
    ],
    shouldNotApply: [
      "You're attached to a single style and resistant to adapting to brand guidelines.",
      "You struggle with constructive feedback and iterative design processes.",
      "You can't manage multiple projects with competing deadlines."
    ],
    meta: { posted: "Jan 2026", department: "Design", location: "Remote", type: "Full Time" }
  },
  "Senior Copywriter": {
    summary: "Words are weapons, and we need a master. As Senior Copywriter at GetEducate, you'll craft the narratives that convert curious visitors into committed learners. Your copy will inspire action, build trust, and make complex educational content accessible and exciting.",
    roleDescription: "You'll write compelling copy for landing pages, email campaigns, social media, video scripts, and marketing materials. Your words will be the bridge between our educational products and the people who need them. You'll work directly with the marketing and content teams to develop messaging strategies that resonate.",
    idealCandidate: [
      "Conversion-focused: You understand the psychology of persuasion and can write copy that drives action.",
      "Versatile voice: You can adapt your tone from casual and fun to professional and authoritative.",
      "Research-driven: You dig deep into audience insights to craft messages that truly resonate.",
      "Deadline-driven: You thrive under pressure and deliver polished work on time, every time."
    ],
    requirements: [
      { title: "Landing Page Copy", description: "Write high-converting landing page copy that clearly communicates value propositions and drives sign-ups." },
      { title: "Email Campaigns", description: "Craft engaging email sequences that nurture leads and maintain subscriber engagement." },
      { title: "Script Writing", description: "Develop scripts for video content that are engaging, educational, and on-brand." },
      { title: "Social Media Voice", description: "Create a consistent social media voice that builds community and drives engagement." },
      { title: "A/B Testing", description: "Develop multiple copy variations for testing and optimize based on performance data." }
    ],
    shouldNotApply: [
      "You prefer writing long-form content and struggle with punchy, concise copy.",
      "You're not comfortable with data-driven decision making.",
      "You can't take criticism of your writing without taking it personally."
    ],
    meta: { posted: "Jan 2026", department: "Marketing", location: "Remote", type: "Full Time" }
  },
  "Full-Stack Developer": {
    summary: "Build the future of education technology at GetEducate. We're looking for a Full-Stack Developer who can take ideas from concept to production, someone who's equally comfortable crafting pixel-perfect UIs and designing scalable backend architectures.",
    roleDescription: "You'll be developing and maintaining our web applications, implementing new features, and optimizing existing systems. You'll work across the entire stack, from React frontends to Node.js backends, collaborating with designers and product managers to create seamless learning experiences.",
    idealCandidate: [
      "Full-stack fluent: You're proficient in both frontend and backend technologies and can move seamlessly between them.",
      "Problem solver: You love tackling complex challenges and finding elegant solutions.",
      "Quality-focused: You write clean, maintainable code and believe in testing and documentation.",
      "Self-starter: You can take ownership of projects and drive them to completion independently."
    ],
    requirements: [
      { title: "Frontend Development", description: "Build responsive, accessible UIs using React, TypeScript, and modern CSS frameworks like Tailwind." },
      { title: "Backend Systems", description: "Develop robust APIs and services using Node.js, with experience in database design and management." },
      { title: "Performance Optimization", description: "Identify and resolve performance bottlenecks to ensure fast, smooth user experiences." },
      { title: "Integration Work", description: "Integrate third-party services and APIs, including payment systems, analytics, and external data sources." },
      { title: "DevOps Awareness", description: "Comfortable with CI/CD pipelines, cloud platforms, and monitoring tools for production systems." }
    ],
    shouldNotApply: [
      "You prefer working in isolation and aren't comfortable with code reviews and pair programming.",
      "You're not interested in staying updated with new technologies and best practices.",
      "You struggle with ambiguous requirements and need everything spelled out."
    ],
    meta: { posted: "Jan 2026", department: "Engineering", location: "Remote", type: "Full Time" }
  },
  "Vlog Editor": {
    summary: "Transform raw footage into cinematic educational experiences. As a Vlog Editor at GetEducate, you'll take our long-form video content and craft it into compelling stories that keep viewers engaged from start to finish.",
    roleDescription: "You'll edit vlogs, tutorials, and documentary-style content, handling everything from rough cuts to final color grading. Your work will shape how our audience experiences educational content, making learning feel like entertainment.",
    idealCandidate: [
      "Storyteller at heart: You understand narrative structure and can build emotional arcs within educational content.",
      "Technical expert: You're proficient in professional editing software and understand color grading, audio mixing, and motion graphics.",
      "Patient and detail-oriented: You're willing to go through hours of footage to find the perfect moments.",
      "Creative collaborator: You can take creative direction while also bringing your own ideas to the table."
    ],
    requirements: [
      { title: "Long-Form Editing", description: "Edit 20-60 minute videos with engaging pacing, seamless transitions, and professional polish." },
      { title: "Color Grading", description: "Apply consistent, branded color grades that enhance the visual quality of all content." },
      { title: "Audio Excellence", description: "Mix and master audio to ensure clear dialogue, balanced music, and impactful sound design." },
      { title: "Graphics Integration", description: "Incorporate lower thirds, callouts, and visual aids that enhance understanding without cluttering the frame." },
      { title: "Revision Management", description: "Handle feedback efficiently and deliver revisions quickly without compromising quality." }
    ],
    shouldNotApply: [
      "You prefer short-form content and find long editing sessions tedious.",
      "You're not comfortable receiving detailed feedback on your creative choices.",
      "You don't have the patience for meticulous audio and color work."
    ],
    meta: { posted: "Jan 2026", department: "Content", location: "Remote", type: "Full Time" }
  }
};

interface JobDetailModalProps {
  job: { id: string; title: string; description: string; icon: string } | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose, onApply }: JobDetailModalProps) => {
  if (!job) return null;

  const details = jobDetails[job.title] || jobDetails["Customer Support"];
  const jobImage = imageMap[job.title];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-gradient-to-b from-background via-background to-card border-border">
        {/* Header with Back button */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
          >
            ← Back
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Title Section */}
          <DialogHeader className="mb-6">
            <DialogTitle className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
              {job.title}
            </DialogTitle>
          </DialogHeader>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs uppercase">Date Posted</p>
                <p className="font-medium">{details.meta.posted}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs uppercase">Department</p>
                <p className="font-medium">{details.meta.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs uppercase">Location</p>
                <p className="font-medium">{details.meta.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs uppercase">Type</p>
                <p className="font-medium">{details.meta.type}</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {jobImage && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow-xl">
              <img 
                src={jobImage} 
                alt={job.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-10">
            {/* Job Summary */}
            <section>
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Job Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed">{details.summary}</p>
            </section>

            {/* Your Role */}
            <section>
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Your Role
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{details.roleDescription}</p>
            </section>

            {/* Ideal Candidate */}
            <section>
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Ideal Candidate
              </h3>
              <ul className="space-y-3">
                {details.idealCandidate.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h3 className="font-display text-xl font-bold mb-6">Requirements</h3>
              <div className="space-y-6">
                {details.requirements.map((req, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors">
                    <h4 className="font-semibold text-primary mb-2">{req.title}</h4>
                    <p className="text-muted-foreground text-sm">{req.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* You Shouldn't Apply If */}
            <section>
              <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                You Shouldn't Apply If
              </h3>
              <ul className="space-y-3">
                {details.shouldNotApply.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-destructive font-bold">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 text-center">
            <h3 className="font-display text-2xl font-bold mb-4">
              Think you're a fit? Apply Today.
            </h3>
            <Button 
              onClick={onApply}
              className="gradient-accent text-accent-foreground px-8 py-6 text-lg font-semibold group"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
