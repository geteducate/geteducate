import { Target, Users, Rocket, Shield, Heart, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const missionItems = [
  {
    icon: Target,
    title: "Clear Goals",
    description: "We help you define and achieve your career objectives with precision and clarity.",
    iconColor: "from-amber-400 to-yellow-500",
    bgColor: "from-amber-500/20 to-yellow-500/10",
    borderColor: "border-amber-500/30",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join a thriving network of ambitious professionals and industry-leading mentors.",
    iconColor: "from-emerald-400 to-green-500",
    bgColor: "from-emerald-500/20 to-green-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    icon: Rocket,
    title: "Growth",
    description: "Accelerate your career trajectory with opportunities that challenge and inspire.",
    iconColor: "from-orange-400 to-red-500",
    bgColor: "from-orange-500/20 to-red-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Partner with verified employers who prioritize talent, integrity, and fair practice.",
    iconColor: "from-cyan-400 to-blue-500",
    bgColor: "from-cyan-500/20 to-blue-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Discover roles that perfectly align with your interests, values, and life goals.",
    iconColor: "from-pink-400 to-rose-500",
    bgColor: "from-pink-500/20 to-rose-500/10",
    borderColor: "border-pink-500/30",
  },
  {
    icon: Zap,
    title: "Speed",
    description: "Fast-track your applications with our streamlined, efficient hiring process.",
    iconColor: "from-yellow-400 to-amber-500",
    bgColor: "from-yellow-500/20 to-amber-500/10",
    borderColor: "border-yellow-500/30",
  },
];

const MissionSection = () => {
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState<"top" | "bottom" | null>(null);

  // Split items into two rows
  const topRow = missionItems.slice(0, 3);
  const bottomRow = missionItems.slice(3, 6);

  return (
    <section id="mission" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-6">
            <Target className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">Our Mission</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Empowering Careers,{" "}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">Transforming Lives</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            At GetEducate, we believe everyone deserves access to meaningful work. 
            Our mission is to bridge the gap between talent and opportunity.
          </p>
        </div>

        {/* Animated Mission Rows */}
        <div className="space-y-6 mb-12">
          {/* Top Row - moves right */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setHoveredRow("top")}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <div 
              className={`flex gap-6 ${hoveredRow === "top" ? "animate-none" : "animate-scroll-right"}`}
              style={{ 
                animationPlayState: hoveredRow === "top" ? "paused" : "running",
                width: "fit-content" 
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...topRow, ...topRow, ...topRow].map((item, index) => (
                <div
                  key={`top-${index}`}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${item.bgColor} border ${item.borderColor} hover:border-opacity-60 transition-all duration-300 min-w-[320px] md:min-w-[380px]`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - moves left */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setHoveredRow("bottom")}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <div 
              className={`flex gap-6 ${hoveredRow === "bottom" ? "animate-none" : "animate-scroll-left"}`}
              style={{ 
                animationPlayState: hoveredRow === "bottom" ? "paused" : "running",
                width: "fit-content" 
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...bottomRow, ...bottomRow, ...bottomRow].map((item, index) => (
                <div
                  key={`bottom-${index}`}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${item.bgColor} border ${item.borderColor} hover:border-opacity-60 transition-all duration-300 min-w-[320px] md:min-w-[380px]`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Apply CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-lg px-10 py-6 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all group"
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