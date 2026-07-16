import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const AdminLogin = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const res = await login(email, password);
    if (!res.success) {
      setError(res.error || 'Invalid credentials.');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="font-headline-md text-headline-md text-primary mb-2 tracking-tight">
          Artistry By Abhilasha
        </h1>
        <p className="font-label-caps text-label-caps text-on-surface-variant">
          ADMINISTRATION PORTAL
        </p>
      </div>

      <div 
        className="bg-surface-container-lowest p-8 md:p-12 rounded-lg flex flex-col gap-8 shadow-[0px_20px_40px_rgba(0,0,0,0.04)] border-t-2 border-t-secondary transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        <header>
          <h2 className="font-headline-sm text-headline-sm text-on-surface text-center">
            Welcome Back
          </h2>
        </header>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {error && <p className="text-error text-sm text-center">{error}</p>}
          
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface uppercase tracking-[0.2em]" htmlFor="email">
              Email Address
            </label>
            <div className="relative flex items-center">
              <input 
                className="border-0 border-b border-b-outline bg-transparent transition-colors duration-300 focus:outline-none focus:border-b-secondary focus:ring-0 w-full py-2 font-body-md text-body-md text-on-surface placeholder:text-outline-variant" 
                id="email" 
                name="email" 
                placeholder="abhilasha@artistry.com" 
                required 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-0 text-outline" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>mail</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <label className="font-label-caps text-label-caps text-on-surface uppercase tracking-[0.2em]" htmlFor="password">
                Password
              </label>
              <a className="font-label-caps text-[10px] text-secondary hover:text-on-secondary-container transition-colors" href="#">
                FORGOT?
              </a>
            </div>
            <div className="relative flex items-center">
              <input 
                className="border-0 border-b border-b-outline bg-transparent transition-colors duration-300 focus:outline-none focus:border-b-secondary focus:ring-0 w-full py-2 font-body-md text-body-md text-on-surface placeholder:text-outline-variant" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span 
                className="material-symbols-outlined absolute right-0 text-outline cursor-pointer" 
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          <button 
            className="bg-on-background text-white transition-all duration-300 hover:bg-secondary hover:shadow-[inset_0_0_0_2px_#735c00] w-full py-4 font-label-caps text-label-caps uppercase tracking-[0.3em] mt-4 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Login'}
            {!isSubmitting && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>arrow_forward</span>}
          </button>
        </form>

        <footer className="text-center pt-4">
          <p className="font-body-md text-sm text-on-surface-variant">
            Internal Access Only. 
            <a className="text-secondary font-medium hover:underline underline-offset-4 ml-1" href="/">Return to Atelier</a>
          </p>
        </footer>
      </div>

      {/* Decorative Elements */}
      <div className="mt-12 flex justify-center items-center gap-6 opacity-40">
        <div className="h-[1px] w-12 bg-outline-variant"></div>
        <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant p-1">
          <img 
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" 
            alt="Decorative macro photograph" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCumCe4xNFDyl0Ov5mCprhBAMkg2rwsEk_jn0YaqJ3pzJNC90-nCTs43ffL2WXvW7-BucrerHt7ifjxxyBWW7ma_rcthoUrh-jMR015vlZysmSoIqt9BEYkOazWQDW-YpjPkerLjGGzPW1kzwz8kHUc4ydTUMYTdZMhDK4Rr6RZR1FHtHgPrnH9NggUSWeHmZWZtE6S2_1uDYeuiqSd54Bx6V0vVX3hHDVMU7rA9cEXi1IsXJ-eDix9b8fWk-f41uCFUllFFDOERYtN"
          />
        </div>
        <div className="h-[1px] w-12 bg-outline-variant"></div>
      </div>
    </>
  );
};

export default AdminLogin;
