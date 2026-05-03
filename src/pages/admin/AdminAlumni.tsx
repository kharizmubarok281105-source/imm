import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Search, Trash2 } from 'lucide-react';

export default function AdminAlumni() {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'alumni'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlumni(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'alumni'), {
        name,
        graduationYear,
        job,
        createdAt: new Date().toISOString()
      });
      setIsAddOpen(false);
      setName('');
      setGraduationYear('');
      setJob('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus ini?')) {
      try {
        await deleteDoc(doc(db, 'alumni', id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Database Alumni</h2>
          <p className="text-white/60 text-sm">Kelola data alumni</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-[#ff0040] hover:bg-[#ff1a55] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Alumni
        </button>
      </div>

      {isAddOpen && (
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Nama Alumni</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Tahun Lulus</label>
              <input type="number" value={graduationYear} onChange={e => setGraduationYear(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Pekerjaan/Aktivitas Saat Ini</label>
              <input type="text" value={job} onChange={e => setJob(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
            </div>
            <div className="md:col-span-3 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold text-white/60 hover:text-white bg-white/5">Batal</button>
              <button type="submit" className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#ff0040]">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/40 bg-white/5">
                <th className="px-6 py-4 font-bold">Nama</th>
                <th className="px-6 py-4 font-bold">Tahun Lulus</th>
                <th className="px-6 py-4 font-bold">Pekerjaan</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40">Memuat data...</td>
                </tr>
              ) : alumni.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40">Belum ada data alumni.</td>
                </tr>
              ) : (
                alumni.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-bold text-white text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-white/60">{item.graduationYear}</td>
                    <td className="px-6 py-4 text-sm text-white/60">{item.job || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-white/40 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
