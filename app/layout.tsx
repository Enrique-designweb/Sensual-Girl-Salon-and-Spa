import type { Metadata, Viewport } from "next";
import "./globals.css";
import IntroLoader from "@/components/IntroLoader";

export const metadata: Metadata = {
  title: "Sensual Girl | Salón de Masajes y Spa",
  description: "Tu bienestar, mi prioridad. Descubre nuestros tratamientos exclusivos.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sensual Girl",
  },
};

export const viewport: Viewport = {
  themeColor: "#3D0810",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-spa-burgundy text-spa-marble">
        <IntroLoader>
          {children}
        </IntroLoader>

        {/* Script de registro del Service Worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registrado:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('Error al registrar SW:', error);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
