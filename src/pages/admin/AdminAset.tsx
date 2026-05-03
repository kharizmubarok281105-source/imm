import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Search, Trash2 } from 'lucide-react';

export default function AdminAset() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('good');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'assets'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssets(data);
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
      await addDoc(collection(db, 'assets'), {
        name,
        condition,
        quantity: Number(quantity),
        createdAt: new Date().toISOString()
      });
      setIsAddOpen(false);
      setName('');
      setCondition('good');
      setQuantity(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus aset ini?')) {
      try {
        await deleteDoc(doc(db, 'assets', id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Inventaris Aset</h2>
          <p className="text-white/60 text-sm">Kelola barang dan aset organisasi</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-[#ff0040] hover:bg-[#ff1a55] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Aset
        </button>
      </div>

      {isAddOpen && (
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Nama Barang</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Jumlah</label>
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Kondisi</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2 text-white">
                <option value="good">Baik</option>
                <option value="fair">Kurang Baik</option>
                <option value="broken">Rusak</option>
              </select>
            </div>
            <div className="md:col-span-4 flex justify-end gap-3 mt-2">
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
                <th className="px-6 py-4 font-bold">Nama Barang</th>
                <th className="px-6 py-4 font-bold">Kondisi</th>
                <th className="px-6 py-4 font-bold">Jumlah</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40">Memuat data...</td>
                </tr>
              ) : assets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40">Belum ada aset.</td>
                </tr>
              ) : (
                assets.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-bold text-white text-sm">{item.name}</td>
                    <td className="px-6 py-4">
                      {item.condition === 'good' && <span className="text-green-500 font-bold text-xs uppercase px-2 py-1 bg-green-500/10 rounded">Baik</span>}
                      {item.condition === 'fair' && <span className="text-yellow-500 font-bold text-xs uppercase px-2 py-1 bg-yellow-500/10 rounded">Kurang Baik</span>}
                      {item.condition === 'broken' && <span className="text-red-500 font-bold text-xs uppercase px-2 py-1 bg-red-500/10 rounded">Rusak</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{item.quantity}</td>
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
