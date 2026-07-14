import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/siteConfig';

export default function SEO({ title, description, image, url }) {
  const defaultTitle = siteConfig.businessName;
  const fullTitle = title ? `${title} | ${defaultTitle}` : `${defaultTitle} - ${siteConfig.tagline}`;

  // Default description if none provided
  const metaDescription = description || `Professional luxury makeup artistry by ${siteConfig.businessName}. Specializing in bridal, editorial, and special occasion beauty.`;

  // Fallback to home hero image if no image provided
  const metaImage = image || "https://lh3.googleusercontent.com/aida-public/AB6AXuA-GVW15yat70GsjwsJFhooo2dDN8hxrrdgFQvIUunc38x9IpK18lH7AoehPkzoxu1mXzZBn7TjVyUEvQ0XR6wT14ZyRE4Aef9ICdoO0sQVW2cJSthC9AoJcY7UnY1qCcRB_ki1PMC88qIgySVrMQ4B3QlTBu0IOZxlfk98Uoqu7UcKiq6Dycl5EErCb6tyyjkpXSLoroxK3Jvv-R6978P9AZev3SMyMlb9ugRZ5DAySfwxvl1pxEx3_6aukW-UxVafzU_lD62qTDsh";

  const siteUrl = "https://example.com"; // Consider adding this to siteConfig
  const pageUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
}
