import PageHeader from '../components/PageHeader';

export default function Evoting() {
  return (
    <div className="min-h-screen">
      <PageHeader title="E-Voting System" description="Fasilitas pemilihan umum secara daring yang transparan dan aman." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="text-center text-gray-400 py-20 border border-white/10 rounded-2xl bg-[#121212] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
               <span className="block w-6 h-6 border-t-2 border-r-2 border-neon-red transform -rotate-45 relative top-1"></span>
            </div>
            <p className="text-xl font-medium text-white mb-2">Belum ada pemilihan yang aktif.</p>
            <p className="text-sm">Sistem pemilihan akan dibuka sesuai dengan jadwal panitia pelaksana.</p>
         </div>
      </div>
    </div>
  );
}
