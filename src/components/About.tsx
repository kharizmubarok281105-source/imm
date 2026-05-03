import { motion } from 'motion/react';
import { Target, History, ChevronRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-red/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section matching 'Selected Films' style */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="px-8 py-2 bg-neon-red rounded-full text-white font-display font-bold uppercase tracking-wider text-sm mb-6 inline-flex shadow-[0_0_20px_rgba(255,0,64,0.4)]">
            TENTANG KAMI
          </div>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-red/30 to-transparent -z-10"></div>
          <ChevronRight className="w-5 h-5 text-neon-red rotate-90" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-10">
          
          {/* Sejarah */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-8 lg:p-10 bg-[#121212] rounded-[2rem] border border-white/5 hover:border-neon-red/30 transition-colors"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-neon-red/10 border border-neon-red/30 text-neon-red rounded-xl flex items-center justify-center shrink-0 glow-red">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Sejarah Singkat</h2>
            </div>
            <div className="text-gray-400 leading-relaxed text-base space-y-6">
              <p>
                PK IMM Ibnu An-Nafis merupakan organisasi kemahasiswaan Muhammadiyah yang berada di Fakultas Ilmu Kesehatan Universitas Muhammadiyah Lamongan.
              </p>
              <p>
                Pada awal berdiri PK IMM Ibnu An-Nafis bernama PK IMM STIKES Muhammadiyah Lamongan lalu berubah nama menjadi PK IMM Ibnu An-Nafis Universitas Muhammadiyah Lamongan ketika STIKES Muhammadiyah Lamongan berubah status menjadi Universitas Muhammadiyah Lamongan pada tahun 2018.
              </p>
              <p>
                Tak lama kemudian pada tahun 2020, PK IMM Ibnu An-Nafis Universitas Muhammadiyah Lamongan memekarkan diri menjadi PK IMM Ibnu An-Nafis Fakultas Ilmu Kesehatan, PK IMM AL-Iskandariyah yang menaungi FSTP, PK IMM Ibnu Taimiyah yang menaungi FEB, dan PK IMM Abu Hanifah Kampus 2.
              </p>
            </div>
          </motion.div>

          {/* Tujuan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 lg:p-10 rounded-[2rem] shadow-2xl border border-neon-red/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-red/5 rounded-bl-[100px] -z-10"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-neon-red text-white rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,0,64,0.4)] relative z-10">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider relative z-10">Tujuan</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg relative z-10 font-medium">
              Pimpinan Komisariat IMM Ibnu An-Nafis menjadi wadah yang <strong className="text-neon-red">inovatif, inspiratif, dan inklusif</strong> dengan menguatkan integritas dan intelektualitas sehingga dapat memberikan kontribusi positif bagi anggota dan masyarakat serta selaras dengan tujuan Ikatan Mahasiswa Muhammadiyah.
            </p>
            
            <div className="mt-10 pt-8 border-t border-white/5">
               <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-white/5 text-gray-300 font-medium rounded-full text-xs font-display tracking-wider border border-white/10 uppercase">Inovatif</span>
                  <span className="px-4 py-2 bg-white/5 text-gray-300 font-medium rounded-full text-xs font-display tracking-wider border border-white/10 uppercase">Inspiratif</span>
                  <span className="px-4 py-2 bg-white/5 text-gray-300 font-medium rounded-full text-xs font-display tracking-wider border border-white/10 uppercase">Inklusif</span>
                  <span className="px-4 py-2 bg-neon-red/10 text-neon-red font-bold rounded-full text-xs font-display tracking-wider border border-neon-red/30 uppercase">Integritas</span>
                  <span className="px-4 py-2 bg-neon-red/10 text-neon-red font-bold rounded-full text-xs font-display tracking-wider border border-neon-red/30 uppercase">Intelektualitas</span>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
