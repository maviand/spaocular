import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Image 
          src="/Logo_SpaOcular.png" 
          alt="Spa Ocular Logo" 
          width={80} 
          height={80} 
          className={styles.logoImage} 
        />
        <div className={styles.logoTitle}>Spa Ocular</div>
      </div>
      
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>Dashboard</Link>
        <Link href="/emr" className={styles.link}>Clinical EMR</Link>
        <Link href="/crm" className={styles.link}>Patient CRM</Link>
        <Link href="/retail" className={styles.link}>Retail & POS</Link>
        <Link href="/finance" className={styles.link}>Finances</Link>
        <Link href="/hr" className={styles.link}>Staff HR</Link>
      </nav>
      
      <div className={styles.footer}>
        v1.0.0 Enterprise
      </div>
    </aside>
  );
}
