import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE LOST FILE | Black Box Association",
  description:
    "A digital mystery has unfolded. Something was hidden. Can you find it? No cybersecurity experience required.",
  openGraph: {
    title: "THE LOST FILE",
    description: "Something disappeared. Something was left behind. Can you find it?",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("%c👁️ Curious, aren't you?", "color: #00d4ff; font-size: 16px; font-weight: bold; font-family: monospace;"); console.log("%cThis is just the beginning.", "color: #8b949e; font-family: monospace;");`,
          }}
        />
      </body>
    </html>
  );
}
