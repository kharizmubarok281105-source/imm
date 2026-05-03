import { MapPin, Mail, Instagram, Youtube, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-16 pb-8 border-t border-neon-red/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-neon-red to-transparent shadow-[0_0_20px_rgba(255,0,64,0.5)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-neon-red text-white flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(255,0,64,0.5)] transform -skew-x-12">
                <span className="skew-x-12">IMM</span>
              </div>
              <div>
                <h2 className="font-display font-bold uppercase text-lg leading-tight tracking-wider">PK IMM IBNU AN-NAFIS</h2>
                <p className="text-[10px] tracking-widest uppercase text-neon-red font-bold text-opacity-90">UNIVERSITAS MUHAMMADIYAH LAMONGAN</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed tracking-wide">
              Fakultas Ilmu Kesehatan<br/>
              Universitas Muhammadiyah Lamongan.<br/>
              <span className="text-neon-red italic font-display font-medium mt-2 block">Berdaya, Berkarya, Berjaya.</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block uppercase tracking-wider">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tentang" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-red group-hover:glow-red transition-all"></span>
                  Tentang
                </Link>
              </li>
              <li>
                <Link to="/#struktur" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-red group-hover:glow-red transition-all"></span>
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link to="/berita" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-red group-hover:glow-red transition-all"></span>
                  Berita & Blog
                </Link>
              </li>
              <li>
                <Link to="/dokumen" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-red group-hover:glow-red transition-all"></span>
                  Dokumen
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block uppercase tracking-wider">Fitur</h3>
            <ul className="space-y-3">
              {[
                { title: 'Presensi QR', href: '/presensi-qr' },
                { title: 'Kotak Aspirasi', href: '/kotak-aspirasi' },
                { title: 'E-Voting', href: '/e-voting' },
                { title: 'Galeri', href: '/galeri' },
                { title: 'Kalender', href: '/kalender' },
                { title: 'Pendaftaran', href: '/pendaftaran' }
              ].map((item) => (
                <li key={item.title}>
                  <Link to={item.href} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-neon-red group-hover:glow-red transition-all"></span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-neon-red shrink-0 mt-0.5" />
                <span>Jl. Raya Plalangan Plosowahyu Km 2, Lamongan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-neon-red shrink-0" />
                <span>imm@umla.ac.id</span>
              </li>
            </ul>
            
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center hover:bg-neon-red hover:border-neon-red hover:glow-red text-white transition-all">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">@imm_umla</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center hover:bg-[#ff0000] hover:border-[#ff0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] text-white transition-all">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">PK IMM Ibnu An-Nafis Official YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm tracking-wide">
            &copy; {new Date().getFullYear()} PK IMM Ibnu An-Nafis. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm tracking-wide">
            <a href="#" className="text-gray-500 hover:text-white hover:text-shadow transition-all">Kebijakan Privasi</a>
            <a href="#" className="text-gray-500 hover:text-white hover:text-shadow transition-all">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
