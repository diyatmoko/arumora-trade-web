import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Panel } from '../components/ui/Panel';
import { Button } from '../components/ui/Button';

const API_KEYS = [
  { id: 'key-1', label: 'Production \u00b7 Binance', masked: 'th_live_8f3a\u2022\u2022\u2022\u2022\u2022\u2022d91c', created: 'Mar 2026' },
  { id: 'key-2', label: 'Backtesting', masked: 'th_test_2b7e\u2022\u2022\u2022\u2022\u2022\u202204af', created: 'Jan 2026' },
];

export function SettingsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyKey = (id: string) => {
    void navigator.clipboard?.writeText('simulated-api-key').catch(() => undefined);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1600);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Panel title="Profile" bodyClassName="p-4">
        <form
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs text-content-secondary">
              Full name
              <input
                type="text"
                defaultValue="Alex Turner"
                className="mt-1 w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-content focus:border-accent-line focus:outline-none"
              />
            </label>
            <label className="block text-xs text-content-secondary">
              Email
              <input
                type="email"
                defaultValue="alex@arumora.trade"
                className="mt-1 w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-content focus:border-accent-line focus:outline-none"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </Panel>

      <Panel title="Preferences" bodyClassName="p-4">
        <ul className="divide-y divide-line">
          {[
            { id: 'pref-motion', label: 'Interface animations', hint: 'Scroll reveals and micro-interactions' },
            { id: 'pref-sound', label: 'Execution alerts', hint: 'Notify when orders fill or bots act' },
            { id: 'pref-weekend', label: 'Weekend trading', hint: 'Allow bots to trade on weekends' },
          ].map((p, i) => (
            <li key={p.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-content">{p.label}</p>
                <p className="mt-0.5 text-xs text-content-muted">{p.hint}</p>
              </div>
              <button
                role="switch"
                aria-checked={i !== 1}
                aria-label={p.label}
                onClick={(e) => {
                  const el = e.currentTarget;
                  el.setAttribute('aria-checked', el.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
                  el.dataset.on = el.getAttribute('aria-checked') === 'true' ? '1' : '';
                }}
                data-on={i !== 1 ? '1' : ''}
                className={`relative h-[22px] w-10 shrink-0 cursor-pointer rounded-full border transition-colors duration-200 ${
                  i !== 1 ? 'border-accent-line bg-accent-soft' : 'border-line-strong bg-surface-overlay'
                }`}
              >
                <span
                  aria-hidden="true"
                  data-on={i !== 1 ? '1' : ''}
                  className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-200 ${
                    i !== 1 ? 'left-[calc(100%-18px)] bg-accent' : 'left-0.5 bg-content-muted'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        title="API Keys"
        actions={<Button variant="secondary" size="sm">Generate key</Button>}
        bodyClassName="p-4 space-y-2"
      >
        {API_KEYS.map((k) => (
          <div key={k.id} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-raised px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-content">{k.label}</p>
              <p className="num mt-0.5 truncate text-[11px] text-content-muted">{k.masked}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="num hidden text-[10px] text-content-faint sm:block">{k.created}</span>
              <Button variant="ghost" size="sm" onClick={() => copyKey(k.id)} aria-label={`Copy ${k.label} API key`}>
                {copiedId === k.id ? <Check size={13} className="text-profit-bright" /> : <Copy size={13} />}
              </Button>
            </div>
          </div>
        ))}
      </Panel>
    </div>
  );
}

export default SettingsPage;
