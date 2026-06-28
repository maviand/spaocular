'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import styles from './Sidebar.module.css';
import ThemeToggle from './ThemeToggle';

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const icon = (paths: ReactNode) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Panel de Control', icon: icon(<><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>) },
  { href: '/emr', label: 'Historia Clínica', icon: icon(<><path d="M9 2h6a1 1 0 0 1 1 1v1h1a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1z" /><path d="M12 10v4M10 12h4" /></>) },
  { href: '/crm', label: 'Pacientes (CRM)', icon: icon(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>) },
  { href: '/retail', label: 'Ventas (Retail)', icon: icon(<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></>) },
  { href: '/inventory', label: 'Inventario', icon: icon(<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.27 6.96 8.73 5.04 8.73-5.04M12 22.08V12" /></>) },
  { href: '/billing', label: 'Facturación', icon: icon(<><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1L4 2z" /><path d="M8 8h8M8 12h8M8 16h5" /></>) },
  { href: '/finance', label: 'Finanzas', icon: icon(<><path d="M3 3v18h18" /><path d="m7 15 3-4 3 2 4-6" /></>) },
  { href: '/hr', label: 'Recursos Humanos', icon: icon(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M5 18a4 4 0 0 1 8 0M15 9h4M15 13h4" /></>) },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Image
          src="/Logo_SpaOcular.png"
          alt="Spa Ocular"
          width={180}
          height={135}
          priority
          className={styles.logoImage}
        />
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${isActive(item.href) ? styles.linkActive : ''}`}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            <span className={styles.linkIcon}>{item.icon}</span>
            <span className={styles.linkLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <ThemeToggle />
        <div className={styles.version}>v1.0.0 Enterprise</div>
      </div>
    </aside>
  );
}
