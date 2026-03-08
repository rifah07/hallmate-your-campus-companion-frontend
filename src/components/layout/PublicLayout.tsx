import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavChild { label: string; path: string; }
interface NavItem { label: string; path: string; children?: NavChild[]; }

const NAV_LINKS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about', children: [
    { label: 'About the Hall', path: '/about' },
    { label: 'Achievements', path: '/achievements' },
  ]},
  { label: 'People', path: '', children: [
    { label: 'Provost', path: '/provost' },
    { label: 'All Provosts', path: '/all-provosts' },
    { label: 'House Tutors', path: '/house-tutors' },
    { label: 'Staff', path: '/staff' },
  ]},
  { label: 'Campus', path: '', children: [
    { label: 'Facilities', path: '/facilities' },
    { label: 'Dining', path: '/dining' },
    { label: 'Gallery', path: '/gallery' },
  ]},
  { label: 'Admission', path: '/admission' },
  { label: 'Info', path: '', children: [
    { label: 'Events', path: '/events-public' },
    { label: 'Notices', path: '/public-notices' },
    { label: 'FAQ', path: '/faq' },
  ]},
  { label: 'Contact', path: '/contact' },
];

function NavDropdown({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const isChildActive = item.children?.some(c => currentPath === c.path);
  return (
    <div className="relative group">
      <button className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
        isChildActive ? 'text-primary bg-primary/8' : 'text-foreground/70 hover:text-foreground hover:bg-accent/60'
      }`}>
        {item.label} <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="glass-strong rounded-xl shadow-elegant py-2 min-w-[200px] overflow-hidden">
          {item.children!.map(c => (
            <Link key={c.path} to={c.path}
              className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                currentPath === c.path
                  ? 'text-primary bg-primary/8 font-medium'
                  : 'text-foreground/70 hover:text-foreground hover:bg-accent/50 hover:pl-5'
              }`}>
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-card/85 backdrop-blur-xl border-b border-border/50 shadow-soft'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl gradient-teal flex items-center justify-center shadow-teal group-hover:shadow-glow transition-shadow duration-300">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold text-foreground tracking-tight">HallMate</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(l =>
            l.children ? (
              <NavDropdown key={l.label} item={l} currentPath={pathname} />
            ) : (
              <Link key={l.path} to={l.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === l.path ? 'text-primary bg-primary/8' : 'text-foreground/70 hover:text-foreground hover:bg-accent/60'
                }`}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <Link to="/track-application">
            <Button variant="outline" size="sm" className="rounded-lg font-medium border-border/60 hover:border-primary/30 transition-colors">Track Application</Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="rounded-lg font-semibold shadow-teal hover:shadow-glow transition-shadow">Sign In</Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-border/50 bg-card/95 backdrop-blur-xl"
          >
            <nav className="p-4 space-y-1">
              {NAV_LINKS.map(l =>
                l.children ? (
                  <div key={l.label}>
                    <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{l.label}</p>
                    {l.children.map(c => (
                      <Link key={c.path} to={c.path} onClick={() => setMobileOpen(false)}
                        className={`block px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          pathname === c.path ? 'text-primary bg-primary/8' : 'text-foreground/70 hover:text-foreground hover:bg-accent/60'
                        }`}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === l.path ? 'text-primary bg-primary/8' : 'text-foreground/70 hover:text-foreground hover:bg-accent/60'
                    }`}>
                    {l.label}
                  </Link>
                )
              )}
              <div className="pt-4 flex flex-col gap-2.5">
                <Link to="/track-application" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-lg">Track Application</Button>
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-lg font-semibold">Sign In</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function PublicFooter() {
  const footerLinks = [
    { heading: 'About Hall', links: [
      { label: 'About Us', path: '/about' },
      { label: 'Facilities', path: '/facilities' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Achievements', path: '/achievements' },
    ]},
    { heading: 'Quick Links', links: [
      { label: 'Admission', path: '/admission' },
      { label: 'Apply Online', path: '/apply' },
      { label: 'Track Application', path: '/track-application' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Notice Board', path: '/public-notices' },
    ]},
  ];

  return (
    <footer className="relative bg-foreground text-background/80 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-14 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl gradient-teal flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-extrabold text-background">HallMate</span>
            </div>
            <p className="text-sm text-background/50 mb-6 leading-relaxed">
              University Women's Hall — A Home Away From Home. Providing safe, comfortable, and enriching residential life for over 1000 students.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-background/8 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-background/5">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map(section => (
            <div key={section.heading}>
              <h4 className="font-bold text-background mb-5 text-sm uppercase tracking-wider">{section.heading}</h4>
              <ul className="space-y-2.5 text-sm">
                {section.links.map(l => (
                  <li key={l.path}>
                    <Link to={l.path} className="text-background/50 hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 group">
                      <span>{l.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-bold text-background mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-background/8 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-background/50">University Women's Hall, University Road, Dhaka-1000</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background/8 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-background/50">+880 2 9661920</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-background/8 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-background/50">hallmate@university.edu.bd</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/8 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/40">
          <span>© {new Date().getFullYear()} HallMate — University Women's Hall. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
