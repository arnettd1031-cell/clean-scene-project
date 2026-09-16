import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/clean-scene-logo.jpeg.asset.json";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"], ["Services", "/services"], ["About", "/about"],
  ["Service Area", "/service-area"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
    <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 lg:px-8">
      <Link to="/" className="min-w-0" aria-label="Clean Scene home">
        <img src={logoAsset.url} alt="Clean Scene Cleaning Services LLC" className="h-14 w-auto max-w-[190px] object-contain object-left" />
      </Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
        {links.map(([label, to]) => <Link key={to} to={to} className="text-sm font-semibold text-foreground/75 transition-colors hover:text-primary" activeProps={{className:"text-primary"}}>{label}</Link>)}
      </nav>
      <Button asChild size="lg" className="hidden lg:inline-flex"><Link to="/quote">Request a Quote</Link></Button>
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X/> : <Menu/>}</Button>
    </div>
    {open && <nav className="border-t border-border bg-background px-4 py-5 lg:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-7xl gap-1">{links.map(([label,to]) => <Link key={to} to={to} onClick={()=>setOpen(false)} className="rounded-md px-3 py-3 font-semibold hover:bg-secondary">{label}</Link>)}<Button asChild className="mt-3 h-12"><Link to="/quote" onClick={()=>setOpen(false)}>Request a Quote</Link></Button></div>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="bg-primary text-primary-foreground">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div><img src={logoAsset.url} alt="Clean Scene Cleaning Services LLC" className="h-28 w-auto max-w-full rounded-sm bg-background object-contain"/><p className="mt-5 font-serif text-xl">Cleaner Spaces. Brighter Business.</p><p className="mt-3 text-sm text-primary-foreground/75">Commercial Cleaning | Offices | Lobbies & Common Areas<br/>North Central Indiana</p></div>
      <div><h2 className="text-sm font-bold uppercase tracking-widest">Quick Links</h2><div className="mt-4 grid gap-2 text-sm text-primary-foreground/75">{links.map(([label,to])=><Link key={to} to={to} className="hover:text-primary-foreground">{label}</Link>)}<Link to="/quote">Request a Quote</Link><Link to="/privacy">Privacy Policy</Link></div></div>
      <div><h2 className="text-sm font-bold uppercase tracking-widest">Contact</h2><p className="mt-4 text-sm text-primary-foreground/75">Phone: [Business phone number]</p><p className="mt-2 text-sm text-primary-foreground/75">Email: [Business email address]</p></div>
    </div>
    <div className="border-t border-primary-foreground/15 px-5 py-5 text-center text-xs text-primary-foreground/60">© {new Date().getFullYear()} Clean Scene Cleaning Services LLC</div>
  </footer>;
}

export function PageHero({eyebrow,title,children}:{eyebrow:string;title:string;children:React.ReactNode}) { return <section className="bg-secondary"><div className="mx-auto max-w-5xl px-5 py-20 text-center lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground">{eyebrow}</p><h1 className="mt-4 font-serif text-4xl leading-tight text-primary sm:text-6xl">{title}</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</p></div></section> }

export function FinalCta() { return <section className="bg-accent px-5 py-16 text-center"><h2 className="font-serif text-3xl text-primary sm:text-4xl">Ready for a Cleaner Business?</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tell us about your space and get started with a customized commercial cleaning quote.</p><Button asChild size="lg" className="mt-7 h-12"><Link to="/quote">Request a Free Quote</Link></Button></section> }