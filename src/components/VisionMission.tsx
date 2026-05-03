import { motion } from 'motion/react';
import { Eye, Rocket } from 'lucide-react';

const missions = [
  "Menciptakan lingkungan yang mendukung pengembangan kreativitas dan inovasi.",
  "Memfasilitasi berbagai kegiatan dan pelatihan yang bertujuan meningkatkan kompetensi dan keterampilan.",
  "Menyediakan platform komunikasi yang efektif dan transparan.",
  "Membangun nilai-nilai etika dan integritas pada setiap kader.",
  "Mendorong partisipasi aktif anggota dalam kegiatan sosial yang berdampak positif bagi masyarakat."
];

export default function VisionMission() {
  return (
    <section className="py-20 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-red/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 uppercase tracking-wider">Visi & Misi</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-neon-red to-transparent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="bg-neon-red border border-red-500 text-white rounded-[2rem] p-8 sm:p-10 h-full shadow-[0_0_40px_rgba(255,0,64,0.3)] relative overflow-hidden flex flex-col justify-center">
              {/* Halftone pattern simulation */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_black_1px,_transparent_1.5px)] bg-[size:8px_8px]"></div>
              
              <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
                <Eye className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase tracking-wider">Visi</h3>
                </div>
                <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed italic drop-shadow-md">
                  "Membangun dan mewujudkan PK IMM Ibnu An-Nafis sebagai wadah yang <span className="font-bold underline decoration-black decoration-4 underline-offset-4">inovatif, inspiratif, dan inklusif</span> dengan memiliki integritas dan intelektualitas, serta memberikan kontribusi positif kepada anggota komisariat dan masyarakat yang selaras dengan tujuan Ikatan Mahasiswa Muhammadiyah."
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#121212] border border-neon-red/30 text-neon-red rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,0,64,0.2)]">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white uppercase tracking-wider">Misi</h3>
            </div>
            
            <div className="space-y-4">
              {missions.map((mission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-stretch bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-neon-red/50 transition-colors group"
                >
                  <div className="bg-[#1a1a1a] text-neon-red font-display font-black text-2xl flex items-center justify-center min-w-[5rem] shrink-0 border-r border-white/5 group-hover:bg-neon-red group-hover:text-white transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="p-5 sm:p-6 text-gray-300 font-medium leading-relaxed flex items-center text-sm md:text-base group-hover:text-white transition-colors">
                    {mission}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
