import { Star, Briefcase, DollarSign, TrendingUp } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    comment: "GetEducate completely transformed my career path. Within 3 weeks of applying, I landed my dream job at a top tech company. The process was seamless and the support was incredible!",
    earnings: "$95,000/year",
    activity: "Hired at Tech Startup",
    rating: 5,
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Video Editor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    comment: "I was skeptical at first, but the quality of opportunities here is unmatched. Found a remote position that lets me work with creators worldwide while earning great money.",
    earnings: "$72,000/year",
    activity: "Freelancing for 5+ clients",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Creative Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    comment: "The application process was so straightforward. No endless hoops to jump through. I got responses within days and started my new role within a month!",
    earnings: "$68,000/year",
    activity: "Lead Designer at Agency",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Customer Support Lead",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    comment: "After years of job hunting frustration, GetEducate was a breath of fresh air. Professional, quick, and they actually care about matching you with the right role.",
    earnings: "$55,000/year",
    activity: "Team Lead at SaaS Company",
    rating: 5,
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Senior Copywriter",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    comment: "The quality of employers on this platform is exceptional. Every company I interviewed with was legitimate, professional, and offered competitive packages.",
    earnings: "$78,000/year",
    activity: "Content Lead at Fintech",
    rating: 5,
  },
  {
    id: 6,
    name: "David Kim",
    role: "Vlog Editor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    comment: "I've tried many job platforms, but GetEducate stands out. The roles are curated, the pay is transparent, and they truly understand the creator economy.",
    earnings: "$65,000/year",
    activity: "Editing for 3 YouTubers",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 mb-6">
            <Star className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Success Stories</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our Satisfied{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Customers</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real people, real success stories. See how GetEducate has helped professionals 
            like you find their dream opportunities.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card border border-border hover:border-emerald-500/30 transition-all duration-300 animate-fade-in hover:shadow-lg hover:shadow-emerald-500/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.comment}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/30"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                  <DollarSign className="w-3.5 h-3.5" />
                  {testimonial.earnings}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm">
                  <Briefcase className="w-3.5 h-3.5" />
                  {testimonial.activity}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">98%</span>
              </div>
              <p className="text-muted-foreground">Placement Success Rate</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-6 h-6 text-amber-400" />
                <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">$68K</span>
              </div>
              <p className="text-muted-foreground">Average Starting Salary</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Briefcase className="w-6 h-6 text-blue-400" />
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">2 Weeks</span>
              </div>
              <p className="text-muted-foreground">Average Time to Hire</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;