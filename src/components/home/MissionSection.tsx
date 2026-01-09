import { Target, Users, Rocket, Shield, Heart, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const missionItems = [
  {
    icon: Target,
    title: "Clear Goals",
    description: "We help you define and achieve your career objectives with precision.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a network of ambitious professionals and industry leaders.",
  },
  {
    icon: Rocket,
    title: "Growth",
    description: "Accelerate your career with opportunities that challenge you.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Work with verified employers who value talent and integrity.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Find roles that align with your interests and aspirations.",
  },
  {
    icon: Zap,
    title: "Speed",
    description: "Fast-track your applications with our streamlined process.",
  },
];

const MissionSection = () => {
  const navigate = useNavigate();

  return (
    <section id="mission" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Target className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Our Mission</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Empowering Careers,{" "}
            <span className="text-gradient">Transforming Lives</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            At GetEducate, we believe everyone deserves access to meaningful work. 
            Our mission is to bridge the gap between talent and opportunity.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {missionItems.map((item, index) => (
            <div
              key={item.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Apply CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="gradient-accent text-lg px-10 py-6 shadow-glow hover:opacity-90 transition-all group"
            onClick={() => navigate("/apply")}
          >
            Quick Apply Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-muted-foreground mt-4">
            Start your journey today — it only takes 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
