import "./globals.css";

export const metadata = {
  title: "DevSecOps Portfolio",
  description: "Portfolio DevSecOps : infrastructure automatisée, API sécurisée et pipeline de contrôle continu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
