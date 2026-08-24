import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { IconButton } from './Button';

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const first = ref.current?.querySelector<HTMLElement>(
      'input, select, textarea, button:not([data-close])',
    );
    first?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={id}
    >
      <button
        data-close
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm th-modal-backdrop"
      />
      <div
        ref={ref}
        className="relative w-full max-w-md rounded-2xl border border-line-strong bg-surface-raised shadow-card th-modal-panel"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id={id} className="text-sm font-semibold text-content">
            {title}
          </h2>
          <IconButton label="Close" data-close onClick={onClose}>
            <X size={15} />
          </IconButton>
        </header>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
