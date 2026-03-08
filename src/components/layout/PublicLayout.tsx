import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Provost', path: '/provost' },
  { label: 'People', path: '', children: [
    { label: 'All Provosts', path: '/all-provosts' },
    { label: 'House Tutors', path: '/house-tutors' },
    { label: 'Staff', path: '/staff' },
  ]},
  { label: 'Facilities', path: '/facilities' },
  { label: 'Dining', path: '/dining' },
  { label: 'Admission', path: '/admission' },
  { label: 'Achievements', path: '/achievements' },
  { label: 'Events', path: '/events-public' },
  { label: 'Notices', path: '/public-notices' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-teal flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">HallMate</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-0.5">
          {NAV_LINKS.map(l =>
            l.children ? (
              <div key={l.label} className="relative group">
                <button className="px-2.5 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-accent/60 flex items-center gap-1">
                  {l.label} <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="bg-card border border-border rounded-lg shadow-lg py-1 min-w-[160px]">
                    {l.children.map(c => (
                      <Link key={c.path} to={c.path} className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.path}
                to={l.path}
                className={`px-2.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === l.path
                    ? 'text-primary bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <Link to="/track-application">
            <Button variant="outline" size="sm">Track Application</Button>
          </Link>
          <Link to="/login">
            <Button size="sm">Student Login</Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border bg-card"
          >
            <nav className="p-4 space-y-1">
              {NAV_LINKS.map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === l.path
                      ? 'text-primary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link to="/track-application" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">Track Application</Button>
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Student Login</Button>
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
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-background">HallMate</span>
            </div>
            <p className="text-sm text-background/60 mb-4">
              University Women's Hall — A Home Away From Home. Providing safe, comfortable, and enriching residential life for over 500 students.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">About Hall</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Our Mission', 'Facilities', 'Gallery'].map(t => (
                <li key={t}><Link to={`/${t.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-primary transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Admission', path: '/admission' },
                { label: 'Apply Online', path: '/apply' },
                { label: 'Track Application', path: '/track-application' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Notice Board', path: '/public-notices' },
              ].map(l => (
                <li key={l.path}><Link to={l.path} className="hover:text-primary transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span>University Women's Hall, University Road, Dhaka-1000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <span>+880 2 9661920</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <span>hallmate@university.edu.bd</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center text-sm text-background/50">
          © {new Date().getFullYear()} HallMate — University Women's Hall. All rights reserved.
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
