import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/navigation/Logo';
import { Button } from '../components/ui/Button';
import { formatPct } from '../lib/format';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden border-r border-line bg-bg-soft lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,black,transparent)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]"
        />

        <div className="relative p-10">
          <Logo />
        </div>

        <div className="relative px-10 pb-16">
          <h2 className="max-w-md text-balance text-3xl font-bold leading-tight tracking-tight text-white">
            The professional terminal for automated trading.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-content-secondary">
            Monitor portfolios, run bots, and execute strategies with institutional precision.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { label: 'Assets tracked', value: '120+' },
              { label: 'Avg. bot ROI', value: formatPct(21.4) },
              { label: 'Uptime', value: '99.98%' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-surface/80 p-3 backdrop-blur">
                <dt className="text-[10px] uppercase tracking-wide text-content-muted">{s.label}</dt>
                <dd className="num mt-1 text-lg font-semibold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Form panel */}
      <main className="flex flex-col items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-xs text-content-muted transition-colors hover:text-content-secondary">
            <ArrowLeft size={13} /> Back to home
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-content-muted">
            Sign in to your trading workspace.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/app');
            }}
          >
            <label className="block text-xs font-medium text-content-secondary" htmlFor="email">
              Email
              <div className="relative mt-1.5">
                <Mail size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-faint" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@fund.com"
                  className="h-11 w-full rounded-lg border border-line-strong bg-surface pl-9 pr-3 text-sm text-content placeholder:text-content-faint focus:border-accent-line focus:outline-none"
                />
              </div>
            </label>

            <label className="block text-xs font-medium text-content-secondary" htmlFor="password">
              Password
              <div className="relative mt-1.5">
                <Lock size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-faint" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-line-strong bg-surface pl-9 pr-10 text-sm text-content placeholder:text-content-faint focus:border-accent-line focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-content-muted transition-colors hover:text-content"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-content-muted">
                <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-[#22D3EE]" />
                Remember me
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-accent transition-colors hover:text-accent-strong">
                Forgot password?
              </a>
            </div>

            <Button variant="primary" size="lg" type="submit" className="w-full">
              Sign in to TradeHub
            </Button>
          </form>

          <p className="mt-6 flex items-start gap-2 rounded-lg border border-line bg-surface p-3 text-[11px] leading-relaxed text-content-muted">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-profit" aria-hidden="true" />
            Demo environment &mdash; any credentials will open the simulated workspace.
          </p>

          <p className="mt-8 text-center text-xs text-content-muted">
            No account yet?{' '}
            <Link to="/login" className="font-medium text-accent transition-colors hover:text-accent-strong">
              Get started free
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
