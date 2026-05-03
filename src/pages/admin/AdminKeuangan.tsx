import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Search, Trash2, Edit, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function AdminKeuangan() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'transactions'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // sort by date desc
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setTransactions(data);
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
      await addDoc(collection(db, 'transactions'), {
        type,
        amount: Number(amount),
        description,
        date: new Date(date).toISOString(),
        createdAt: new Date().toISOString()
      });
      setIsAddOpen(false);
      setType('income');
      setAmount('');
      setDescription('');
      setDate('');
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus record ini?')) {
      try {
        await deleteDoc(doc(db, 'transactions', id));
      } catch (error) {
        console.error("Error deleting transaction: ", error);
      }
    }
  };

  const totalSaldo = transactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Keuangan</h2>
          <p className="text-white/60 text-sm">Kelola kas dan transparansi anggaran</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-[#ff0040] hover:bg-[#ff1a55] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,0,64,0.3)]"
        >
          <Plus className="w-4 h-4" />
          Rekam Transaksi
        </button>
      </div>

      <div className="bg-gradient-to-r from-[#1a0508] to-[#120305] border border-[#ff0040]/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff0040] rounded-full blur-[80px] opacity-20 -translate-y-12 translate-x-12"></div>
        <p className="text-sm font-medium text-white/50 mb-2">Total Saldo Kas</p>
        <p className="text-4xl font-bold text-[#ff0040]">Rp {totalSaldo.toLocaleString('id-ID')}</p>
      </div>

      {isAddOpen && (
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Input Transaksi</h3>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Jenis</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#ff0040] focus:outline-none">
                <option value="income">Pemasukan (Income)</option>
                <option value="expense">Pengeluaran (Expense)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Jumlah (Rp)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#ff0040] focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Tanggal</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#ff0040] focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/50 mb-2">Keterangan</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-[#ff0040] focus:outline-none" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 rounded-xl text-sm font-bold text-white/60 hover:text-white bg-white/5 hover:bg-white/10">Batal</button>
              <button type="submit" className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#ff0040] hover:bg-[#ff1a55]">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/40 bg-white/5">
                <th className="px-6 py-4 font-bold">Tanggal</th>
                <th className="px-6 py-4 font-bold">Keterangan</th>
                <th className="px-6 py-4 font-bold">Jenis</th>
                <th className="px-6 py-4 font-bold">Jumlah</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/40">Memuat data...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/40">Belum ada transaksi.</td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-sm text-white/60">
                      {new Date(t.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-sm">{t.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      {t.type === 'income' ? (
                        <span className="inline-flex items-center gap-1 text-green-500 text-xs font-bold uppercase tracking-wider">
                          <ArrowUpRight className="w-3 h-3" /> Masuk
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#ff0040] text-xs font-bold uppercase tracking-wider">
                          <ArrowDownRight className="w-3 h-3" /> Keluar
                        </span>
                      )}
                    </td>
                    <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-500' : 'text-[#ff0040]'}`}>
                      {t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg text-white/40 hover:text-[#ff0040] hover:bg-[#ff0040]/10 transition-colors">
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
