import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spa Ocular | Sistema de Gestión",
  description: "Sistema de Gestión Clínica — Spa Ocular",
};

// Runs before paint to apply the saved theme and avoid a flash of the wrong theme.
const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="" />
        <link href="https://fonts.cdnfonts.com/css/google-sans" rel="stylesheet" />
      </head>
      <body>
        <ToastProvider>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', minWidth: 0 }}>
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
