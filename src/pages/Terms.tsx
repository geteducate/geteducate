import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/effects/MouseGlow";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <MouseGlow />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Terms & <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Conditions</span>
            </h1>
            <p className="text-muted-foreground">Effective Date: January 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-amber max-w-none space-y-8">
            <div className="p-6 rounded-2xl bg-card/50 border border-border">
              <p className="text-foreground/90 leading-relaxed">
                By accessing or using GetEducate, you agree to these Terms & Conditions. 
                If you do not agree, please do not use the website.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Use of the Website</h2>
              <p className="text-muted-foreground">
                GetEducate provides a platform designed to connect job seekers with employment opportunities. 
                We do not guarantee job placement or employment outcomes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">User Responsibilities</h2>
              <p className="text-muted-foreground">By using this website, you agree to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and truthful information</li>
                <li>Use the platform for lawful purposes only</li>
                <li>Not misuse, disrupt, or attempt to harm the website or other users</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Applications and Content</h2>
              <p className="text-muted-foreground">
                Any information, resumes, or materials you submit are your responsibility. 
                GetEducate is not responsible for employer decisions, actions, or hiring outcomes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                GetEducate is not liable for any direct or indirect loss or damage arising from the use of 
                this website or reliance on job listings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms & Conditions at any time. Continued use of the website means 
                you accept the updated terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Contact</h2>
              <p className="text-muted-foreground">
                For questions regarding these Terms, please contact us at:
              </p>
              <a 
                href="mailto:elmurodovshuhrat977@gmail.com" 
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                📧 elmurodovshuhrat977@gmail.com
              </a>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
