import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Calendar, Tag } from 'lucide-react';

export default function Berita() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // using query is fine but we can just sort locally for simplicity as before
    const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setPosts(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader title="Berita & Artikel" description="Kumpulan berita dan artikel terbaru seputar kegiatan PK IMM Ibnu An-Nafis." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {loading ? (
           <div className="text-center text-gray-400 py-20 border border-white/10 rounded-2xl bg-[#121212]">
             <p className="text-xl font-medium">Memuat berita...</p>
           </div>
        ) : posts.length === 0 ? (
           <div className="text-center text-gray-400 py-20 border border-white/10 rounded-2xl bg-[#121212]">
             <p className="text-xl font-medium">Belum ada berita yang diterbitkan.</p>
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {posts.map((post) => (
               <article key={post.id} className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff0040]/50 transition-colors group cursor-pointer flex flex-col">
                 <div className="h-48 bg-white/5 relative flex items-center justify-center overflow-hidden">
                   <span className="text-white/20 font-bold uppercase tracking-wider text-xl group-hover:scale-110 transition-transform duration-500">
                     IMM IBNU AN-NAFIS
                   </span>
                   <div className="absolute top-4 left-4">
                     <span className="inline-flex px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                       {post.category}
                     </span>
                   </div>
                 </div>
                 <div className="p-6 flex flex-col flex-1">
                   <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-wider mb-4">
                     <div className="flex items-center gap-1">
                       <Calendar className="w-3.5 h-3.5 text-[#ff0040]" />
                       {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                     </div>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#ff0040] transition-colors">{post.title}</h3>
                   <p className="text-white/60 text-sm line-clamp-3 mb-6 mt-auto">
                     {post.content}
                   </p>
                   <button className="text-sm font-bold text-[#ff0040] uppercase tracking-widest inline-flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                     Baca Selengkapnya &rarr;
                   </button>
                 </div>
               </article>
             ))}
           </div>
        )}

      </div>
    </div>
  );
}
