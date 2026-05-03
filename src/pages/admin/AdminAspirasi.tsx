import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Trash2, MailOpen } from 'lucide-react';

export default function AdminAspirasi() {
  const [aspirations, setAspirations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'aspirations'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setAspirations(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });
    return () => unsub();
  }, []);


  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus pesan aspirasi ini?')) {
      try {
        await deleteDoc(doc(db, 'aspirations', id));
      } catch (error) {
        console.error("Error deleting: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Kotak Aspirasi</h2>
          <p className="text-white/60 text-sm">Lihat pesan dan aspirasi yang masuk</p>
        </div>
      </div>


      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari pesan..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ff0040]/50" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/40 bg-white/5">
                <th className="px-6 py-4 font-bold">Pengirim</th>
                <th className="px-6 py-4 font-bold">Pesan</th>
                <th className="px-6 py-4 font-bold">Tanggal</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40">Memuat data...</td>
                </tr>
              ) : aspirations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40">Belum ada aspirasi yang masuk.</td>
                </tr>
              ) : (
                aspirations.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-sm">{item.name || 'Anonim'}</p>
                      <p className="text-xs text-white/40">{item.contact || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-white/60 line-clamp-2 max-w-sm">{item.message}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-[#ff0040] hover:bg-[#ff0040]/10 transition-colors">
                          <MailOpen className="w-4 h-4" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="p-2 rounded-lg text-white/40 hover:text-[#ff0040] hover:bg-[#ff0040]/10 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
