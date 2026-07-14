import { Link } from 'react-router-dom';

export default function ServiceCard({ image, imageAlt, title, price, description, linkText, linkTo, isAddon, icon, featured }) {
  if (isAddon) {
    return (
      <article className="service-card bg-surface-container-lowest rounded-DEFAULT overflow-hidden flex flex-col group">
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>{icon}</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{title}</h3>
            <div className="font-label-caps text-label-caps text-secondary mb-4">{price}</div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              {description}
            </p>
          </div>
          {linkTo ? (
            <Link to={linkTo} className="border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-colors duration-300 w-full py-3 font-label-caps text-label-caps uppercase tracking-widest rounded-sm mt-auto text-center">
              {linkText}
            </Link>
          ) : (
            <button className="border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-colors duration-300 w-full py-3 font-label-caps text-label-caps uppercase tracking-widest rounded-sm mt-auto">
              {linkText}
            </button>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className={`service-card bg-surface-container-lowest rounded-DEFAULT overflow-hidden flex flex-col group ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      <div className={`relative w-full overflow-hidden ${featured ? 'h-64 lg:h-96' : 'h-48'}`}>
        <img 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
          alt={imageAlt} 
          src={image} 
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 font-label-caps text-label-caps rounded-sm">Featured</div>
        )}
      </div>
      <div className={`p-8 flex flex-col flex-grow justify-between`}>
        <div>
          {featured ? (
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
              <span className="font-label-caps text-label-caps text-secondary bg-secondary-container/20 px-3 py-2 rounded-sm border border-secondary/30">{price}</span>
            </div>
          ) : (
            <>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{title}</h3>
              <div className="font-label-caps text-label-caps text-secondary mb-4">{price}</div>
            </>
          )}
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            {description}
          </p>
        </div>
        
        {featured ? (
          linkTo ? (
            <Link to={linkTo} className="inline-block bg-secondary text-on-secondary hover:opacity-90 transition-opacity w-fit px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest rounded-sm mt-4 self-start">
              {linkText}
            </Link>
          ) : (
            <button className="btn-primary w-fit px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest rounded-sm mt-4 self-start">
              {linkText}
            </button>
          )
        ) : (
          linkTo ? (
            <Link to={linkTo} className="inline-block text-center border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-colors duration-300 w-full py-3 font-label-caps text-label-caps uppercase tracking-widest rounded-sm mt-auto">
              {linkText}
            </Link>
          ) : (
            <button className="border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-colors duration-300 w-full py-3 font-label-caps text-label-caps uppercase tracking-widest rounded-sm mt-auto">
              {linkText}
            </button>
          )
        )}
      </div>
    </article>
  );
}
