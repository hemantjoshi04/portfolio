import React, { useState, useEffect } from 'react';
import { settingsService } from '../../services/settingsService';

const SiteSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | success

  // Mobile Accordion state
  const [activeAccordion, setActiveAccordion] = useState('brand');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await settingsService.getSettings();
    if (res.success) {
      setSettings(res.data);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (name) => {
    setSettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    await settingsService.updateSettings(settings);
    setSaveStatus('success');
    setTimeout(() => {
      setSaveStatus('idle');
    }, 2000);
  };

  const handleDiscard = async () => {
    setLoading(true);
    await fetchSettings();
  };

  if (loading || !settings) {
    return <div className="p-12 text-center text-on-surface-variant">Loading settings...</div>;
  }

  // Calculate "time ago" for last updated
  const getTimeAgo = (dateStr) => {
    if (!dateStr) return 'Unknown';
    const diff = Math.floor((new Date() - new Date(dateStr)) / 60000); // minutes
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minutes ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hours ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  const lastSavedText = `Last saved: ${getTimeAgo(settings.lastUpdated)} by Admin`;

  return (
    <>
      {/* Shared Styles */}
      <style>{`
        .luxury-input {
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: 1px solid #787770;
            background: transparent;
            padding: 12px 0;
            width: 100%;
            transition: border-color 0.3s ease;
        }
        .luxury-input:focus {
            outline: none;
            border-bottom: 1px solid #735c00;
            box-shadow: none;
        }
        .luxury-label {
            font-family: 'Montserrat';
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #5f5e5b;
            display: block;
            margin-bottom: 4px;
        }
        .bento-card {
            background: #ffffff;
            box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.04);
            border-top: 2px solid #735c00;
            padding: 40px;
        }
        .btn-primary {
            background-color: #1c1b1b;
            color: #ffffff;
            font-family: 'Montserrat';
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-size: 12px;
            padding: 16px 32px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .btn-primary:hover:not(:disabled) {
            background-color: #735c00;
        }
        .btn-primary:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        .btn-ghost {
            background-color: transparent;
            color: #735c00;
            border: 1px solid #735c00;
            font-family: 'Montserrat';
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-size: 12px;
            padding: 16px 32px;
            transition: all 0.3s ease;
        }
        .btn-ghost:hover {
            background-color: #735c00;
            color: white;
        }
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .accordion-item.active .accordion-content {
            max-height: 1000px;
        }
        .accordion-item.active .arrow-icon {
            transform: rotate(180deg);
        }
        .custom-shadow {
            box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden lg:block p-gutter lg:p-16 max-w-7xl mx-auto">
        <header className="mb-12">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Site Settings</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Refine your digital presence. Manage brand identity, visual aesthetics, and communication channels from a single luxury atelier interface.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Brand Identity Section */}
          <section className="col-span-12 lg:col-span-8 bento-card mb-8">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-1">Brand Identity</h3>
                <p className="text-on-surface-variant text-body-md opacity-70">Define how your brand appears across the platform.</p>
              </div>
              <span className="material-symbols-outlined text-secondary opacity-50">verified_user</span>
            </div>
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <label className="luxury-label">Brand Name</label>
                  <input className="luxury-input" type="text" name="brandName" value={settings.brandName} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <label className="luxury-label">Professional Title</label>
                  <input className="luxury-input" type="text" name="professionalTitle" value={settings.professionalTitle} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="luxury-label">Brand Bio</label>
                <textarea className="luxury-input resize-none" rows="3" name="brandBio" value={settings.brandBio} onChange={handleInputChange}></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <label className="luxury-label">Official Email</label>
                  <input className="luxury-input" type="email" name="contactEmail" value={settings.contactEmail} onChange={handleInputChange} />
                </div>
                <div className="space-y-1">
                  <label className="luxury-label">Contact Number</label>
                  <input className="luxury-input" type="tel" name="contactPhone" value={settings.contactPhone} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </section>

          {/* Logo Upload Section (Mock Only) */}
          <section className="col-span-12 lg:col-span-4 bento-card flex flex-col items-center justify-center text-center mb-8">
            <h3 className="luxury-label mb-8">Official Logo</h3>
            <div className="relative group cursor-pointer w-full max-w-[200px] aspect-square rounded-full border-2 border-dashed border-outline-variant flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-all">
              <div className="w-full h-full rounded-full overflow-hidden mb-4 p-4">
                <div className="w-full h-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_upload</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-label-caps text-on-surface shadow-sm">Replace Logo</button>
              </div>
            </div>
            <p className="mt-6 text-[11px] font-label-caps text-on-surface-variant tracking-wider leading-relaxed">Recommended size: 512x512px<br />PNG or SVG (Transparent background)</p>
          </section>

          {/* Social Media Links Section */}
          <section className="col-span-12 lg:col-span-5 bento-card mb-8">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-8">Social Ecosystem</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-primary-fixed-dim bg-on-primary-fixed-variant rounded-full">
                  <span className="material-symbols-outlined text-[20px]">link</span>
                </div>
                <div className="flex-1">
                  <label className="luxury-label">Instagram</label>
                  <input className="luxury-input !py-1" type="text" name="socialInstagram" value={settings.socialInstagram} onChange={handleInputChange} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-primary-fixed-dim bg-on-primary-fixed-variant rounded-full">
                  <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                </div>
                <div className="flex-1">
                  <label className="luxury-label">Behance Portfolio</label>
                  <input className="luxury-input !py-1" type="text" name="socialBehance" value={settings.socialBehance} onChange={handleInputChange} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center text-primary-fixed-dim bg-on-primary-fixed-variant rounded-full">
                  <span className="material-symbols-outlined text-[20px]">videocam</span>
                </div>
                <div className="flex-1">
                  <label className="luxury-label">YouTube / Reels</label>
                  <input className="luxury-input !py-1" type="text" name="socialYoutube" value={settings.socialYoutube} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </section>

          {/* Theme Customization Section */}
          <section className="col-span-12 lg:col-span-7 bento-card mb-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-sm text-headline-sm text-primary">Theme Customization</h3>
              <div className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-label-caps">Elite Plan</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="luxury-label mb-4">Color Palette</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="group relative" onClick={() => setSettings(s => ({ ...s, themeColor: 'Gold' }))}>
                      <div className={`w-10 h-10 rounded-full bg-secondary shadow-inner border border-outline cursor-pointer ${settings.themeColor === 'Gold' ? 'ring-2 ring-offset-2 ring-secondary' : ''}`}></div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label-caps opacity-0 group-hover:opacity-100 transition-opacity">Gold</span>
                    </div>
                    <div className="group relative" onClick={() => setSettings(s => ({ ...s, themeColor: 'Onyx' }))}>
                      <div className={`w-10 h-10 rounded-full bg-primary shadow-inner border border-outline-variant cursor-pointer ${settings.themeColor === 'Onyx' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}></div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label-caps opacity-0 group-hover:opacity-100 transition-opacity">Onyx</span>
                    </div>
                    <div className="group relative" onClick={() => setSettings(s => ({ ...s, themeColor: 'Blush' }))}>
                      <div className={`w-10 h-10 rounded-full bg-tertiary-fixed-dim shadow-inner border border-outline-variant cursor-pointer ${settings.themeColor === 'Blush' ? 'ring-2 ring-offset-2 ring-tertiary-fixed-dim' : ''}`}></div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-label-caps opacity-0 group-hover:opacity-100 transition-opacity">Blush</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="luxury-label mb-4">Typography Pair</h4>
                  <div className="space-y-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${settings.themeTypography === 'Playfair Display' ? 'border-secondary bg-primary-container' : 'border-outline-variant hover:border-primary'}`}
                      onClick={() => setSettings(s => ({ ...s, themeTypography: 'Playfair Display' }))}
                    >
                      <p className="font-headline-sm text-[18px] text-primary">Playfair Display</p>
                      <p className="font-body-md text-[12px] text-on-surface-variant">Editorial & Sophisticated</p>
                    </div>
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${settings.themeTypography === 'Montserrat' ? 'border-secondary bg-primary-container' : 'border-outline-variant hover:border-primary'}`}
                      onClick={() => setSettings(s => ({ ...s, themeTypography: 'Montserrat' }))}
                    >
                      <p className="font-sans font-bold text-[18px] text-primary">Montserrat</p>
                      <p className="font-body-md text-[12px] text-on-surface-variant">Modern & Minimalist</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                  <span className="material-symbols-outlined text-secondary opacity-30 text-[48px]">visibility</span>
                </div>
                <h4 className="luxury-label mb-6">Live Preview</h4>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-primary/20 rounded"></div>
                  <div className={`h-10 w-full bg-surface-container-highest rounded border-t-2 ${settings.themeColor === 'Gold' ? 'border-secondary' : settings.themeColor === 'Onyx' ? 'border-primary' : 'border-tertiary-fixed-dim'}`}></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-20 bg-white rounded shadow-sm"></div>
                    <div className="h-20 bg-white rounded shadow-sm"></div>
                  </div>
                  <div className={`h-8 w-full rounded ${settings.themeColor === 'Gold' ? 'bg-secondary' : settings.themeColor === 'Onyx' ? 'bg-primary' : 'bg-tertiary-fixed-dim'}`}></div>
                </div>
                <p className="mt-6 text-[10px] text-center font-label-caps text-on-surface-variant uppercase tracking-widest">Minimalist-Luxury Preset</p>
              </div>
            </div>
          </section>

          {/* Action Footer Section */}
          <div className="col-span-12 flex flex-col md:flex-row items-center justify-between gap-6 py-12 border-t border-outline-variant mt-8">
            <div className="text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">info</span>
              <p className="text-body-md text-[14px]">{lastSavedText}</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="btn-ghost flex-1 md:flex-none" onClick={handleDiscard} disabled={saveStatus === 'saving'}>Discard Changes</button>
              <button 
                className={`btn-primary flex-1 md:flex-none flex items-center justify-center gap-3 ${saveStatus === 'success' ? '!bg-secondary' : ''}`}
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : saveStatus === 'success' ? (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Changes Applied
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Save Configuration
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="block lg:hidden px-margin-mobile py-8 space-y-6 max-w-lg mx-auto pb-32">
        {/* Header / Artist Identity */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary-container border border-outline-variant overflow-hidden">
            <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMXi3OQp1fOm_IzpTd5V6XgkuIOGjqWguG2do8lAryU_X2onx0obyzAK2JS7dgAQUM9QhGI49a17j8QvqkWGWistzFVwNBVt7jXHi92Ye73_9LR0jPdyW1MmmY5HACEpWGL_e4ie36eSHn-6hrCZkREn5P2DNd_5UIZAw1jYSXFsSqXHNFVtXr5qUkbmCBMYwMAd0EH_c_8ZUOtN6X2UNm5KgPfi4hM61f0vLHljkdR6d-g4lQeAdRtY7Bfh_YdwF05_Hc_ESbnJe-" />
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{settings.brandName.split(' ')[0] || 'Abhilasha'}</h2>
            <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] mt-1 line-clamp-1">{settings.professionalTitle}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Brand Settings Accordion */}
          <div className={`accordion-item border border-outline-variant bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow transition-all duration-300 ${activeAccordion === 'brand' ? 'active' : ''}`}>
            <button className="w-full flex justify-between items-center px-6 py-5 text-left active:bg-surface-container-low transition-colors" onClick={() => setActiveAccordion(activeAccordion === 'brand' ? '' : 'brand')}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">auto_awesome</span>
                <span className="font-label-caps text-label-caps text-on-surface">Brand Identity</span>
              </div>
              <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
            </button>
            <div className="accordion-content border-t border-outline-variant/30">
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Brand Name</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline py-2 font-body-md text-body-md focus:ring-0 transition-all" type="text" name="brandName" value={settings.brandName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Primary Service</label>
                  <select className="w-full bg-transparent border-0 border-b border-outline py-2 font-body-md text-body-md focus:ring-0 appearance-none" name="primaryService" value={settings.primaryService} onChange={handleInputChange}>
                    <option value="Bridal Artistry">Bridal Artistry</option>
                    <option value="Editorial Fashion">Editorial Fashion</option>
                    <option value="Masterclass Training">Masterclass Training</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Studio Logo</label>
                  <div className="flex items-center gap-4 py-2">
                    <div className="px-4 py-2 border border-outline-variant rounded bg-surface text-on-surface-variant text-xs">logo_v2_dark.png</div>
                    <button className="font-label-caps text-[10px] text-secondary">CHANGE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Settings Accordion */}
          <div className={`accordion-item border border-outline-variant bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow transition-all duration-300 ${activeAccordion === 'contact' ? 'active' : ''}`}>
            <button className="w-full flex justify-between items-center px-6 py-5 text-left active:bg-surface-container-low transition-colors" onClick={() => setActiveAccordion(activeAccordion === 'contact' ? '' : 'contact')}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">mail</span>
                <span className="font-label-caps text-label-caps text-on-surface">Contact Channels</span>
              </div>
              <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
            </button>
            <div className="accordion-content border-t border-outline-variant/30">
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Professional Email</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline py-2 font-body-md text-body-md focus:ring-0 transition-all" type="email" name="contactEmail" value={settings.contactEmail} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">Studio Phone</label>
                  <input className="w-full bg-transparent border-0 border-b border-outline py-2 font-body-md text-body-md focus:ring-0 transition-all" type="tel" name="contactPhone" value={settings.contactPhone} onChange={handleInputChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Accordion */}
          <div className={`accordion-item border border-outline-variant bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow transition-all duration-300 ${activeAccordion === 'social' ? 'active' : ''}`}>
            <button className="w-full flex justify-between items-center px-6 py-5 text-left active:bg-surface-container-low transition-colors" onClick={() => setActiveAccordion(activeAccordion === 'social' ? '' : 'social')}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">group</span>
                <span className="font-label-caps text-label-caps text-on-surface">Social Connections</span>
              </div>
              <span className="material-symbols-outlined arrow-icon transition-transform duration-300">expand_more</span>
            </button>
            <div className="accordion-content border-t border-outline-variant/30">
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-outline-variant py-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">camera_alt</span>
                    <span className="font-body-md text-body-md">Instagram</span>
                  </div>
                  <input className="bg-transparent text-right font-label-caps text-[10px] text-secondary border-0 p-0 focus:ring-0 w-32" type="text" name="socialInstagram" value={settings.socialInstagram} onChange={handleInputChange} />
                </div>
                <div className="flex items-center justify-between border-b border-outline-variant py-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant">movie</span>
                    <span className="font-body-md text-body-md">Pinterest</span>
                  </div>
                  <input className="bg-transparent text-right font-label-caps text-[10px] text-secondary border-0 p-0 focus:ring-0 w-32" type="text" name="socialPinterest" value={settings.socialPinterest} onChange={handleInputChange} placeholder="username" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Toggles */}
        <div className="pt-8 space-y-6">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant opacity-60">System Preferences</h3>
          
          <div className="flex items-center justify-between p-4 bg-surface-container rounded-lg">
            <div className="flex flex-col">
              <span className="font-body-md text-body-md text-on-surface font-medium">Push Notifications</span>
              <span className="text-xs text-on-surface-variant">Alerts for new bookings</span>
            </div>
            <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleToggle('pushNotifications')}>
              <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${settings.pushNotifications ? 'bg-secondary-container' : 'bg-outline-variant'}`}></div>
              <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${settings.pushNotifications ? 'transform translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container rounded-lg">
            <div className="flex flex-col">
              <span className="font-body-md text-body-md text-on-surface font-medium">Dark Mode Portfolio</span>
              <span className="text-xs text-on-surface-variant">Optimize for OLED displays</span>
            </div>
            <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleToggle('darkMode')}>
              <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${settings.darkMode ? 'bg-secondary-container' : 'bg-outline-variant'}`}></div>
              <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${settings.darkMode ? 'transform translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Save Button */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-surface/80 backdrop-blur-md border-t border-outline-variant z-50">
          <div className="max-w-lg mx-auto flex gap-4">
            <button 
              className="flex-1 py-4 px-6 border border-secondary text-secondary font-label-caps text-label-caps hover:bg-secondary/5 active:scale-95 transition-all"
              onClick={handleDiscard}
              disabled={saveStatus === 'saving'}
            >
              CANCEL
            </button>
            <button 
              className={`flex-[2] py-4 px-6 text-surface font-label-caps text-label-caps hover:opacity-90 active:scale-95 transition-all custom-shadow flex items-center justify-center gap-2 ${saveStatus === 'success' ? 'bg-secondary' : 'bg-on-background'}`}
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SAVING...
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  APPLIED
                </>
              ) : (
                'SAVE CHANGES'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteSettings;
