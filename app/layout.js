import { Geist, Geist_Mono } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// ─── Site constants ──────────────────────────────────────────────────────────
const SITE_URL  = 'https://gaprio.in';
const SITE_NAME = 'Gaprio';
const OG_IMAGE  = '/og-image.png'; 
const TWITTER   = '@gaprio_hq';    

// ─── Viewport ────────────────────────────────────────────────────────────────
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#0a0a0a' },
  ],
};

// ─── Root Metadata ────────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hello Gaprio | The AI Brain for Your Enterprise',
    template: '%s | Gaprio',
  },
  description:
    'Gaprio is the AI-powered workspace that connects Slack, Asana, Gmail, Calendar & GitHub. Automate workflows, monitor channels, and boost team productivity.',
  keywords: [
    'AI workspace',
    'AI productivity tool',
    'workflow automation software',
    'team collaboration platform',
    'Slack automation',
    'Asana integration',
    'Gmail automation',
    'AI task management',
    'Gaprio',
  ],
  authors: [{ name: 'Gaprio Team', url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  category: 'technology',
  classification: 'Business Software / Productivity',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Hello Gaprio — AI Workspace for Seamless Team Automation',
    description: 'Connect Slack, Gmail, Asana & more. Let Gaprio\'s neural AI automate your team workflows and supercharge productivity.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Gaprio AI Workspace Dashboard',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER,
    creator: TWITTER,
    title: 'Hello Gaprio — AI Workspace for Seamless Team Automation',
    description: 'Connect everything. Automate anything. Gaprio\'s AI monitors your channels and suggests actions in real-time.',
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'HCBYtisuaUipscQ0C8tj6mgJQGlIfeQA42xdcUlIeBU',
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'AI-powered workspace connecting Slack, Gmail, Asana, Calendar, and GitHub for seamless team automation.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi'],
      url: `${SITE_URL}/support`,
    },
    sameAs: [
      `https://twitter.com/gaprio_hq`,
      `https://www.linkedin.com/company/gaprio`,
      `https://github.com/gaprio`,
    ],
    foundingDate: '2024',
    areaServed: 'Worldwide',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software`,
    name: 'Gaprio Workspace',
    url: SITE_URL,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'ProjectManagementApplication',
    operatingSystem: 'Web, iOS, Android',
    description: 'AI-powered workspace that monitors Slack channels, suggests automated actions, and integrates with Gmail, Asana, Calendar, and GitHub.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '124',
      bestRating: '5',
      worstRating: '1',
    },
  }
];

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`} 
      suppressHydrationWarning
    >
      <body className={`${geistSans.className} antialiased font-sans`}>
        
        {/* Inject JSON-LD Schema */}
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}