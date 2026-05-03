import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Search, Trash2, Edit } from 'lucide-react';

export default function AdminAnggota() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [status, setStatus] = useState('aktif');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'members'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMembers(data);
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
      await addDoc(collection(db, 'members'), {
        name,
        nim,
        status,
        createdAt: new Date().toISOString()
      });
      setIsAddOpen(false);
      setName('');
      setNim('');
      setStatus('aktif');
    } catch (error) {
      console.error("Error adding member: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus anggota ini?')) {
      try {
        await deleteDoc(doc(db, 'members', id));
      } catch (error) {
        console.error("Error deleting member: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Data Anggota</h2>
          <p className="text-white/60 text-sm">Kelola data anggota PK IMM Ibnu An-Nafis</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-[#ff0040] hover:bg-[#ff1a55] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,0,64,0.3)]"
        >
          <Plus className="w-4 h-4" />
          Tambah Anggota
        </button>
      </div>

      {isAddOpen && (
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Tambah Anggota Baru</h3>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Nama Lengkap</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#ff0040] focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">NIM / NBM</label>
              <input type="text" value={nim} onChange={e => setNim(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#ff0040] focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#ff0040] focus:outline-none">
                <option value="aktif">Aktif</option>
                <option value="pasif">Pasif</option>
                <option value="alumni">Alumni</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10">Batal</button>
              <button type="submit" className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#ff0040] hover:bg-[#ff1a55]">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari anggota..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ff0040]/50" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/40 bg-white/5">
                <th className="px-6 py-4 font-bold">Nama</th>
                <th className="px-6 py-4 font-bold">NIM</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Tanggal Dibuat</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/40">Memuat data...</td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/40">Belum ada anggota.</td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-sm">{member.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{member.nim || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        member.status === 'aktif' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        member.status === 'pasif' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                        'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(member.id)} className="p-2 rounded-lg text-white/40 hover:text-[#ff0040] hover:bg-[#ff0040]/10 transition-colors">
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
