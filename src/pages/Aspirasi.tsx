import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle2 } from 'lucide-react';

export default function Aspirasi() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'aspirations'), {
        name,
        contact,
        message,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
      setName('');
      setContact('');
      setMessage('');
    } catch (error) {
      console.error(error);
      alert('Gagal mengirim aspirasi. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader title="Kotak Aspirasi" description="Sampaikan kritik, saran, dan masukan Anda untuk kemajuan ikatan." />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         
         {submitted ? (
            <div className="bg-[#121212] p-8 md:p-14 rounded-[2rem] border border-green-500/30 text-center space-y-6">
               <div className="w-20 h-20 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                 <CheckCircle2 className="w-10 h-10" />
               </div>
               <h3 className="text-3xl font-bold text-white">Terima Kasih!</h3>
               <p className="text-white/60 text-lg">Aspirasi Anda telah berhasil dikirimkan secara anonim dan aman kepada Pimpinan Komisariat.</p>
               <button 
                 onClick={() => setSubmitted(false)}
                 className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-colors"
               >
                 Kirim Pesan Baru
               </button>
            </div>
         ) : (
           <form onSubmit={handleSubmit} className="bg-[#121212] p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nama (Opsional)</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#ff0040] transition-colors" placeholder="Masukkan nama (Kososngkan = Anonim)" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Kontak / Email (Opsional)</label>
                <input type="text" value={contact} onChange={e => setContact(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#ff0040] transition-colors" placeholder="Whatsapp atau email jika butuh balasan" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Pesan Aspirasi *</label>
                <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#ff0040] transition-colors resize-none" placeholder="Sampaikan isi aspirasi Anda di sini..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 mt-4 bg-[#ff0040] hover:bg-[#ff1a55] disabled:opacity-50 text-white rounded-xl font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(255,0,64,0.3)] hover:shadow-[0_0_25px_rgba(255,0,64,0.5)]"
              >
                 {loading ? 'Mengirim...' : 'Kirim Aspirasi'}
              </button>
           </form>
         )}
      </div>
    </div>
  );
}
