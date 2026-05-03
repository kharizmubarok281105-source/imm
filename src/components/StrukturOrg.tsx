import { motion } from 'motion/react';

const pimpinanHarian = [
  { 
    id: 1, 
    name: "MART DWIYANTO", 
    role: "KETUA UMUM", 
  },
  { 
    id: 2, 
    name: "NADYA ATS-TSAQIFAH", 
    role: "SEKRETARIS UMUM", 
  },
  { 
    id: 3, 
    name: "LUTFIYA JANAH", 
    role: "BENDAHARA UMUM", 
  }
];

const bidangData = [
  {
    id: 1,
    name: "Bidang Organisasi",
    ketua: "FATTIYAH AULIA",
    sekretaris: "CHANDRA NISSA'UL",
    anggota: ["EHLA AULIA", "ALMAR'ATUL L"]
  },
  {
    id: 2,
    name: "Bidang Kader",
    ketua: "RAFILA AZKYA",
    sekretaris: "LAILYA PUTRI",
    anggota: ["FELLYSIA ARYANITA", "LINTANG PROBO"]
  },
  {
    id: 3,
    name: "Bidang Hikmah dan Kebijakan Publik",
    ketua: "AHMAD ZAINUDDIN",
    sekretaris: "HAFID NURDIN",
    anggota: ["IKA MAULIDA"]
  },
  {
    id: 4,
    name: "Bidang Riset Pengembangan Keilmuan",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  },
  {
    id: 5,
    name: "Bidang Sosial Pemberdayaan Masyarakat",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  },
  {
    id: 6,
    name: "Bidang Ekonomi dan Kewirausahaan",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  },
  {
    id: 7,
    name: "Bidang Tabligh dan Kajian Keislaman",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  },
  {
    id: 8,
    name: "Bidang IMMawati",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  },
  {
    id: 9,
    name: "Bidang Seni, Budaya, dan Olahraga",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  },
  {
    id: 10,
    name: "Bidang Media dan Komunikasi",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  },
  {
    id: 11,
    name: "Bidang Kesehatan",
    ketua: "Belum diisi",
    sekretaris: "Belum diisi",
    anggota: []
  }
];

export default function StrukturOrg() {
  return (
    <section id="struktur" className="py-16 bg-transparent relative overflow-hidden">
      {/* Top glowing red line */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-center z-20">
        <div className="w-full h-[2px] bg-[#ff0040] shadow-[0_0_20px_5px_rgba(255,0,64,0.8)]"></div>
        <div className="absolute w-[20%] h-[4px] bg-white rounded-full opacity-60 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        
        {/* Header List */}
        <div className="flex items-center w-full mb-8">
          <div className="bg-[#ff0040] text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-[15px] shadow-[0_0_15px_rgba(255,0,64,0.5)] whitespace-nowrap z-10">
            Struktur Organisasi :
          </div>
          <div className="ml-5 w-8 h-8 rounded flex items-center justify-center text-white cursor-pointer shrink-0 z-10 relative">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transform scale-y-[-1] scale-x-[-1]">
               <path d="M21 3L10 14M21 3v6M21 3h-6M3 21l11-11M3 21v-6M3 21h6" />
             </svg>
          </div>
          <div className="flex-1 ml-5 border-b-[2px] border-white/20 z-10 relative"></div>
          <div className="flex gap-2.5 ml-5 shrink-0 z-10 mr-2">
            <div className="w-3 h-3 rounded-full bg-[#ff0040] shadow-[0_0_10px_rgba(255,0,64,0.9)]"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </div>

        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">PK IMM Ibnu An-Nafis</h2>
           <p className="text-[#ff0040] font-bold tracking-widest uppercase text-sm mb-6">Periode 2023/2024</p>
           <p className="text-white/60 max-w-2xl mx-auto text-sm">
             Halaman ini menampilkan susunan pengurus PK IMM Ibnu An-Nafis dari pimpinan hingga anggota bidang.
           </p>
        </div>

        {/* Pimpinan Harian Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-16">
          {pimpinanHarian.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-1 sm:p-[6px] rounded-[36px] border-[3px] border-[#ff0040]/30 bg-transparent relative overflow-hidden group cursor-pointer"
            >
              {/* Inner overlay */}
              <div className="absolute inset-0 bg-[#121212]/80 pointer-events-none rounded-[32px] -z-10"></div>

              <div className="w-full aspect-square md:aspect-[4/5] rounded-[30px] overflow-hidden bg-gradient-to-br from-[#1e1e1e] to-[#0a0a0a] relative mt-1 mx-auto max-w-[98%] flex items-center justify-center border border-white/5">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,64,0.1),transparent_50%)]"></div>
                 <div className="text-7xl font-bold text-white/5 uppercase select-none">
                    {person.name.substring(0, 2)}
                 </div>
              </div>
              <div className="px-5 pb-5 pt-6 relative z-20 text-center">
                <h3 className="text-xl font-bold font-sans text-white leading-tight mb-2 truncate uppercase">{person.name}</h3>
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#ff0040]/10 border border-[#ff0040]/30">
                  <p className="text-xs font-sans font-bold text-[#ff0040] uppercase tracking-wider">{person.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bidang Section Header */}
        <div className="text-center mb-12">
           <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Bidang & Departemen</h2>
           <p className="text-white/60 max-w-2xl mx-auto text-sm">
             Setiap bidang dipimpin oleh kepala bidang, didampingi sekretaris bidang, dan didukung anggota aktif.
           </p>
        </div>

        {/* Bidang Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {bidangData.map((bidang, index) => (
              <motion.div
                 key={bidang.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                 className="bg-[#121212] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-[#ff0040]/50 transition-colors group relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff0040]/5 rounded-full blur-[40px] group-hover:bg-[#ff0040]/10 transition-colors pointer-events-none"></div>
                 
                 <h3 className="text-xl font-bold text-white mb-6 pr-8">{bidang.name}</h3>

                 <div className="flex flex-col gap-4 mb-6">
                    <div>
                       <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Ketua Bidang</p>
                       <p className={`text-sm font-bold uppercase ${bidang.ketua === 'Belum diisi' ? 'text-white/30 italic' : 'text-[#ff0040]'}`}>
                         {bidang.ketua}
                       </p>
                    </div>
                    <div>
                       <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Sekretaris Bidang</p>
                       <p className={`text-sm font-bold uppercase ${bidang.sekretaris === 'Belum diisi' ? 'text-white/30 italic' : 'text-white/90'}`}>
                         {bidang.sekretaris}
                       </p>
                    </div>
                 </div>

                 <div className="mt-auto border-t border-white/10 pt-4">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-2">Anggota Bidang</p>
                    {bidang.anggota.length > 0 ? (
                       <ul className="flex flex-wrap gap-2">
                          {bidang.anggota.map((am, i) => (
                             <li key={i} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/80 uppercase tracking-wide font-medium">
                               {am}
                             </li>
                          ))}
                       </ul>
                    ) : (
                       <p className="text-xs text-white/30 italic">Anggota bidang belum tersedia.</p>
                    )}
                 </div>
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
