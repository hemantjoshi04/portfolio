import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { useSettings } from '../hooks/useSettings';

export default function Footer() {
  const settings = useSettings();
  return (
    <footer className="bg-surface-container-high dark:bg-inverse-surface border-t-0 mt-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter py-section-gap px-margin-mobile max-w-container-max mx-auto flat no shadows">
        <div className="col-span-1 flex flex-col justify-center">
          <span className="font-headline-sm text-headline-sm text-secondary mb-4 uppercase">{settings.brandName || siteConfig.businessName}</span>
          <p className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface opacity-80">
            © {new Date().getFullYear()} {settings.brandName || siteConfig.businessName}. {settings.professionalTitle || siteConfig.tagline}.
          </p>
        </div>
        <div className="col-span-1 md:col-span-2 flex flex-wrap gap-8 justify-start md:justify-end items-center">
          <Link to="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all opacity-80 hover:opacity-100 uppercase tracking-widest">Privacy Policy</Link>
          <Link to="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all opacity-80 hover:opacity-100 uppercase tracking-widest">Terms of Service</Link>
          <Link to="#" className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all opacity-80 hover:opacity-100 uppercase tracking-widest">FAQ</Link>
          {(settings.socialInstagram || siteConfig.social.instagram) && (
            <a href={settings.socialInstagram || siteConfig.social.instagram} className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all opacity-80 hover:opacity-100 uppercase tracking-widest">Instagram</a>
          )}
          {(settings.socialPinterest || siteConfig.social.pinterest) && (
            <a href={settings.socialPinterest || siteConfig.social.pinterest} className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all opacity-80 hover:opacity-100 uppercase tracking-widest">Pinterest</a>
          )}
          {siteConfig.social.facebook && (
            <a href={siteConfig.social.facebook} className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all opacity-80 hover:opacity-100 uppercase tracking-widest">Facebook</a>
          )}
          {(settings.socialYoutube || siteConfig.social.youtube) && (
            <a href={settings.socialYoutube || siteConfig.social.youtube} className="font-label-caps text-label-caps text-on-surface-variant hover:text-secondary underline transition-all opacity-80 hover:opacity-100 uppercase tracking-widest">YouTube</a>
          )}
        </div>
      </div>
    </footer>
  );
}
