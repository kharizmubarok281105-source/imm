import { useState } from 'react';
import { Menu, X, Search, Settings2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/tentang' },
  { title: 'Struktur', href: '/struktur' },
  { title: 'Berita', href: '/berita' },
  { title: 'Dokumen', href: '/dokumen' },
  {
    title: 'Fitur',
    href: '#',
    children: [
      { title: 'Presensi QR', href: '/presensi-qr' },
      { title: 'Kotak Aspirasi', href: '/kotak-aspirasi' },
      { title: 'E-Voting', href: '/e-voting' },
      { title: 'Galeri', href: '/galeri' },
      { title: 'Kalender', href: '/kalender' },
      { title: 'Pendaftaran', href: '/pendaftaran' },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-[#1a0f12]/80 to-[#1a0f12]/0 pt-4 top-0 left-0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center pr-10">
            <Link to="/" className="text-[20px] lg:text-[24px] font-black italic text-[#ff0040] drop-shadow-[0_0_15px_rgba(255,0,64,0.6)] font-sans tracking-tight">
              PK IMM IBNU AN-NAFIS
            </Link>
          </div>

          {/* Center/Left Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 flex-1">
            {navLinks.map((link) => {
               const isActive = location.pathname === link.href;
               
               if (link.children) {
                 return (
                   <div key={link.title} className="relative group">
                     <button className="flex items-center gap-1 text-[15px] font-medium text-white/60 hover:text-white transition-colors">
                       {link.title}
                       <ChevronDown className="w-4 h-4 ml-0.5 opacity-70 group-hover:opacity-100" />
                     </button>
                     <div className="absolute left-0 mt-2 w-48 rounded-2xl shadow-2xl bg-[#141414] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0 overflow-hidden">
                       <div className="py-2">
                         {link.children.map((child) => (
                           <Link
                             key={child.title}
                             to={child.href}
                             className="block px-4 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                           >
                             {child.title}
                           </Link>
                         ))}
                       </div>
                     </div>
                   </div>
                 );
               }

               return (
                <Link
                  key={link.title}
                  to={link.href}
                  className={`text-[15px] font-medium transition-colors relative ${isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'}`}
                >
                  {link.title}
                  {isActive && (
                     <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#ff0040] rounded-full shadow-[0_0_8px_rgba(255,0,64,0.8)]"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section (Search & Settings) */}
          <div className="hidden lg:flex items-center space-x-4">
             <div className="relative group flex items-center">
                <div className="flex items-center bg-white/5 border border-white/20 rounded-full px-5 py-2 relative z-10 w-64 backdrop-blur-sm group-hover:border-white/40 transition-colors">
                   <input type="text" placeholder="Tugas ujian aad" className="bg-transparent text-[15px] text-white/90 placeholder-white/50 w-full focus:outline-none" />
                   <Search className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" strokeWidth={2.5} />
                </div>
             </div>
             
             <div className="ml-2 w-10 h-10 rounded-full flex items-center justify-center text-white/80 cursor-pointer hover:bg-white/10 hover:text-white transition-colors">
                <Settings2 className="w-6 h-6" strokeWidth={2} />
             </div>
             
             {/* Admin Login Placeholder/Profile */}
             <div className="ml-2 w-10 h-10 rounded-full border border-white/20 bg-black/40 overflow-hidden ml-2 flex items-center justify-center cursor-pointer hover:border-white/50 transition-colors">
                <Link to="/login">
                  <div className="w-6 h-6 bg-white/40 rounded-full blur-[2px]"></div>
                </Link>
             </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#1a0f12] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.title}>
                  {link.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.title ? null : link.title)
                        }
                        className="flex items-center justify-between w-full text-left px-3 py-3 text-base font-medium text-white/80 border-b border-white/5 focus:outline-none hover:text-white"
                      >
                        {link.title}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.title ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/30 overflow-hidden rounded-b-lg"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.title}
                                to={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block pl-8 pr-3 py-3 text-sm font-medium text-white/60 hover:text-white border-b border-white/5"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-3 text-base font-medium text-white/80 border-b border-white/5 hover:text-white hover:bg-white/5"
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
               <div className="px-3 py-4">
                  <div className="flex items-center bg-white/5 border border-white/20 rounded-full px-5 py-2 w-full">
                     <input type="text" placeholder="Tugas ujian aad" className="bg-transparent text-sm text-white focus:outline-none w-full" />
                     <Search className="w-5 h-5 text-white/70" />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
