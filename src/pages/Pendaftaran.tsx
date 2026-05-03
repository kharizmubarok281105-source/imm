import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import PageHeader from '../components/PageHeader';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface FormField {
  id: string;
  type: 'short_text' | 'long_text' | 'number' | 'dropdown' | 'file' | 'email';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormDef {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  fields: FormField[];
}

export default function Pendaftaran() {
  const [forms, setForms] = useState<FormDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<FormDef | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'forms'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FormDef));
      // Only show active forms
      const activeForms = data.filter(f => f.isActive);
      setForms(activeForms);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader title={selectedForm ? selectedForm.title : "Area Pendaftaran"} description={selectedForm ? selectedForm.description : "Pilih formulir pendaftaran yang sedang dibuka."} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
         
         {!selectedForm ? (
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="text-center text-white/50">Memuat formulir pendaftaran...</div>
              ) : forms.length === 0 ? (
                <div className="bg-[#121212] p-8 md:p-12 rounded-[2rem] border border-neon-red/30 shadow-[0_0_30px_rgba(255,0,64,0.1)] text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>
                    <h2 className="text-2xl font-display font-bold text-white mb-4">Pendaftaran Belum Dibuka</h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                      Saat ini belum ada periode pendaftaran aktif. Pantau terus informasi selanjutnya melalui media sosial kami.
                    </p>
                </div>
              ) : (
                <div className="grid gap-4">
                   {forms.map(form => {
                     const now = new Date();
                     const isBeforeStart = form.startDate ? new Date(form.startDate) > now : false;
                     const isAfterEnd = form.endDate ? new Date(form.endDate) < now : false;
                     let statusText = 'Buka';
                     let statusColor = 'text-green-500 border-green-500/20 bg-green-500/10';
                     if (isBeforeStart) {
                        statusText = 'Belum Dibuka';
                        statusColor = 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10';
                     } else if (isAfterEnd) {
                        statusText = 'Ditutup';
                        statusColor = 'text-[#ff0040] border-[#ff0040]/20 bg-[#ff0040]/10';
                     }

                     return (
                     <div 
                       key={form.id} 
                       onClick={() => setSelectedForm(form)}
                       className="bg-[#121212] border border-white/5 hover:border-[#ff0040]/50 hover:bg-white/[0.02] transition-colors p-6 rounded-2xl flex items-center justify-between cursor-pointer group"
                     >
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                             <h3 className="text-lg font-bold text-white group-hover:text-[#ff0040] transition-colors">{form.title}</h3>
                             <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>{statusText}</span>
                          </div>
                          <p className="text-sm text-white/50 line-clamp-2">{form.description || 'Klik untuk melihat detail formulir ini.'}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ff0040]/20 group-hover:scale-110 transition-all shrink-0">
                           <ChevronRight className="w-5 h-5 text-white group-hover:text-[#ff0040]" />
                        </div>
                     </div>
                     );
                   })}
                </div>
              )}
            </div>
         ) : (
            <div>
              <button 
                onClick={() => setSelectedForm(null)}
                className="mb-6 flex flex-row items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <FormFiller form={selectedForm} onBack={() => setSelectedForm(null)} />
            </div>
         )}
      </div>
    </div>
  );
}

