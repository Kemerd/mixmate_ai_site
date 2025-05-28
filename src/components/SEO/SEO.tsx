import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "MixMate AI - The World's First Intelligent DAW Production Assistant | $9.99/month",
  description = "MixMate AI creates a direct neural bridge between your DAW and advanced AI. Real-time mixing suggestions, plugin intelligence, and context-aware production advice. The AI producer you've always wanted for just $9.99/month.",
  keywords = "AI mixing, DAW AI, music production AI, Ableton AI, mixing assistant, AI producer, automated mixing, music production software, AI audio tools, MixMate AI",
  image = "https://mixmate.ai/og-image.png",
  url = "https://mixmate.ai"
}) => {
  // Construct the full title with branding
  const fullTitle = title.includes('MixMate AI') ? title : `${title} | MixMate AI`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 