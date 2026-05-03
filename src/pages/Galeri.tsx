import PageHeader from '../components/PageHeader';

export default function Galeri() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Galeri Kegiatan" description="Dokumentasi berbagai kegiatan dan acara yang telah dilaksanakan." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video bg-[#121212] rounded-2xl border border-white/10 overflow-hidden relative group">
                   <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-white/5">Image Placeholder</div>
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
