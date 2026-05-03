import { motion } from 'motion/react';
import { BookOpen, Droplets, Sun, Circle, Activity } from 'lucide-react';

const logoMeanings = [
  {
    icon: <Activity className="w-5 h-5 text-neon-red" />,
    title: "Lambang Paru-Paru",
    desc: "Sebagai suplai darah yang berarti organisasi sebagai pembawa manfaat bagi seluruh umat, sebagai tonggak kehidupan dan selalu produktif dalam berfastabiqul khairat demi kemaslahatan umat."
  },
  {
    icon: <Circle className="w-5 h-5 text-white" />,
    title: "Berdasar Putih",
    desc: "Bermakna kesucian hati dan keikhlasan dan berjuang di Ikatan Mahasiswa Muhammadiyah."
  },
  {
    icon: <span className="font-display font-black text-neon-red text-xs tracking-wider">PK IMM</span>,
    title: "Tulisan PK. IMM IBNU AN-NAFIS",
    desc: "Universitas Muhammadiyah Lamongan bermakna Identitas Organisasi."
  },
  {
    icon: <Sun className="w-5 h-5 text-neon-red" />,
    title: "Lambang Matahari",
    desc: "Bermakna semangat seperti perjuangan Muhammadiyah menjadi wadah yang mencerahkan ummat. Menyinari dengan ajaran Islam yang berlandaskan Al-Quran dan Sunnah."
  },
  {
    icon: <Sun className="w-5 h-5 text-[#ffaa00]" />,
    title: "Sinar Matahari Berwarna Kuning",
    desc: "Memiliki Sinar Utama Dua Belas dan Setiap Sinarnya Memiliki Lima Pancaran bermakna daya vitalitas dan dinamika yang memancar dari dalam diri setiap kader IMM untuk memberikan kehidupan kepada kader lainnya."
  },
  {
    icon: <Droplets className="w-5 h-5 text-neon-red" />,
    title: "Logo IMM",
    desc: "Bermakna semangat perjuangan seperti makna yang terkandung dalam Ikatan Mahasiswa Muhammadiyah."
  },
  {
    icon: <Circle className="w-5 h-5 text-gray-500" />,
    title: "Lingkaran Bertepi Hitam",
    desc: "Bermakna bertekad bulat yang bersifat kekal dan abadi."
  },
  {
    icon: <BookOpen className="w-5 h-5 text-neon-red" />,
    title: "Lambang Buku/Kitab",
    desc: "Bermakna sumber dari segala Ilmu Pengetahuan."
  },
  {
    icon: <Activity className="w-5 h-5 text-neon-red" />,
    title: "Lambang Detak Jantung",
    desc: "Bermakna senantiasa berjuang dan beribadah seumur hidup karena Allah Subhanahu Wata'ala."
  }
];

export default function Philosophy() {
  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-white/5 text-gray-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Filosofi Nama */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="mb-24 text-center max-w-4xl mx-auto relative cursor-default"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-neon-red/5 blur-[80px] -z-10 rounded-full"></div>
          <span className="text-neon-red font-display font-bold tracking-[0.2em] text-sm uppercase mb-4 block glow-text-red">Identitas & Makna</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-10 uppercase italic">Filosofi Nama <br/><span className="text-neon-red">Ibnu An-Nafis</span></h2>
          <div className="bg-[#121212] p-8 sm:p-12 rounded-[2rem] border border-white/5 shadow-2xl text-left text-gray-300 leading-relaxed text-lg space-y-6 relative group hover:border-neon-red/30 transition-colors">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <p>
                <strong className="text-white font-display font-bold uppercase tracking-wider">Ibnu An-Nafis</strong> adalah ilmuwan Muslim di bidang Fisiologis dan Sosiologi yang pertama kali mendefinisikan bahwasannya peredaran darah dalam tubuh manusia dan mengemukakan pembuluh darah kapiler, jantung sebagai pemompa darah yang dialirkan ke seluruh tubuh dan paru-paru sebagai penyuplai oksigen.
             </p>
             <p>
                Dalam Ikatan Mahasiswa Muhammadiyah didefinisikan layaknya perkaderan yang selalu berproses untuk bermanfaat bagi seluruh umat baik dalam internal maupun dalam eksternal, kemudian paru-paru diibaratkan sebagai tonggak kehidupan, selalu produktif dalam berfastabiqul khoirot demi kemaslahatan umat.
             </p>
          </div>
        </motion.div>

        {/* Filosofi Logo */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-6 uppercase tracking-wider italic">Filosofi Logo</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-neon-red to-transparent mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-400 font-medium tracking-wide">
               Setiap elemen memiliki makna mendalam sebagai pedoman langkah organisasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logoMeanings.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#141414] rounded-2xl p-6 border border-white/5 hover:border-neon-red/50 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(255,0,64,0.1)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl flex items-center justify-center mb-6 group-hover:bg-neon-red/10 transition-colors border border-white/10 group-hover:border-neon-red/30 group-hover:glow-red relative z-10">
                  {item.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-3 uppercase tracking-wider relative z-10">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
