import { Link } from 'react-router-dom';
import ServiceCard from '../components/ui/ServiceCard';
import { servicesImages } from '../data/images';
import { servicesData } from '../data/services';
import SEO from '../components/SEO';

export default function Services() {
  return (
    <main className="pt-20">
      <SEO title="Services & Pricing" url="/services" />
      <section className="py-section-gap px-margin-mobile md:px-gutter text-center max-w-container-max mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">Our Services</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Bespoke artistry tailored for your most significant moments. Experience the epitome of luxury beauty with our curated selection of professional services.
        </p>
      </section>

      <section className="px-margin-mobile md:px-gutter max-w-container-max mx-auto pb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {servicesData.map(service => (
            <ServiceCard 
              key={service.id}
              featured={service.featured}
              isAddon={service.isAddon}
              icon={service.icon}
              image={service.image}
              imageAlt={service.imageAlt}
              title={service.title}
              price={service.price}
              description={service.description}
              linkText={service.linkText}
            />
          ))}
        </div>
      </section>

      <section className="bg-surface-container-high dark:bg-inverse-surface py-section-gap mt-12">
        <div className="px-margin-mobile md:px-gutter max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Bespoke Packages</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Every client's needs are unique. Whether you require a full-day bridal entourage service or destination wedding coverage, we curate personalized packages to deliver an uncompromising luxury experience.
            </p>
            <Link to="/booking" className="inline-block bg-secondary text-on-secondary px-8 py-4 font-label-caps text-label-caps uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity">
              Request a Consultation
            </Link>
          </div>
          <div className="md:w-1/2 relative h-[400px] w-full border border-secondary/20 p-2">
            <img 
              className="object-cover w-full h-full" 
              alt="Bespoke Packages" 
              src={servicesImages.bespokePackages}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
