import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Truck, Home, Building2, Package, Shield, Clock, Star, Phone, Mail, MapPin,
  CheckCircle2, ArrowRight, Menu, X, Quote, Sparkles, Footprints, Building, Construction, Trees,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import moverImg from "@/assets/falcon-mover.jpg";
import truckImg from "@/assets/falcon-truck.jpg";
import cleaningImg from "@/assets/cleaning-service.jpg";
import houseImg from "@/assets/house-move.jpg";
import officeImg from "@/assets/office-move.jpg";
import packingImg from "@/assets/packing.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Falcon Movers & Cleaning Co. — Move • Clean • Store | Machakos & Nairobi" },
      { name: "description", content: "Moving You Forward. Cleaning It Right. House & office relocation, long distance moves, and professional cleaning services across Kenya." },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "Why us" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const movingServices = [
  { icon: Home, title: "House Relocation", value: "house", desc: "Studio to 5-bedroom homes moved safely across Machakos, Nairobi and countrywide.", img: houseImg },
  { icon: Building2, title: "Office Relocation", value: "office", desc: "Weekend & after-hours office moves with zero downtime guaranteed.", img: officeImg },
  { icon: Truck, title: "Long Distance Moves", value: "long", desc: "Anywhere in Kenya — Mombasa, Kisumu, Nakuru, Eldoret and beyond.", img: truckImg },
  { icon: Package, title: "Packing & Storage", value: "packing", desc: "Professional packing and secure storage solutions for short or long term.", img: packingImg },
];

const cleaningServices = [
  { icon: Footprints, title: "Shoes Cleaning", value: "shoes" },
  { icon: Sparkles, title: "Carpet Cleaning & Delivery", value: "carpet" },
  { icon: Building, title: "General Cleaning", value: "general" },
  { icon: Trees, title: "Compound Cleaning", value: "compound" },
  { icon: Construction, title: "Construction Site Cleaning", value: "construction" },
];

const testimonials = [
  { name: "Wanjiku M.", role: "Kilimani, Nairobi", text: "Punctual, polite, and not a single item damaged. Best money I've spent on a move.", rating: 5 },
  { name: "David O.", role: "Operations Manager", text: "Moved our 40-person office over a weekend — live on Monday morning. Flawless.", rating: 5 },
  { name: "Aisha K.", role: "Machakos CBD", text: "They handled my full 3-bedroom move AND deep-cleaned the old apartment. One stop.", rating: 5 },
  { name: "Brian K.", role: "Westlands, Nairobi", text: "Quoted, packed, moved and unpacked in one day. The Falcon crew is the real deal.", rating: 5 },
  { name: "Esther N.", role: "Athi River", text: "Carpet cleaning came out brand new. Polite team and very fair pricing.", rating: 5 },
];

