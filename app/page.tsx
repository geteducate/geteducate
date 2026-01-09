'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load Swiper dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize Swiper after it's loaded
      const swiperModule = window as any;
      if (swiperModule.Swiper) {
        new swiperModule.Swiper('.mySwiper', {
          loop: true,
          centeredSlides: true,
          slidesPerView: 1,
          spaceBetween: 40,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            868: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          },
        });
      }
    };
    document.body.appendChild(script);

    // Header scroll effect
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    const nav = document.getElementById('mainNav');
    nav?.classList.toggle('active');
  };

  return (
    <>
      <header id="header">
        <div className="header-container">
          <a href="/" className="logo">
            <span>GetEducate</span>
          </a>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav id="mainNav">
            <a href="#features">Our Mission</a>
            <a href="#testimonials">Success Stories</a>
            <a href="#contact">Contact</a>
            <div className="header-buttons" id="headerButtons">
              <a href="/auth" className="btn btn-ghost">Login</a>
              <a href="/auth" className="btn btn-primary">Careers</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="section-hero">
        <div className="hero-content">
          <div className="hero-badge">Transform Your Future Today</div>
          <h1 className="hero-title">Unlock Your Earning Potential with High-Income Skills</h1>
          <p className="hero-subtitle">Join thousands of members who've turned their ambitions into reality through expert-led training, exclusive opportunities, and a thriving community.</p>
          <div className="hero-cta">
            <a href="/auth" className="btn btn-primary btn-large">Start Your Journey</a>
            <a href="#features" className="btn btn-secondary btn-large">Learn More</a>
          </div>
          <div style={{ marginTop: '48px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1" alt="Team collaboration" style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)' }} />
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-container">
          <p id="quote" className="quote-text active">"On the average, five times as many people read the headline as read the body copy. When you have written your headline, you have spent eighty cents out of your dollar." — David Ogilvy</p>
        </div>
      </section>

      <section id="features" className="section features-section">
        <div className="container">
          <h2 className="text-center">Our Mission</h2>
          <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto var(--spacing-xl)', fontSize: '1.25rem', color: 'var(--gray-700)', fontWeight: 500 }}>We're dedicated to transforming ambitious individuals into highly skilled professionals who command premium incomes. Through expert training, genuine mentorship, and meaningful connections, we help you build the career you've always dreamed of.</p>

          <div className="features-grid">
            <div className="feature-card">
              <img src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" alt="Online training" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }} />
              <div className="feature-icon">
                <i className='bx bx-book-open'></i>
              </div>
              <h3>World-Class Training</h3>
              <p>Master in-demand skills from certified industry experts. Our comprehensive curriculum covers copywriting, full-stack development, digital design, marketing, and business fundamentals. Learn at your own pace with lifetime access to course materials.</p>
            </div>

            <div className="feature-card">
              <img src="https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" alt="Job opportunities" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }} />
              <div className="feature-icon">
                <i className='bx bx-briefcase'></i>
              </div>
              <h3>Premium Job Board</h3>
              <p>Access exclusive, high-paying projects from vetted companies. We carefully curate opportunities ranging from $5k to $50k+ per project. Skip the competition and get direct access to clients and employers actively hiring.</p>
            </div>

            <div className="feature-card">
              <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" alt="Community networking" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }} />
              <div className="feature-icon">
                <i className='bx bx-group'></i>
              </div>
              <h3>Elite Community</h3>
              <p>Connect with thousands of ambitious professionals on the same journey. Network, collaborate, and build genuine friendships with peers who understand your goals. Access exclusive group projects and partnerships.</p>
            </div>

            <div className="feature-card">
              <img src="https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" alt="Success growth" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }} />
              <div className="feature-icon">
                <i className='bx bx-trending-up'></i>
              </div>
              <h3>Proven Track Record</h3>
              <p>Our members consistently achieve 3-6x income increases within 6-12 months. From zero to six-figure earners, our proven system works. See real success stories from real people in real industries.</p>
            </div>

            <div className="feature-card">
              <img src="https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" alt="Mentorship support" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }} />
              <div className="feature-icon">
                <i className='bx bx-support'></i>
              </div>
              <h3>Priority Support</h3>
              <p>Get dedicated guidance from mentors and our support team. Fast-track your progress with personalized feedback on your work. Access office hours, 1-on-1 sessions, and group coaching calls every week.</p>
            </div>

            <div className="feature-card">
              <img src="https://images.pexels.com/photos/3183151/pexels-photo-3183151.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1" alt="Portfolio building" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }} />
              <div className="feature-icon">
                <i className='bx bx-trophy'></i>
              </div>
              <h3>Build Your Portfolio</h3>
              <p>Work on real client projects that build your professional reputation. Every project adds genuine testimonials and case studies to your portfolio. Stand out from thousands of applicants with proven results.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonial-section">
        <h2>Success Stories From Our Members</h2>
        <div className="mySwiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"GetEducate transformed my career. I went from zero clients to earning $8k/month in copywriting within 6 months. The mentorship and opportunities are real."</p>
                <div className="testimonial-details">
                  <span className="name">Alex Johnson</span>
                  <span className="job">24 • Freelance Copywriter</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"Best decision ever. The practical skills and community helped me build a 6-figure agency in under a year. Completely changed my life."</p>
                <div className="testimonial-details">
                  <span className="name">Sophia Chen</span>
                  <span className="job">29 • Agency Owner</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"I landed my dream job as a full-stack developer through GetEducate. The training was world-class and the job opportunities were exactly what I needed."</p>
                <div className="testimonial-details">
                  <span className="name">Marcus Rodriguez</span>
                  <span className="job">26 • Full-Stack Developer</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"From struggling freelancer to $12k/month designer. GetEducate gave me the skills, confidence, and clients I needed to succeed."</p>
                <div className="testimonial-details">
                  <span className="name">Emma Thompson</span>
                  <span className="job">31 • Product Designer</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"The ROI is insane. I made back my investment in the first month and now I'm earning more than I ever thought possible. Thank you GetEducate!"</p>
                <div className="testimonial-details">
                  <span className="name">David Park</span>
                  <span className="job">28 • Marketing Consultant</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"I quit my 9-5 after 3 months thanks to the skills I learned here. Now I work from anywhere and make double what I used to earn."</p>
                <div className="testimonial-details">
                  <span className="name">Jessica Lee</span>
                  <span className="job">27 • Content Strategist</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"The community alone is worth it. But add the training and job opportunities? It's a no-brainer. Changed my trajectory completely."</p>
                <div className="testimonial-details">
                  <span className="name">Ryan Mitchell</span>
                  <span className="job">25 • Brand Strategist</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"From unemployed to employed at a top startup in 4 months. The practical approach and real opportunities made all the difference."</p>
                <div className="testimonial-details">
                  <span className="name">Olivia Martinez</span>
                  <span className="job">23 • UI/UX Designer</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/men/71.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"I was skeptical at first, but the results speak for themselves. Built a profitable business in 8 months with the skills I learned here."</p>
                <div className="testimonial-details">
                  <span className="name">James Anderson</span>
                  <span className="job">30 • E-commerce Consultant</span>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <img src="https://randomuser.me/api/portraits/women/89.jpg" alt="Member" className="testimonial-image" />
              <div className="testimonial-content">
                <i className='bx bxs-quote-alt-left quote-icon'></i>
                <p>"GetEducate gave me the confidence to charge what I'm worth. Now I work with amazing clients and love what I do every single day."</p>
                <div className="testimonial-details">
                  <span className="name">Sarah Williams</span>
                  <span className="job">32 • Brand Consultant</span>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </div>
      </section>

      <div className="cta-section">
        <h2>Ready to Transform Your Career?</h2>
        <p>Join thousands of members who are building the skills and careers they've always dreamed of. Your future starts today.</p>
        <a href="/auth" className="btn btn-primary btn-large">Start Your Free Trial Now</a>
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>GetEducate</h4>
            <p style={{ color: 'var(--gray-400)', marginBottom: '16px' }}>Empowering individuals to unlock their earning potential through high-income skills.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://x.com/Shukhrat_E" target="_blank" rel="noopener noreferrer" title="Follow on X" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', color: 'var(--gray-400)', transition: 'var(--transition)' }} className="social-link">
                <i className='bx bxl-twitter'></i>
              </a>
              <a href="https://www.facebook.com/ShuhratElmurodov8/" target="_blank" rel="noopener noreferrer" title="Follow on Facebook" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', color: 'var(--gray-400)', transition: 'var(--transition)' }} className="social-link">
                <i className='bx bxl-facebook'></i>
              </a>
              <a href="https://youtube.com/@shukhratelmurodov?si=M7V-6M1G9M4UFVoA" target="_blank" rel="noopener noreferrer" title="Subscribe on YouTube" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', color: 'var(--gray-400)', transition: 'var(--transition)' }} className="social-link">
                <i className='bx bxl-youtube'></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#features">Features</a>
            <a href="#opportunities">Opportunities</a>
            <a href="#testimonials">Success Stories</a>
            <a href="/auth">Get Started</a>
          </div>

          <div className="footer-section" id="contact">
            <h4>Get In Touch</h4>
            <a href="mailto:elmurodovshuhrat977@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className='bx bx-envelope'></i> elmurodovshuhrat977@gmail.com
            </a>
            <p style={{ color: 'var(--gray-400)', marginTop: '16px', fontSize: '0.875rem' }}>Reach out with any questions about GetEducate. We typically respond within 24 hours.</p>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 GetEducate. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
