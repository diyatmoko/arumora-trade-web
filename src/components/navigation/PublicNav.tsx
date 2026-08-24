import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { ScrollTrigger } from '../../lib/gsap';
import { useIsomorphicLayoutEffect } from '../../hooks/useGsap';

const NAV_LINKS = [
  { label: 'Markets', href: '#markets' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Strategies', href: '#strategies' },
  { label: 'Features', href: '#features' },
];

export function PublicNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sentinelRef.current,
      start: 'top -40',
      end: 'max',
      onToggle: (self) => setSolid(self.isActive),
    });
    return () => st.kill();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm text-content-secondary transition-colors duration-200 hover:bg-surface-overlay hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/app">
            <Button variant="primary" size="sm">
              Launch App <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <button
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-content-secondary transition-colors hover:bg-surface-overlay hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg/95 backdrop-blur-md md:hidden th-modal-panel">
          <ul className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-content-secondary transition-colors hover:bg-surface-overlay hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex gap-2 pt-3">
              <Link to="/login" className="flex-1">
                <Button variant="secondary" size="md" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link to="/app" className="flex-1">
                <Button variant="primary" size="md" className="w-full">
                  Launch App
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default PublicNav;
