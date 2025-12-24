import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title,
  description,
  image = "https://vyaktifymedia.com/og_logo.jpg",
  url = "https://vyaktifymedia.com/",
  type = "website",
}: SEOProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / WhatsApp / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@VyaktifyMedia" />

      {/* Structured Data (JSON-LD) for Google Search */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Vyaktify Media",
          "url": "https://vyaktifymedia.com",
          "logo": "https://vyaktifymedia.com/og_logo.jpg",
          "sameAs": [
            "https://twitter.com/VyaktifyMedia"
          ]
        })}
      </script>
    </Helmet>
  );
}
