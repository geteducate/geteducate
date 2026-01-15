import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is GetEducate?",
    answer: "GetEducate is a modern employment-focused platform designed to connect job seekers with relevant job opportunities and employers."
  },
  {
    question: "Is GetEducate an employment agency?",
    answer: "GetEducate operates as a job-connection platform. We help bridge the gap between talent and employers but do not act as the hiring authority."
  },
  {
    question: "Is GetEducate free to use?",
    answer: "Yes. GetEducate is currently free for job seekers. Additional services may be introduced in the future."
  },
  {
    question: "Do you guarantee job placement?",
    answer: "No. While we help connect users with opportunities, final hiring decisions are made solely by employers."
  },
  {
    question: "How can I apply for a job?",
    answer: "You can apply by submitting your details or resume through our website. If your profile matches an opportunity, we may contact you."
  },
  {
    question: "What personal information do you collect?",
    answer: "We may collect basic contact details, resumes, and job-related information that you choose to provide. This data is used only for employment-related purposes."
  },
  {
    question: "How is my data protected?",
    answer: "We take reasonable security measures to protect your data and do not sell personal information to third parties."
  },
  {
    question: "Can I request deletion of my data?",
    answer: "Yes. You can request access to, correction of, or deletion of your personal data at any time."
  },
  {
    question: "Who can use GetEducate?",
    answer: "Anyone seeking job opportunities, internships, or career development can use the platform."
  },
  {
    question: "How can employers collaborate with GetEducate?",
    answer: "Employers can reach out through our contact page to share opportunities or discuss partnerships."
  },
  {
    question: "How can I contact GetEducate?",
    answer: "You can contact us via the contact page or through our official email."
  }
];

const FAQSection = () => {
  // Split FAQs into two columns
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midpoint);
  const rightColumnFaqs = faqs.slice(midpoint);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about GetEducate
          </p>
        </div>

        {/* FAQ Accordion - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Column */}
          <Accordion type="single" collapsible className="space-y-2">
            {leftColumnFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`left-${index}`}
                className="bg-card border border-border rounded-lg px-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 data-[state=open]:shadow-md data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left text-foreground font-medium py-4 text-sm hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right Column */}
          <Accordion type="single" collapsible className="space-y-2">
            {rightColumnFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`right-${index}`}
                className="bg-card border border-border rounded-lg px-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 data-[state=open]:shadow-md data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left text-foreground font-medium py-4 text-sm hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-10 p-5 bg-muted/50 rounded-xl border border-border">
          <p className="text-muted-foreground text-sm">
            Still have questions?{" "}
            <a
              href="#contact"
              className="text-primary font-medium hover:underline"
            >
              Get in touch
            </a>{" "}
            with our team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
