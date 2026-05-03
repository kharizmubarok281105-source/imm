import PageHeader from '../components/PageHeader';

export default function Kalender() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Kalender Kegiatan" description="Jadwal lengkap kegiatan, kajian, dan agenda organisasi mendatang." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="bg-[#121212] p-8 rounded-[2rem] border border-white/10 shadow-2xl min-h-[400px] flex items-center justify-center">
            <p className="text-gray-400 font-medium">Kalender sedang disinkronisasi...</p>
         </div>
      </div>
    </div>
  );
}
