import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { useSettings } from '../hooks/useSettings';
import SEO from '../components/SEO';

export default function Booking() {
  const settings = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState({ success: false, message: '' });

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult({ success: false, message: '' });
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      setResult({ success: false, message: 'Form submission is disabled. Please configure your Web3Forms access key in your .env file.' });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(event.target);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const data = await res.json();

      if (res.status === 200) {
        setResult({ success: true, message: "Thank you! Your inquiry has been sent successfully. We will be in touch soon." });
        event.target.reset();
      } else {
        setResult({ success: false, message: data.message || "Something went wrong. Please try again later." });
      }
    } catch (error) {
      setResult({ success: false, message: "Network error. Please try again later." });
    }
    
    setIsSubmitting(false);
  };
  return (
    <main className="flex-grow pt-20">
      <SEO title="Book a Consultation" url="/booking" />
      <section className="py-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-6">Inquire &amp; Book</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 max-w-lg">
            We are honored you are considering {settings.brandName || siteConfig.businessName} for your special event. Please provide details regarding your inquiry, and we will respond within 48 hours to schedule a consultation.
          </p>
          
          <div className="mb-10">
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 italic">Need a faster response?</p>
            <a 
              href="https://wa.me/918360244030?text=Hi%20Abhilasha%2C%20I%20would%20like%20to%20enquire%20about%20makeup%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center bg-transparent text-onyx font-label-caps text-label-caps px-8 min-h-[44px] py-4 rounded gold-border-1px hover:bg-surface-variant transition-all duration-300 uppercase tracking-widest"
            >
              <span className="material-symbols-outlined mr-2" style={{ fontSize: '20px' }}>forum</span>
              Chat on WhatsApp
            </a>
          </div>
          
          <div className="space-y-8 flex flex-col">
            <div className="flex items-start order-1">
              <span className="material-symbols-outlined text-secondary mr-4 mt-1 md:mt-0" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
              <div>
                <h3 className="font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-1">WhatsApp</h3>
                <a href="https://wa.me/918360244030" target="_blank" rel="noopener noreferrer" className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors flex items-center min-h-[44px] md:min-h-0 md:inline-block mb-1">
                  +91 83602 44030
                </a>
                <p className="font-body-sm text-body-sm text-on-surface-variant/70">Usually responds within a few hours.</p>
              </div>
            </div>

            <div className="flex items-start order-2">
              <span className="material-symbols-outlined text-secondary mr-4 mt-1 md:mt-0" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
              <div>
                <h3 className="font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-1">Email</h3>
                <a href={`mailto:${settings.contactEmail || siteConfig.booking.bookingEmail}`} className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors flex items-center min-h-[44px] md:min-h-0 md:inline-block">
                  {settings.contactEmail || siteConfig.booking.bookingEmail}
                </a>
              </div>
            </div>
            
            <div className="flex items-start order-3">
              <span className="material-symbols-outlined text-secondary mr-4 mt-1 md:mt-0" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <div>
                <h3 className="font-label-caps text-label-caps text-on-background uppercase tracking-widest mb-1">Service Area</h3>
                <p className="font-body-md text-body-md text-on-surface-variant py-2 md:py-0 min-h-[44px] md:min-h-0">
                  Available for on-site bridal, editorial, and special occasion makeup services.<br/>
                  Serving Chandigarh, Mohali, Panchkula, Patiala, Rajpura and surrounding areas.<br/>
                  <br/>
                  Travel available for destination weddings and special events.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border-t-2 border-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-10"></div>
          
          <form className="space-y-6" onSubmit={onSubmit}>
            <h2 className="font-headline-sm text-headline-sm text-on-background mb-6 border-b border-outline-variant/30 pb-4">Consultation Request</h2>
            
            {result.message && (
              <div className={`p-4 mb-6 rounded ${result.success ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'} font-body-md`}>
                {result.message}
              </div>
            )}
            
            <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY || ''} />
            <input type="hidden" name="subject" value={`New Inquiry from ${settings.brandName || siteConfig.businessName}`} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <input type="text" name="First Name" id="first-name" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-background placeholder-on-surface-variant/50 focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none" placeholder="First Name *" required />
              </div>
              <div className="relative">
                <input type="text" name="Last Name" id="last-name" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-background placeholder-on-surface-variant/50 focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none" placeholder="Last Name *" required />
              </div>
            </div>
            
            <div className="relative">
              <input type="email" name="Email" id="email" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-background placeholder-on-surface-variant/50 focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none" placeholder="Email Address *" required />
            </div>
            
            <div className="relative">
              <input type="tel" name="Phone" id="phone" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-background placeholder-on-surface-variant/50 focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none" placeholder="Phone Number" />
            </div>
            
            <div className="relative">
              <select name="Service Type" id="service-type" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-surface-variant focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none appearance-none" defaultValue="" required>
                <option value="" disabled>Select Service Type *</option>
                <option value="Bridal Artistry">Bridal Artistry</option>
                <option value="Editorial & Fashion">Editorial &amp; Fashion</option>
                <option value="Special Event / Gala">Special Event / Gala</option>
                <option value="Private Makeup Lesson">Private Makeup Lesson</option>
                <option value="Other Inquiry">Other Inquiry</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 top-3 text-outline pointer-events-none">expand_more</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <input type="date" name="Event Date" id="event-date" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-surface-variant focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none" placeholder="Event Date (Optional)" />
              </div>
              <div className="relative">
                <input type="text" name="Event Location" id="event-location" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-background placeholder-on-surface-variant/50 focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none" placeholder="Event Location (Optional)" />
              </div>
            </div>
            
            <div className="relative">
              <textarea name="Message" id="message" rows="4" className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-3 font-body-md text-on-background placeholder-on-surface-variant/50 focus:ring-0 focus:border-secondary transition-colors duration-300 outline-none resize-none" placeholder="Please share details about your vision, party size, or specific requirements..." required></textarea>
            </div>
            
            <button type="submit" disabled={isSubmitting} className="w-full bg-on-background text-on-primary font-label-caps text-label-caps px-8 py-4 mt-4 uppercase tracking-widest hover:bg-secondary transition-all duration-300 disabled:opacity-50 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                  Sending...
                </>
              ) : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </section>

      {/* Calendly Integration Placeholder */}
      <section className="pb-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="bg-surface-container-low p-8 md:p-12 text-center rounded-sm">
          <h2 className="font-headline-md text-headline-md text-on-background mb-4">Schedule a Consultation</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Prefer to speak directly? Select a time that works for you from the calendar below to schedule a brief discovery call.
          </p>
          
          <div className="w-full max-w-4xl mx-auto h-[600px] border border-outline-variant/30 flex flex-col items-center justify-center bg-surface relative overflow-hidden group">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4 opacity-50">calendar_month</span>
            <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-center px-4">
              Calendly Embed Placeholder<br/><br/>
              <span className="text-xs normal-case opacity-70">
                (Replace this div with the actual Calendly iframe or react-calendly component)
              </span>
            </p>
            
            {/* Fake calendar visual for placeholder aesthetics */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-surface-variant/30 to-transparent pointer-events-none grid grid-cols-7 gap-1 px-8 pb-8 opacity-30">
              {[...Array(28)].map((_, i) => (
                <div key={i} className="bg-outline-variant/20 rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
