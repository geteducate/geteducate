import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/effects/MouseGlow";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <MouseGlow />
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mb-6">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-muted-foreground">Effective Date: January 2026</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-emerald max-w-none space-y-8">
            <div className="p-6 rounded-2xl bg-card/50 border border-border">
              <p className="text-foreground/90 leading-relaxed">
                At GetEducate, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Information We Collect</h2>
              <p className="text-muted-foreground">We may collect personal information that you voluntarily provide, including:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Name and email address</li>
                <li>Resume or CV and job-related details</li>
                <li>Messages submitted through contact or application forms</li>
              </ul>
              <p className="text-muted-foreground">
                We may also collect basic, non-identifying usage data to improve our website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">How We Use Your Information</h2>
              <p className="text-muted-foreground">Your information is used to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Connect job seekers with employment opportunities</li>
                <li>Communicate with you regarding inquiries or applications</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Data Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell your personal data. Your information may only be shared with trusted employers 
                or service providers when necessary to deliver our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Data Protection</h2>
              <p className="text-muted-foreground">
                We take reasonable technical and organizational measures to protect your data from 
                unauthorized access, loss, or misuse.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to request access to, correction of, or deletion of your personal data at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground">Contact</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <a 
                href="mailto:elmurodovshuhrat977@gmail.com" 
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
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

export default Privacy;
