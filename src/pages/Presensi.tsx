import PageHeader from '../components/PageHeader';

export default function Presensi() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Presensi QR" description="Sistem presensi terintegrasi menggunakan QR Code untuk efisiensi kegiatan." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-md">
         <div className="bg-[#121212] p-8 rounded-[2rem] border border-white/10 shadow-2xl text-center">
             <div className="w-48 h-48 bg-white/5 mx-auto rounded-xl border-2 border-dashed border-white/20 flex flex-col justify-center items-center mb-6">
                <span className="text-gray-500 mb-2">SCAN AREA</span>
                <div className="w-1/2 h-1 bg-neon-red/50 rounded-full animate-pulse"></div>
             </div>
             <p className="text-gray-400 text-sm">Arahkan kamera ke QR Code yang tersedia pada lokasi kegiatan.</p>
             <button className="mt-8 w-full py-3 bg-neon-red hover:bg-[#ff1a55] text-white rounded-full font-bold tracking-widest uppercase transition-colors">
               Mulai Scan
             </button>
         </div>
      </div>
    </div>
  );
}
