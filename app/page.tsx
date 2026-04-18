'use client';

import React, { useEffect, useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Award, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyles = "px-6 py-3 rounded-md font-display font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase";
  const variants: any = {
    primary: "bg-gold hover:bg-[#B8860B] text-ink shadow-lg",
    secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm",
    outline: "border-2 border-white text-white hover:bg-white hover:text-ink",
    ghost: "text-white hover:bg-white/10",
    army: "bg-army-green hover:bg-army-green/90 text-white"
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionTitle = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="mb-12 text-center">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-display text-xs tracking-[0.3em] uppercase font-black mb-3 block text-gold`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-5xl font-display font-black uppercase leading-tight ${light ? 'text-white' : 'text-white'}`}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      className={`h-1 w-20 mx-auto mt-6 bg-gold`}
    />
  </div>
);

const CourseCard = ({ name, description, results, icon: Icon, onEnquire }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/5 border border-white/10 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 -mr-12 -mt-12 rounded-full transform group-hover:scale-150 transition-transform duration-500" />
    <div className="bg-white/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-gold" />
    </div>
    <h3 className="text-2xl font-display font-bold mb-4 uppercase text-white">{name}</h3>
    <p className="text-white/60 mb-6 leading-relaxed text-sm">{description}</p>
    <ul className="space-y-3 mb-8">
      {results.map((r: string, i: number) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
          <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <span>{r}</span>
        </li>
      ))}
    </ul>
    <Button variant="outline" onClick={onEnquire} className="w-full">Enquire Now</Button>
  </motion.div>
);

const TrustPill = ({ icon: Icon, label, value, desc }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-lg flex flex-col justify-center transition-all hover:bg-white/10 group border-b-2 hover:border-b-gold">
    <div className="text-gold text-2xl font-display font-black uppercase mb-1">{value}</div>
    <div className="text-white/80 text-xs font-display font-bold uppercase tracking-widest">{label}</div>
    <div className="text-white/40 text-[10px] mt-2 leading-tight uppercase group-hover:text-white/60 transition-colors">{desc}</div>
  </div>
);

// --- Main Page ---

