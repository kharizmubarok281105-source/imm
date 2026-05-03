import PageHeader from '../components/PageHeader';

export default function Dokumen() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Arsip Dokumen" description="Akses dokumen-dokumen penting, materi kajian, dan panduan organisasi." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="text-center text-gray-400 py-20 border border-white/10 rounded-2xl bg-[#121212]">
            <p className="text-xl font-medium">Belum ada dokumen yang diunggah.</p>
         </div>
      </div>
    </div>
  );
}