function FormFiller({ form, onBack }: { form: FormDef, onBack: () => void }) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
     const timer = setInterval(() => setCurrentDate(new Date()), 1000);
     return () => clearInterval(timer);
  }, []);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleFileChange = (fieldId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       // Convert to Base64 (naive approach for small files)
       // Usually we'd upload to Firebase Storage, but here we'll use base64 or warn
       if (file.size > 1 * 1024 * 1024) {
          alert("Peringatan: Ukuran file lebih dari 1MB mungkin gagal disimpan.");
       }
       const reader = new FileReader();
       reader.onloadend = () => {
         handleInputChange(fieldId, reader.result);
       };
       reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'form_responses'), {
        formId: form.id,
        data: formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Gagal mengirim formulir. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const isBeforeStart = form.startDate ? new Date(form.startDate) > currentDate : false;
  const isAfterEnd = form.endDate ? new Date(form.endDate) < currentDate : false;

  if (isBeforeStart) {
      const start = new Date(form.startDate!);
      const diff = start.getTime() - currentDate.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      return (
        <div className="bg-[#121212] rounded-[2rem] border border-white/10 p-8 md:p-12 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Pendaftaran Belum Dibuka</h2>
            <p className="text-white/60 mb-8">Pendaftaran untuk {form.title} akan dibuka dalam:</p>
            <div className="flex justify-center gap-4 text-center">
               <div className="bg-white/5 rounded-xl p-4 min-w-[80px]">
                  <div className="text-3xl font-bold text-[#ff0040]">{d}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Hari</div>
               </div>
               <div className="bg-white/5 rounded-xl p-4 min-w-[80px]">
                  <div className="text-3xl font-bold text-[#ff0040]">{h}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Jam</div>
               </div>
               <div className="bg-white/5 rounded-xl p-4 min-w-[80px]">
                  <div className="text-3xl font-bold text-[#ff0040]">{m}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Menit</div>
               </div>
               <div className="bg-white/5 rounded-xl p-4 min-w-[80px]">
                  <div className="text-3xl font-bold text-[#ff0040]">{s}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Detik</div>
               </div>
            </div>
            <button 
              onClick={onBack}
              className="mt-10 px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold tracking-widest uppercase transition-colors text-sm"
            >
              Kembali
            </button>
        </div>
      );
  }

  if (isAfterEnd) {
      return (
        <div className="bg-[#121212] rounded-[2rem] border border-[#ff0040]/30 p-8 md:p-12 shadow-[0_0_30px_rgba(255,0,64,0.1)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff0040] to-transparent"></div>
            <h2 className="text-2xl font-bold text-white mb-4">Pendaftaran Ditutup</h2>
            <p className="text-white/60">
              Mohon maaf, pendaftaran untuk <strong>{form.title}</strong> telah ditutup.
              <br/><br/>
              Silakan pantau informasi update tahapan selanjutnya di Instagram resmi kami <a href="https://instagram.com/immalishlah" target="_blank" rel="noreferrer" className="text-[#ff0040] font-bold hover:underline">@immalishlah</a>.
            </p>
            <button 
              onClick={onBack}
              className="mt-8 px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold tracking-widest uppercase transition-colors text-sm"
            >
              Kembali
            </button>
        </div>
      );
  }

  if (success) {
    return (
      <div className="bg-[#121212] p-8 md:p-12 rounded-[2rem] border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] text-center">
         <h2 className="text-3xl font-display font-bold text-white mb-4">Pendaftaran Berhasil!</h2>
         <p className="text-gray-400 mb-8 max-w-lg mx-auto">
           Terima kasih telah mengisi <strong>{form.title}</strong>. Kami telah menerima data Anda dan akan memprosesnya lebih lanjut.
         </p>
         <button 
           onClick={onBack}
           className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold tracking-widest uppercase transition-colors text-sm"
         >
           Kembali ke Daftar Formulir
         </button>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] rounded-[2rem] border border-white/10 p-6 md:p-8 lg:p-10 shadow-2xl">
       <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {form.fields.map(field => (
             <div key={field.id} className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white uppercase tracking-wider flex justify-between">
                   <span>{field.label} {field.required && <span className="text-[#ff0040]">*</span>}</span>
                </label>
                
                {field.type === 'short_text' && (
                  <input 
                    type="text" 
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0040]/50 transition-colors"
                  />
                )}

                {field.type === 'email' && (
                  <input 
                    type="email" 
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0040]/50 transition-colors"
                  />
                )}

                {field.type === 'long_text' && (
                  <textarea 
                    required={field.required}
                    rows={4}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0040]/50 transition-colors resize-y min-h-[100px]"
                  />
                )}

                {field.type === 'number' && (
                  <input 
                    type="number" 
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0040]/50 transition-colors"
                  />
                )}

                {field.type === 'dropdown' && (
                  <select 
                    required={field.required}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff0040]/50 transition-colors appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                     <option value="" disabled selected className="text-white/30 truncate">Pilih salah satu...</option>
                     {field.options?.map((opt, i) => (
                        <option key={i} value={opt} className="bg-[#121212]">{opt}</option>
                     ))}
                  </select>
                )}

                {field.type === 'file' && (
                  <div className="flex flex-col gap-2">
                    <input 
                      type="file" 
                      required={field.required && !formData[field.id]}
                      onChange={(e) => handleFileChange(field.id, e)}
                      className="block w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff0040]/10 file:text-[#ff0040] hover:file:bg-[#ff0040]/20"
                    />
                    {formData[field.id] && <span className="text-xs text-green-500 font-bold">✓ File telah disiapkan</span>}
                  </div>
                )}
             </div>
          ))}

          <div className="pt-6 border-t border-white/10">
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-[#ff0040] hover:bg-[#ff1a55] disabled:bg-[#ff0040]/50 text-white font-bold tracking-widest text-[15px] px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,0,64,0.4)] transition-all uppercase"
            >
              {submitting ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
            </button>
          </div>
       </form>
    </div>
  );
}