const faqs = [
  { q: "How do I get a moving or cleaning quote?", a: "Fill the quote form below or call 0700 890347 / 0114 636388. We respond within 1 hour during working hours with a free, no-obligation estimate." },
  { q: "Do you offer both moving and cleaning together?", a: "Yes — that's our specialty. Bundle your move with end-of-tenancy or move-in cleaning and save." },
  { q: "Are my belongings insured?", a: "All moves include basic goods-in-transit cover. Comprehensive insurance is available as an add-on for high-value items." },
  { q: "Which areas in Kenya do you cover?", a: "Headquartered in Machakos with a Nairobi branch — we move across all 47 counties." },
  { q: "What payment methods do you accept?", a: "M-Pesa, bank transfer, and cash. A small deposit secures your booking; the balance is paid on completion." },
  { q: "How early should I book?", a: "We recommend 3-7 days for standard moves and 2 weeks for offices. Same-day jobs subject to availability." },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState<string>("");

  function selectService(value: string) {
    setService(value);
    // Defer scroll until state has rendered
    requestAnimationFrame(() => {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleQuote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!service) {
      toast.error("Please choose a service type.");
      return;
    }
    toast.success("Quote request received!", {
      description: `We'll call within 1 hour about your ${service} request.`,
    });
    (e.target as HTMLFormElement).reset();
    setService("");
  }

  // Testimonials carousel
  const [tIndex, setTIndex] = useState(0);
  const tCount = testimonials.length;
  const pausedRef = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setTIndex(i => (i + 1) % tCount);
    }, 5000);
    return () => clearInterval(id);
  }, [tCount]);
  const goPrev = () => setTIndex(i => (i - 1 + tCount) % tCount);
  const goNext = () => setTIndex(i => (i + 1) % tCount);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="size-9 grid place-items-center rounded-lg bg-primary text-brand shadow-soft">
              <Truck className="size-5" />
            </span>
            <span>Falcon<span className="text-gradient-brand"> Movers</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {nav.map(n => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{n.label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+254700890347" className="text-sm font-semibold text-primary flex items-center gap-2">
              <Phone className="size-4" /> 0700 890347
            </a>
            <Button asChild className="bg-brand-gradient text-brand-foreground hover:opacity-90">
              <a href="#quote">Get Quote</a>
            </Button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 flex flex-col gap-3">
              {nav.map(n => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-2 text-base font-medium">{n.label}</a>
              ))}
              <Button asChild className="bg-brand-gradient text-brand-foreground mt-2">
                <a href="#quote">Get Free Quote</a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <img src={truckImg} alt="" className="w-full h-full object-cover" width={1600} height={1024} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/90 via-primary/70 to-transparent" />
        {/* Decorative falcon-flyer style swooshes */}
        <div className="absolute -top-32 -right-32 size-[600px] rounded-full bg-white/5" />
        <div className="absolute -bottom-40 -left-20 size-[500px] rounded-full bg-brand/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-brand" /> Move • Clean • Store
            </span>
            <h1 className="mt-6 font-display font-bold leading-[0.95] tracking-tight">
              <span className="block text-5xl sm:text-6xl lg:text-7xl">FALCON</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-gradient-brand">MOVERS</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-semibold">& CLEANING CO.</span>
            </h1>
            <p className="mt-6 text-lg italic text-white/85 max-w-xl">
              Moving You Forward. Cleaning It Right.
            </p>
            <p className="mt-3 text-base text-white/75 max-w-xl">
              Affordable house & office relocation, long-distance moves and full-service cleaning across Kenya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <a
                href="#quote"
                className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-brand-gradient text-brand-foreground font-bold text-base sm:text-lg shadow-elevated ring-2 ring-brand/40 ring-offset-2 ring-offset-primary hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 animate-fade-in"
              >
                <span className="absolute inset-0 rounded-xl bg-brand/30 blur-xl -z-10 group-hover:bg-brand/50 transition-colors" />
                Get a Free Quote
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white h-14 px-6">
                <a href="tel:+254700890347"><Phone className="mr-2 size-4" /> Call Now</a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[["10K+", "Jobs done"], ["4.9★", "Avg rating"], ["47", "Counties"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold font-display text-brand">{n}</div>
                  <div className="text-xs text-white/70 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-brand/20 blur-3xl rounded-full" />
            <div className="relative grid grid-cols-2 gap-4">
              <img src={moverImg} alt="Falcon Movers professional" className="rounded-2xl shadow-elevated w-full aspect-[3/4] object-cover" width={800} height={1067} />
              <img src={truckImg} alt="Falcon Movers branded truck" className="rounded-2xl shadow-elevated w-full aspect-[3/4] object-cover mt-10" width={800} height={1067} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ["Licensed & insured", Shield],
            ["On-time guarantee", Clock],
            ["No hidden fees", CheckCircle2],
            ["M-Pesa accepted", Phone],
          ].map(([t, Icon]: any) => (
            <div key={t} className="flex items-center justify-center gap-2 text-sm font-medium">
              <Icon className="size-4 text-brand" /> {t}
            </div>
          ))}
        </div>
      </section>

      {/* MOVING SERVICES */}
      <section id="services" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Moving Services</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Everything you need for a stress-free move</h2>
            <p className="mt-4 text-muted-foreground text-lg">From a single room to an entire corporate HQ — we've got you covered.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movingServices.map(s => (
              <button
                key={s.title}
                type="button"
                onClick={() => selectService(s.value)}
                className="group text-left rounded-2xl border border-border bg-card overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="size-11 grid place-items-center rounded-xl bg-primary text-brand mb-4">
                    <s.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-brand transition-colors">
                    Get quote <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CLEANING SERVICES */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-32 -right-32 size-[500px] rounded-full bg-brand/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src={cleaningImg} alt="Falcon Cleaning services" loading="lazy" width={1024} height={1024} className="rounded-2xl shadow-elevated w-full aspect-[4/3] object-cover" />
          </div>
          <div>
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Cleaning Services</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Cleaning it right — every corner, every time.</h2>
            <p className="mt-4 text-white/80 text-lg">
              From shoes to full construction sites, our cleaning crews deliver a finish you can see and smell.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {cleaningServices.map(s => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => selectService(s.value)}
                    className="w-full flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-brand/40 transition-colors text-left group focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <span className="size-10 grid place-items-center rounded-lg bg-brand/15 text-brand flex-shrink-0">
                      <s.icon className="size-5" />
                    </span>
                    <span className="font-medium flex-1">{s.title}</span>
                    <ArrowRight className="size-4 text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY US / ABOUT */}
      <section id="about" className="py-20 lg:py-28 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Why Falcon</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Built on trust. Run with care.</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Headquartered in Machakos with a Nairobi branch — we've helped thousands of Kenyan families and businesses move and clean with confidence.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Trained, uniformed crews — never casual labour",
                "Modern branded trucks for every size of move",
                "Transparent pricing with detailed written quotes",
                "Goods-in-transit insurance on every job",
                "One team for moving AND cleaning — bundle and save",
              ].map(p => (
                <li key={p} className="flex gap-3">
                  <CheckCircle2 className="size-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={houseImg} alt="" loading="lazy" width={400} height={500} className="rounded-2xl shadow-soft aspect-[4/5] object-cover" />
            <img src={packingImg} alt="" loading="lazy" width={400} height={500} className="rounded-2xl shadow-soft aspect-[4/5] object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-center mx-auto">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Reviews</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Kenyans love working with us</h2>
          </div>
          <div
            className="mt-12 relative"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${tIndex * 100}%)` }}
              >
                {testimonials.map(t => (
                  <div key={t.name} className="w-full flex-shrink-0 px-2 sm:px-6">
                    <div className="mx-auto max-w-3xl rounded-2xl bg-card border border-border p-8 sm:p-10 shadow-soft relative text-center">
                      <Quote className="absolute top-6 left-6 size-10 text-brand/20" />
                      <div className="flex justify-center gap-0.5 text-brand">
                        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}
                      </div>
                      <p className="mt-5 text-lg sm:text-xl text-foreground leading-relaxed">"{t.text}"</p>
                      <div className="mt-6">
                        <div className="font-bold">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 size-11 grid place-items-center rounded-full bg-card border border-border shadow-soft hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 size-11 grid place-items-center rounded-full bg-card border border-border shadow-soft hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === tIndex ? "w-8 bg-brand" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" className="py-20 lg:py-28 bg-hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Free Quote</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Get your estimate in under 60 seconds.</h2>
            <p className="mt-4 text-white/85 text-lg">Tell us about your job. We'll call back within 1 hour with a transparent, no-pressure quote.</p>
            <div className="mt-8 space-y-3 text-white/90">
              <div className="flex items-center gap-3"><Phone className="size-4 text-brand" /> 0700 890347 / 0114 636388</div>
              <div className="flex items-center gap-3"><Mail className="size-4 text-brand" /> falconmoversandcleaning@gmail.com</div>
              <div className="flex items-center gap-3"><MapPin className="size-4 text-brand" /> Machakos CBD (Main) • Nairobi Branch</div>
            </div>
          </div>
          <form onSubmit={handleQuote} className="rounded-2xl bg-card text-card-foreground p-6 sm:p-8 shadow-elevated space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Jane Wanjiku" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required placeholder="+254 7xx xxx xxx" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
            </div>
            <div>
              <Label>Service type</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Choose a service" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House Relocation</SelectItem>
                  <SelectItem value="office">Office Relocation</SelectItem>
                  <SelectItem value="long">Long Distance</SelectItem>
                  <SelectItem value="packing">Packing & Storage</SelectItem>
                  <SelectItem value="shoes">Shoes Cleaning</SelectItem>
                  <SelectItem value="carpet">Carpet Cleaning</SelectItem>
                  <SelectItem value="general">General Cleaning</SelectItem>
                  <SelectItem value="compound">Compound Cleaning</SelectItem>
                  <SelectItem value="construction">Construction Site Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Input id="from" required placeholder="Machakos" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="to">To</Label>
                <Input id="to" required placeholder="Karen, Nairobi" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Tell us more</Label>
              <Textarea id="notes" rows={3} placeholder="3-bedroom apartment, 2 fridges, preferred date..." className="mt-1.5" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-brand-gradient text-brand-foreground hover:opacity-90 h-12">
              Request My Free Quote <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">FAQ</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">Questions, answered</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="text-primary-foreground" style={{ background: "var(--brand-deep)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-xl">
              <span className="size-9 grid place-items-center rounded-lg bg-brand-gradient">
                <Truck className="size-5 text-primary" />
              </span>
              Falcon Movers & Cleaning Co.
            </div>
            <p className="mt-4 text-white/70 max-w-md italic">"Moving You Forward. Cleaning It Right."</p>
            <p className="mt-2 text-white/60 max-w-md text-sm">Kenya's trusted moving & cleaning company. Affordable, licensed and family-run.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-white/70 text-sm">
              <li className="flex items-center gap-2"><Phone className="size-4 text-brand" /> 0700 890347</li>
              <li className="flex items-center gap-2"><Phone className="size-4 text-brand" /> 0114 636388</li>
              <li className="flex items-center gap-2"><Mail className="size-4 text-brand" /> falconmoversandcleaning@gmail.com</li>
              <li className="flex items-start gap-2"><MapPin className="size-4 text-brand mt-0.5" /> Main office: Machakos CBD<br/>Nairobi Branch</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Hours</h4>
            <ul className="mt-4 space-y-2 text-white/70 text-sm">
              <li>Mon – Sat: 7:00am – 7:00pm</li>
              <li>Sunday: 9:00am – 4:00pm</li>
              <li>24/7 emergency moves</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between gap-2 text-sm text-white/60">
            <div>© {new Date().getFullYear()} Falcon Movers & Cleaning Co. All rights reserved.</div>
            <div>Made with care in Machakos.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
