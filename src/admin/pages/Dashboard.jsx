import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';

const Dashboard = () => {
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getAll();
        if (res.success) {
          const count = res.data.filter(b => b.status === 'pending').length;
          setPendingBookingsCount(count);
        }
      } catch (err) {
        console.error('Failed to fetch bookings for dashboard', err);
      }
    };
    fetchBookings();
  }, []);
  return (
    <>
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden lg:block">
        <section className="p-gutter lg:p-12 max-w-container-max mx-auto">
          {/* Statistics Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12">
            {/* Portfolio Images */}
            <div className="bg-white p-8 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[2px] w-[40px] bg-gradient-to-r from-secondary to-[#e9c349]"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary text-3xl">photo_library</span>
                <span className="font-label-caps text-[10px] text-green-600 bg-green-50 px-2 py-1">+4 this week</span>
              </div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">PORTFOLIO IMAGES</h3>
              <p className="font-headline-md text-headline-md text-primary">24</p>
            </div>

            {/* Blog Posts */}
            <div className="bg-white p-8 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[2px] w-[40px] bg-gradient-to-r from-secondary to-[#e9c349] opacity-40"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary text-3xl">edit_note</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container px-2 py-1">Steady</span>
              </div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">BLOG POSTS</h3>
              <p className="font-headline-md text-headline-md text-primary">12</p>
            </div>

            {/* Testimonials */}
            <div className="bg-white p-8 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-[2px] w-[40px] bg-gradient-to-r from-secondary to-[#e9c349] opacity-40"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary text-3xl">chat_bubble</span>
                <span className="font-label-caps text-[10px] text-green-600 bg-green-50 px-2 py-1">+2 new</span>
              </div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">TESTIMONIALS</h3>
              <p className="font-headline-md text-headline-md text-primary">18</p>
            </div>

            {/* Booking Requests */}
            <div className="bg-white p-8 luxury-shadow relative overflow-hidden group border-2 border-secondary/10">
              <div className="absolute top-0 left-0 h-[2px] w-[40px] bg-gradient-to-r from-secondary to-[#e9c349]"></div>
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                <span className="font-label-caps text-[10px] text-secondary bg-secondary-container/20 px-2 py-1">Action Required</span>
              </div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">BOOKING REQUESTS</h3>
              <p className="font-headline-md text-headline-md text-secondary">
                {pendingBookingsCount.toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
            {/* Recent Activities Table */}
            <div className="xl:col-span-2 bg-white luxury-shadow overflow-hidden">
              <div className="p-8 border-b border-outline-variant flex justify-between items-center">
                <h3 className="font-headline-sm text-headline-sm text-primary">Recent Activities</h3>
                <button className="text-on-surface-variant hover:text-secondary font-label-caps text-label-caps flex items-center gap-2">
                  VIEW ALL
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant">ACTIVITY</th>
                      <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant">CLIENT / PROJECT</th>
                      <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant">DATE</th>
                      <th className="px-8 py-4 font-label-caps text-[10px] text-on-surface-variant text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    <tr className="hover:bg-[#fcf9f8] transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined text-sm">event_available</span>
                          </div>
                          <span className="text-body-md font-medium">New Booking Request</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-on-surface-variant">Eleanor Rigby / Bridal Artistry</td>
                      <td className="px-8 py-5 text-on-surface-variant">Oct 24, 2:30 PM</td>
                      <td className="px-8 py-5 text-right">
                        <span className="px-3 py-1 bg-secondary-container/20 text-secondary rounded-full font-label-caps text-[9px]">PENDING</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f8] transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-sm">photo</span>
                          </div>
                          <span className="text-body-md font-medium">Portfolio Updated</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-on-surface-variant">Vogue Editorial Series</td>
                      <td className="px-8 py-5 text-on-surface-variant">Oct 23, 11:15 AM</td>
                      <td className="px-8 py-5 text-right">
                        <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full font-label-caps text-[9px]">COMPLETED</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f8] transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined text-sm">payments</span>
                          </div>
                          <span className="text-body-md font-medium">Payment Received</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-on-surface-variant">Marcus Aurelius / Grooming</td>
                      <td className="px-8 py-5 text-on-surface-variant">Oct 22, 5:45 PM</td>
                      <td className="px-8 py-5 text-right">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full font-label-caps text-[9px]">PAID</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#fcf9f8] transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-sm">star</span>
                          </div>
                          <span className="text-body-md font-medium">New Review Posted</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-on-surface-variant">Sofia Loren / Gala Prep</td>
                      <td className="px-8 py-5 text-on-surface-variant">Oct 21, 9:00 AM</td>
                      <td className="px-8 py-5 text-right">
                        <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full font-label-caps text-[9px]">REVIEWED</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions / Mini Stats */}
            <div className="space-y-gutter">
              {/* Site Preview Card */}
              <div className="bg-white luxury-shadow p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[2px] w-[40px] bg-gradient-to-r from-secondary to-[#e9c349]"></div>
                <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-4">LIVE PREVIEW</h4>
                <div className="aspect-video bg-surface-container-low rounded border border-outline-variant relative overflow-hidden group cursor-pointer">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Live Preview" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIp_CuQ13s_FKut6md5SaDekv5bW-lCW_Kc7ijvtmr2y70nAmDWBTgtD76BcK-vW9iIFsZm_ftFBKsrVf5sOtIvYzvnjb_rFkZ1sIvbt7mGivtr6aXTh5A7SnfTgJ0z7sQSry-H2nLHLPSIldsy_MShQHbWgX-WRz4icZ9-IMtCBZSu7LjPb_WS6sEL0v0bjvgUyRR2hWyYapsG__ytZaEioVWhV1-hYSISJPQQ4j3dlEyxo9ffmAQg7mmBvgwl88a1rHiOGUL2X6b"/>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-primary px-4 py-2 rounded font-label-caps text-[10px]">VISIT LIVE SITE</span>
                  </div>
                </div>
              </div>

              {/* Client Spotlight */}
              <div className="bg-[#1c1b1b] text-white luxury-shadow p-8">
                <h4 className="font-label-caps text-[10px] tracking-[0.25em] text-secondary-fixed mb-6">NEXT APPOINTMENT</h4>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    <img className="w-full h-full object-cover" alt="Client" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChJBsIsiwZ9L2ClkcXPnwsPAa4JDHj6kMRjxsNc6vANYFvMq4soNMxknJLd1FnbQqF6wCMlO8LnqgtNa3IyoRs940tdOGRonVpc5Xana1ClpECg6O59arkoKeaH9Y0AfCB1m0STlheRTK76Rl00dBN3E48vQKd7efPxAl9nLVR9lxn_WgnrzDMt7lSboS6KdSMfe5ljHZn82zYN8ndZLTOVR4g-Co2a9Tj7ElSnAb7WBpP_QafxMztDoTTtjYJBYl4Cua9uQP9Yn1m"/>
                  </div>
                  <div>
                    <p className="font-headline-sm text-lg text-secondary-fixed-dim">Sarah Jenkins</p>
                    <p className="text-[12px] opacity-60 font-body-md">Bridal Consultation</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-white/10">
                  <div>
                    <p className="text-[10px] font-label-caps opacity-60">TIME</p>
                    <p className="text-sm font-medium">Today, 4:00 PM</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-label-caps opacity-60">LOCATION</p>
                    <p className="text-sm font-medium">Main Studio</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all font-label-caps text-[10px]">
                  PREPARE NOTES
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="block lg:hidden">
        <div className="px-margin-mobile pt-6 pb-24 flex flex-col gap-8 max-w-md mx-auto">
          {/* Welcome Header */}
          <section>
            <p className="font-label-caps text-label-caps text-secondary mb-1">
              {new Date().getHours() < 12 ? 'GOOD MORNING,' : new Date().getHours() < 18 ? 'GOOD AFTERNOON,' : 'GOOD EVENING,'}
            </p>
            <h2 className="font-headline-sm text-headline-sm text-on-background">Abhilasha</h2>
          </section>

          {/* Quick Actions */}
          <section className="grid grid-cols-2 gap-4">
            <button className="bg-[#1c1b1b] text-white py-4 rounded-lg font-label-caps text-label-caps flex flex-col items-center justify-center gap-2 transition-all hover:bg-secondary active:scale-95 luxury-shadow">
              <span className="material-symbols-outlined">add_a_photo</span>
              ADD IMAGE
            </button>
            <button className="bg-surface border border-secondary text-secondary py-4 rounded-lg font-label-caps text-label-caps flex flex-col items-center justify-center gap-2 transition-all active:scale-95 luxury-shadow">
              <span className="material-symbols-outlined">pending_actions</span>
              VIEW REQUESTS
            </button>
          </section>

          {/* Summary Vertical Stack */}
          <section className="flex flex-col gap-6">
            {/* Bookings Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Bookings</h3>
                  <p className="text-on-surface-variant text-sm mt-1">{pendingBookingsCount} pending for this week</p>
                </div>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-4xl font-light text-primary">24</span>
                <button className="text-secondary font-label-caps text-[10px] tracking-widest border-b border-secondary pb-1">MANAGE</button>
              </div>
            </div>

            {/* Portfolio Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Portfolio</h3>
                  <p className="text-on-surface-variant text-sm mt-1">128 Total Artworks</p>
                </div>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Portfolio 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZntTX7tYd4JMpFEw4kCWqOrW0QUNSQwLYrT3cjADzsMMZ6i-RiIEMFjMknDpl_oX8vTK-3-CAsvr6RKy2BtgXM3c_c0SnwhcYnl3aPV_CIVQ_jFFIshhNcyUCXpfKXy-6pcaHPFhIlIbxs9SKbhai9E9iPo8VTf-8YRiQD5prtMjNBjFj0MtcCY6dFcWnxLQXoceu6_1rCl1X0KN6BEjd89rIlK58Um0l4wBM1qpTDozOSbmaaJ0aiDgLkUHrXbYsMyiUUmkbFdS"/>
                </div>
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover" alt="Portfolio 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZXG8dCPGcTVpuQpBz8sAs7U5pfP_pYB06khjfW01lwxjeLjcwrjA4jvE8_L454MqMaqDokxO0FbU1vowClczsvp9j5g4XA0AMBDoJpwW2CVJHeoskMm1lxi--kO83-3uAwxJc9ycUIjiJBKsK1rVCNiUIjBkChSo-jjrBBkR3pmOOzjU4K1g7sYN3an6jMAYpM-Woe9tpqB5WfSngYhcdsW9yI7rCcxPBN1sGhiYft87nZLK9lnuFmEfFhsfN_TEuUqCnv-fZGudF"/>
                </div>
                <div className="w-12 h-12 rounded-md bg-surface-variant flex items-center justify-center text-on-surface-variant text-xs">
                  +5
                </div>
              </div>
              <button className="w-full py-3 border border-outline-variant rounded font-label-caps text-label-caps text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors">UPDATE GALLERY</button>
            </div>

            {/* Blog Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Blog</h3>
                  <p className="text-on-surface-variant text-sm mt-1">Last post: 2 days ago</p>
                </div>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span className="text-sm text-on-surface truncate">Skincare Routine for Brides-to-be...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-outline"></div>
                  <span className="text-sm text-on-surface-variant truncate">Draft: Summer Glow Essentials</span>
                </div>
              </div>
            </div>

            {/* Testimonials Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 luxury-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Testimonials</h3>
                  <p className="text-on-surface-variant text-sm mt-1">4.9 Star Rating</p>
                </div>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>reviews</span>
              </div>
              <div className="bg-surface-variant/30 p-3 rounded italic text-on-surface-variant text-sm border-l-2 border-secondary">
                "Abhilasha made me feel like royalty on my wedding day. Her attention to detail is..."
              </div>
            </div>
          </section>

          {/* Stats Visualization */}
          <section className="mb-12">
            <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-4">WEEKLY TRAFFIC</h4>
            <div className="flex items-end justify-between h-32 gap-2">
              <div className="flex-1 bg-surface-container-high h-1/2 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high h-2/3 rounded-t-sm"></div>
              <div className="flex-1 bg-secondary h-full rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high h-3/4 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high h-1/2 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high h-2/3 rounded-t-sm"></div>
              <div className="flex-1 bg-surface-container-high h-5/6 rounded-t-sm"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-label-caps text-on-surface-variant">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