export default function LandingPage() {
  const inquirySectionId = 'form';
  const redirectUrl = 'https://droneshwardefenceacademy.com/pages/fee.php';
  const logoUrl = 'https://iili.io/BU4rtxS.png';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [formData, setFormData] = useState({ name: '', phone: '', course: 'NDA Foundation (11th/12th)' });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const goToInquiry = () => {
    scrollToSection(inquirySectionId);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCountdown(5);
    setShowThankYou(true);
  };

  useEffect(() => {
    if (!showThankYou) return;

    const timeout = window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, 5000);

    const interval = window.setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 1 : prev - 1));
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [showThankYou]);

  return (
    <div className="bg-army-dark min-h-screen selection:bg-gold selection:text-ink">
      
      {/* --- Sticky Header --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-gold/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Image src={logoUrl} alt="Droneshwar Defence Academy logo" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl text-gold tracking-tighter uppercase transition-colors">Droneshwar Academy (DRDA)</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="text-white font-display font-bold text-sm tracking-widest uppercase flex flex-col items-end">
            <span className="text-[10px] opacity-50">Admission Helpline</span>
            <span>+91 78785 53385</span>
          </div>
          <Button variant="primary" onClick={goToInquiry} className="!py-2 !px-4 text-xs uppercase">Book Demo</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-army-dark flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {['Results', 'Courses', 'Facilities', 'FAQ'].map((item) => (
              <button 
                key={item} 
                onClick={goToInquiry}
                className="text-white text-2xl font-display font-bold uppercase tracking-widest"
              >
                {item}
              </button>
            ))}
            <Button variant="primary" onClick={goToInquiry} className="w-64">Book Free Demo</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen pt-24 overflow-hidden flex flex-col">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/soldier/1920/1080?blur=2" 
            alt="Academy Background" 
            fill 
            className="object-cover opacity-30"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-army-dark" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-24 grow py-12 items-center">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block bg-[#ff4444] text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest mb-6"
            >
              BATCH STARTING SOON: 20th APRIL
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black text-white leading-[1.1] uppercase mb-8"
            >
              NDA Clear Karna Hai? <br />
              <span className="text-gold">Train Like A Future Officer.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-sans border-l-4 border-gold pl-6"
            >
              India&apos;s Premium Defence Academy in Dehradun. Written + SSB + Daily Physical Training by Ex-NDA Mentors. Admission Open!
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button variant="primary" onClick={goToInquiry} className="px-10 py-5 text-base group shadow-2xl">
                Download Syllabus PDF
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" onClick={goToInquiry} className="px-10 py-5 text-base">
                Watch Training Video
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 text-white/50 text-[10px] font-display tracking-[0.2em] uppercase font-black"
            >
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full border border-army-dark bg-gray-500 overflow-hidden">
                    <Image src={`https://picsum.photos/seed/face${i}/100/100`} alt="student" width={100} height={100} referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              Verified Success Stories
            </motion.div>
          </div>

          {/* Lead Form Above Fold */}
          <motion.div 
            id="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <h3 className="text-2xl font-display font-black text-army-green mb-1 uppercase">Book Free Demo Class</h3>
            <p className="text-gray-500 text-[11px] mb-8 leading-relaxed font-bold uppercase tracking-widest opacity-70">Limited seats for next batch. Join now.</p>
            
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-[11px] font-bold font-display uppercase tracking-widest mb-2 text-gray-500">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-ink focus:ring-1 focus:ring-army-green focus:outline-none transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold font-display uppercase tracking-widest mb-2 text-gray-500">Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter WhatsApp number" 
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-ink focus:ring-1 focus:ring-army-green focus:outline-none transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold font-display uppercase tracking-widest mb-2 text-gray-500">Target Course</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData((prev) => ({ ...prev, course: e.target.value }))}
                  className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-ink focus:ring-1 focus:ring-army-green focus:outline-none transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="NDA Foundation (11th/12th)">NDA Foundation (11th/12th)</option>
                  <option value="NDA Target Batch">NDA Target Batch</option>
                  <option value="CDS / AFCAT">CDS / AFCAT</option>
                </select>
              </div>
              <Button variant="army" type="submit" className="w-full py-4 text-base font-black">YES, I WANT TO BE AN OFFICER</Button>
            </form>
          </motion.div>
        </div>

        {/* --- Bento Grid / Trust Bar --- */}
        <div className="container mx-auto px-6 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <TrustPill label="Selections" value="300+" desc="Highest success rate in Dehradun region for 2023." />
            <TrustPill label="On-Campus Ground" value="SSB GTO" desc="Real GTO tasks obstacles for daily physical training." />
            <TrustPill label="Faculty Team" value="EX-ARMY" desc="Learn from those who have served and led the forces." />
            <TrustPill label="Student Success" value="98%" desc="Personal mentorship for personality development." />
          </div>
        </div>
      </section>

      {/* --- Why Droneshwar? --- */}
      <section className="py-24 bg-army-dark/50" id="results">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Droneshwar Edge" title="Why We Are Number 1" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "SSB-Oriented", desc: "Every class is designed to build the OQLs (Officer Like Qualities)." },
              { icon: MessageSquare, title: "Personal Attention", desc: "Batch size restricted to 30 students for maximum interaction." },
              { icon: Clock, title: "Rigorous Discipline", desc: "Training start from 5:00 AM. 4 hours physical + 6 hours written." },
              { icon: ShieldCheck, title: "GTO Ground", desc: "Our own 400m track and real GTO task structures for practice." }
            ].map((usp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-8 rounded-xl border border-white/10 shadow-sm"
              >
                <div className="text-gold mb-6"><usp.icon className="w-10 h-10" /></div>
                <h4 className="font-display font-bold text-xl uppercase mb-3 text-white">{usp.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Courses --- */}
      <section className="py-24 bg-black/20" id="courses">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Mission Oriented" title="Choose Your Path" />
          
          <div className="grid lg:grid-cols-3 gap-8">
            <CourseCard 
              icon={Award}
              name="NDA Foundation"
              description="Best for Class 11th & 12th students aiming early for Officer-entry."
              results={["Schooling + Coaching", "Weekly Mock Tests", "Early Physical Training", "Personality Development"]}
              onEnquire={goToInquiry}
            />
            <CourseCard 
              icon={ShieldCheck}
              name="NDA Target Batch"
              description="Fast-track 6-month intensive preparation for the next NDA exam."
              results={["Short-cut Tricks", "Ex-Military Faculty", "Daily Doubt Sessions", "Full SSB Orientation"]}
              onEnquire={goToInquiry}
            />
            <CourseCard 
              icon={Target}
              name="CDS / AFCAT Target"
              description="Dedicated guidance for graduates focusing on technical and written."
              results={["Advanced Mathematics", "English Mastery", "GK & Current Affairs", "Final Interview Prep"]}
              onEnquire={goToInquiry}
            />
          </div>
        </div>
      </section>

      {/* --- Emotional Connect Section --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://picsum.photos/seed/night/1920/1080" fill alt="soldier" className="object-cover opacity-20" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-army-dark/95" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase mb-8 leading-tight italic">
              &quot;Uniform sirf kapda nahi, <br />
              <span className="text-gold">zimmedari ka doosra naam hai.&quot;</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 italic leading-relaxed">
              At Droneshwar, we don&apos;t just clear your written exams. We build the man who will one day lead his men into battle. 
              Are you ready for the transformation?
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
              <div className="border-l-4 border-gold pl-6 py-4">
                <p className="text-white font-display font-bold text-2xl uppercase">Character</p>
                <p className="text-white/50 text-sm italic">Above Everything</p>
              </div>
              <div className="border-l-4 border-gold pl-6 py-4">
                <p className="text-white font-display font-bold text-2xl uppercase">Courage</p>
                <p className="text-white/50 text-sm italic">Under Fire</p>
              </div>
              <div className="border-l-4 border-gold pl-6 py-4">
                <p className="text-white font-display font-bold text-2xl uppercase">Commitment</p>
                <p className="text-white/50 text-sm italic">To the Nation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Facilities --- */}
      <section className="py-24 bg-army-dark" id="facilities">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <SectionTitle subtitle="The Campus" title="Equipped for Excellence" />
              <div className="grid gap-6 mt-8">
                {[
                  { title: "Smart Classrooms", desc: "Interactive digital boards with curated defence study material." },
                  { icon: MessageSquare, title: "Modern Hostel", desc: "Disciplined living environment with nutritious soldier-grade diet." },
                  { icon: Target, title: "GTO Ground", desc: "In-house obstacle course matching SSB standards in Dehradun style." },
                  { icon: ShieldCheck, title: "Expert Faculty", desc: "Retd. Officers and subject experts for each department." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-gold shrink-0" />
                    <div>
                      <h5 className="font-display font-bold text-white uppercase tracking-wide">{f.title}</h5>
                      <p className="text-white/40 text-sm">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 relative rounded-lg overflow-hidden border border-white/10 shadow-lg"><Image src="https://picsum.photos/seed/ground/500/800" fill alt="ground" className="object-cover" referrerPolicy="no-referrer" /></div>
                <div className="h-40 relative rounded-lg overflow-hidden border border-white/10 shadow-lg"><Image src="https://picsum.photos/seed/hostel/500/500" fill alt="hostel" className="object-cover" referrerPolicy="no-referrer" /></div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-40 relative rounded-lg overflow-hidden border border-white/10 shadow-lg"><Image src="https://picsum.photos/seed/class/500/500" fill alt="classroom" className="object-cover" referrerPolicy="no-referrer" /></div>
                <div className="h-64 relative rounded-lg overflow-hidden border border-white/10 shadow-lg"><Image src="https://picsum.photos/seed/parade/500/800" fill alt="parade" className="object-cover" referrerPolicy="no-referrer" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 bg-black/30" id="faq">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionTitle subtitle="Got Questions?" title="Frequently Asked" />
          
          <div className="space-y-4">
            {[
              { q: "Can I join if I'm from outside Meerut?", a: "Absolutely! We have modern hostel facilities with separate wings for boys and girls, ensuring a safe and disciplined environment for students from all over India." },
              { q: "What is the batch strength?", a: "We believe in personal mentorship. Batch strength is strictly limited to 30-35 students to ensure every aspirant gets individual attention from faculty." },
              { q: "Is physical training mandatory?", a: "Yes. Physical fitness is a core part of the defence lifestyle. Our daily schedule includes 60-90 minutes of ground training led by physical instructors." },
              { q: "Will you help with SSB after the written result?", a: "Our coaching is 'SSB-First'. We start building your personality, communication, and psychological strength from Day 1, with intensive mock interviews after clearing the written." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden shadow-sm transition-all open:ring-1 open:ring-gold">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-display font-bold text-lg text-white uppercase">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-gold group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-white/50 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-24 bg-army-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 -mr-48 -mt-48 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <SectionTitle subtitle="The Final Push" title="Your Journey Begins Now" light />
          <p className="text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t wait for the next notification. The competition is already practicing. 
            Secure your future in the Indian Armed Forces today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="primary" onClick={goToInquiry} className="w-full sm:w-auto px-12 py-6 text-xl uppercase">Start Free Demo</Button>
            <div className="text-white/40 uppercase tracking-widest text-xs font-bold">OR</div>
            <a href="tel:+917878553385" className="flex items-center gap-3 text-white hover:text-gold transition-colors group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">+91 78785 53385</span>
            </a>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/50">
                <Image src={logoUrl} alt="Droneshwar Defence Academy logo" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight uppercase">Droneshwar <span className="text-gold">Academy (DRDA)</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Dehradun&apos;s premier coaching institute for Officers training. 
              Dedicated to building the next generation of commanders for the Indian Nation.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <MapPin className="text-gold w-5 h-5 shrink-0" />
              <p className="text-white/60 text-sm">3rd Floor, Om Tower, Sahastradhara Road, near IT Park, Dehradun, Uttarakhand</p>
            </div>
          </div>
          <div>
            <h6 className="text-white font-display font-bold uppercase tracking-widest mb-6 opacity-40">Quick Links</h6>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><button onClick={goToInquiry} className="hover:text-white">Our Courses</button></li>
              <li><button onClick={goToInquiry} className="hover:text-white">Campus Tour</button></li>
              <li><button onClick={goToInquiry} className="hover:text-white">Recent Selections</button></li>
              <li><button onClick={goToInquiry} className="hover:text-white">Scholarship Test</button></li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-display font-bold uppercase tracking-widest mb-6 opacity-40">Admissions</h6>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><p>Mon - Sat: 9:00 AM - 7:00 PM</p></li>
              <li><p>Call: +91 78785 53385</p></li>
              <li><p>Call: +91 63990 00440</p></li>
              <li className="pt-4">
                <Button variant="outline" onClick={goToInquiry} className="w-full !py-2 uppercase text-xs">Download Prospectus</Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-[0.2em]">
          &copy; 2026 Droneshwar Defence Academy (DRDA). Served for the Brave.
        </div>
      </footer>

      {/* --- Sticky WhatsApp Button --- */}
      <button 
        onClick={goToInquiry}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-2"
      >
        <div className="hidden group-hover:block font-display font-bold text-xs uppercase tracking-widest pl-2">Chat with Expert</div>
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* --- Sticky Call Header for Lead Form --- */}
      <motion.div 
        initial={{ y: -100 }}
        whileInView={{ y: 0 }}
        className="fixed bottom-0 left-0 w-full lg:hidden z-50 bg-[#D4AF37] text-black px-6 py-4 flex items-center justify-between shadow-[0_-5px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black opacity-60 leading-none">Next Batch Starts</span>
          <span className="font-display font-black text-lg uppercase italic">20th April 2026</span>
        </div>
        <Button variant="primary" onClick={goToInquiry} className="bg-black text-white px-8 py-2 rounded-full font-black italic uppercase shadow-xl">
          Book Seat
        </Button>
      </motion.div>

      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="max-w-xl w-full bg-white text-army-dark rounded-xl p-8 text-center shadow-2xl"
            >
              <h3 className="text-3xl font-display font-black uppercase mb-3">Thank You</h3>
              <p className="text-gray-700 mb-6">
                Inquiry received for {formData.name || 'your request'}. Redirecting to fee page in {countdown} seconds.
              </p>
              <Button
                variant="army"
                onClick={() => { window.location.href = redirectUrl; }}
                className="w-full"
              >
                Continue To Fee Page
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
