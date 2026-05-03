import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Trash2, CheckCircle2, XCircle, Plus, Edit, List, FileText, ArrowLeft, GripVertical, Settings } from 'lucide-react';

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

function handleFirestoreError(error: unknown) {
  console.error("Firestore error: ", error);
}

export default function AdminPendaftaran() {
  const [view, setView] = useState<'list' | 'builder' | 'responses'>('list');
  const [forms, setForms] = useState<FormDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<FormDef | null>(null);

  // Load forms
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'forms'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FormDef));
      setForms(data);
      setLoading(false);
    }, handleFirestoreError);
    return () => unsub();
  }, []);

  const handleCreateForm = () => {
    setSelectedForm({
      id: '',
      title: 'Formulir Baru',
      description: '',
      isActive: true,
      fields: []
    });
    setView('builder');
  };

  const handleEditForm = (form: FormDef) => {
    setSelectedForm(form);
    setView('builder');
  };

  const handleViewResponses = (form: FormDef) => {
    setSelectedForm(form);
    setView('responses');
  };

  const handleDeleteForm = async (id: string) => {
    if (window.confirm('Hapus formulir ini? Semua pertanyaan akan hilang.')) {
      try {
        await deleteDoc(doc(db, 'forms', id));
      } catch (error) {
        handleFirestoreError(error);
      }
    }
  };

  const toggleFormActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'forms', id), { isActive: !currentStatus });
    } catch (error) {
      handleFirestoreError(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {view === 'list' && 'Kelola Pendaftaran'}
            {view === 'builder' && 'Form Builder'}
            {view === 'responses' && 'Data Pendaftar'}
          </h2>
          <p className="text-white/60 text-sm">
            {view === 'list' && 'Buat dan kelola formulir pendaftaran dinamis'}
            {view === 'builder' && 'Rancang formulir pendaftaran sesuai kebutuhan'}
            {view === 'responses' && `Melihat data untuk: ${selectedForm?.title}`}
          </p>
        </div>
        {view === 'list' && (
          <button 
            onClick={handleCreateForm}
            className="bg-[#ff0040] hover:bg-[#ff1a55] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(255,0,64,0.3)] shrink-0"
          >
            <Plus className="w-4 h-4" />
            Buat Formulir
          </button>
        )}
        {view !== 'list' && (
          <button 
            onClick={() => setView('list')}
            className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        )}
      </div>

      {view === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="text-white/40 col-span-full">Memuat formulir...</div>
          ) : forms.length === 0 ? (
            <div className="text-white/40 col-span-full p-8 border border-white/5 rounded-2xl text-center bg-[#121212]">
              Belum ada formulir. Silakan buat formulir baru.
            </div>
          ) : (
            forms.map(form => (
              <div key={form.id} className="bg-[#121212] border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white mb-1 line-clamp-1">{form.title}</h3>
                    <p className="text-white/40 text-xs line-clamp-2">{form.description || 'Tidak ada deskripsi'}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${form.isActive ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-white/50'}`}>
                    {form.isActive ? 'Aktif' : 'Draft'}
                  </span>
                </div>
                
                <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-white/5">
                   <div className="flex justify-between gap-2">
                     <button onClick={() => handleViewResponses(form)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1.5">
                       <List className="w-3.5 h-3.5" />
                       Pendaftar
                     </button>
                     <button onClick={() => handleEditForm(form)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-1.5">
                       <Edit className="w-3.5 h-3.5" />
                       Edit Form
                     </button>
                   </div>
                   <div className="flex justify-between pt-1">
                     <button 
                       onClick={() => toggleFormActive(form.id, form.isActive)} 
                       className="text-xs text-white/40 hover:text-white"
                     >
                       {form.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                     </button>
                     <button 
                       onClick={() => handleDeleteForm(form.id)} 
                       className="text-xs text-[#ff0040]/70 hover:text-[#ff0040]"
                     >
                       Hapus
                     </button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {view === 'builder' && selectedForm && (
        <FormBuilder 
          initialData={selectedForm} 
          onSave={() => setView('list')} 
        />
      )}

      {view === 'responses' && selectedForm && (
        <FormResponses formId={selectedForm.id} formDef={selectedForm} />
      )}
    </div>
  );
}

function FormBuilder({ initialData, onSave }: { initialData: FormDef, onSave: () => void }) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [startDate, setStartDate] = useState(initialData.startDate || '');
  const [endDate, setEndDate] = useState(initialData.endDate || '');
  const [fields, setFields] = useState<FormField[]>(initialData.fields || []);
  const [saving, setSaving] = useState(false);

  const addField = (type: FormField['type']) => {
    setFields([...fields, {
      id: Date.now().toString(),
      type,
      label: `Pertanyaan Baru`,
      required: false,
      options: type === 'dropdown' ? ['Opsi 1', 'Opsi 2'] : []
    }]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const cleanFields = fields.map(f => {
        const clean: any = { ...f };
        Object.keys(clean).forEach(key => {
          if (clean[key] === undefined || clean[key] === '') delete clean[key];
        });
        return clean;
      });

      const formPayload = {
        title,
        description,
        startDate: startDate || null,
        endDate: endDate || null,
        fields: cleanFields,
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
        updatedAt: serverTimestamp()
      };
      
      if (initialData.id) {
        await updateDoc(doc(db, 'forms', initialData.id), formPayload);
      } else {
        await addDoc(collection(db, 'forms'), {
          ...formPayload,
          createdAt: serverTimestamp()
        });
      }
      onSave();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
       {/* Left: Editor */}
       <div className="flex-1 w-full bg-[#121212] border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col gap-6">
          
          <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
             <input 
               type="text" 
               value={title} 
               onChange={e => setTitle(e.target.value)} 
               placeholder="Judul Formulir" 
               className="bg-transparent text-2xl font-bold text-white focus:outline-none placeholder-white/20"
             />
             <textarea 
               value={description} 
               onChange={e => setDescription(e.target.value)} 
               placeholder="Deskripsi..." 
               className="bg-transparent text-sm text-white/60 focus:outline-none resize-none placeholder-white/20 min-h-[60px]"
             />
             <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className="flex-1">
                   <label className="block text-xs font-bold text-white/40 uppercase mb-1">Mulai Pendaftaran (Opsional)</label>
                   <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff0040]" />
                </div>
                <div className="flex-1">
                   <label className="block text-xs font-bold text-white/40 uppercase mb-1">Tutup Pendaftaran (Opsional)</label>
                   <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff0040]" />
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-4">
             {fields.length === 0 && (
               <div className="text-center py-10 text-white/30 border-2 border-dashed border-white/10 rounded-xl">
                 Tambahkan field pertama Anda dari panel kanan
               </div>
             )}
             
             {fields.map((field, index) => (
               <div key={field.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 group">
                  <div className="mt-1 opacity-20 group-hover:opacity-100 cursor-move transition-opacity hidden sm:block">
                     <GripVertical size={20} className="text-white" />
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                     <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-start">
                        <input 
                          type="text" 
                          value={field.label} 
                          onChange={e => updateField(field.id, { label: e.target.value })} 
                          className="flex-1 bg-transparent border-b border-white/10 px-0 focus:border-[#ff0040] focus:outline-none font-bold text-white text-base md:text-lg"
                        />
                        <select 
                          value={field.type} 
                          onChange={e => updateField(field.id, { type: e.target.value as FormField['type'] })}
                          className="bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                        >
                          <option value="short_text">Jawaban Singkat</option>
                          <option value="long_text">Paragraf</option>
                          <option value="number">Angka</option>
                          <option value="email">Email</option>
                          <option value="dropdown">Pilihan Ganda (Dropdown)</option>
                          <option value="file">Upload File / Gambar</option>
                        </select>
                     </div>

                     {/* Preview/Config based on type */}
                     <div className="pl-0 sm:pl-2">
                        {['short_text', 'long_text', 'number', 'email'].includes(field.type) && (
                          <div className="mb-3">
                            <input 
                              type="text" 
                              value={field.placeholder || ''} 
                              onChange={e => updateField(field.id, { placeholder: e.target.value })} 
                              placeholder="Ketik placeholder info (opsional)..."
                              className="w-full sm:w-1/2 bg-transparent border-b border-dashed border-white/20 pb-1 text-white/50 text-xs focus:outline-none focus:border-[#ff0040]/50"
                            />
                          </div>
                        )}
                        {field.type === 'short_text' && <div className="border-b border-white/20 pb-1 text-white/30 text-sm w-1/2">Teks jawaban singkat</div>}
                        {field.type === 'long_text' && <div className="border-b border-white/20 pb-1 text-white/30 text-sm w-3/4">Teks jawaban panjang...</div>}
                        {field.type === 'number' && <div className="border-b border-white/20 pb-1 text-white/30 text-sm w-1/3">123...</div>}
                        {field.type === 'email' && <div className="border-b border-white/20 pb-1 text-white/30 text-sm w-1/2">email@example.com</div>}
                        {field.type === 'file' && <div className="border border-dashed border-white/20 rounded p-4 text-center text-white/30 text-xs">Pendaftar akan mengunggah file di sini</div>}
                        
                        {field.type === 'dropdown' && (
                          <div className="flex flex-col gap-2">
                            {field.options?.map((opt, i) => (
                              <div key={i} className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full border border-white/30"></div>
                                 <input 
                                   type="text" 
                                   value={opt} 
                                   onChange={e => {
                                      const newOpts = [...(field.options || [])];
                                      newOpts[i] = e.target.value;
                                      updateField(field.id, { options: newOpts });
                                   }}
                                    className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#ff0040] focus:outline-none text-sm text-white/80 transition-colors"
                                 />
                                 <button 
                                   onClick={() => {
                                     const newOpts = field.options?.filter((_, idx) => idx !== i);
                                     updateField(field.id, { options: newOpts });
                                   }} 
                                   className="text-white/20 hover:text-[#ff0040]"
                                 >
                                   <XCircle size={14} />
                                 </button>
                              </div>
                            ))}
                            <button 
                              onClick={() => {
                                updateField(field.id, { options: [...(field.options || []), `Opsi ${field.options?.length ? field.options.length + 1 : 1}`] });
                              }}
                              className="text-[#ff0040] text-xs font-bold text-left hover:underline mt-1 w-fit"
                            >
                              + Tambah Opsi
                            </button>
                          </div>
                        )}
                     </div>

                     <div className="flex justify-end items-center gap-4 pt-4 border-t border-white/5 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={field.required} 
                            onChange={e => updateField(field.id, { required: e.target.checked })} 
                            className="accent-[#ff0040]"
                          />
                          <span className="text-xs text-white/60">Wajib diisi</span>
                        </label>
                        <div className="h-4 w-px bg-white/10"></div>
                        <button onClick={() => removeField(field.id)} className="text-white/40 hover:text-[#ff0040]">
                          <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               </div>
             ))}
          </div>
       </div>

       {/* Right: Tools & Actions */}
       <div className="w-full lg:w-72 bg-[#121212] border border-white/5 rounded-2xl p-4 sticky top-6 flex flex-col gap-6 shrink-0">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2">Tambah Elemen</p>
            <button onClick={() => addField('short_text')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl text-sm transition-colors text-left">
              <span className="text-[#ff0040] font-bold">T</span> Jawaban Singkat
            </button>
            <button onClick={() => addField('long_text')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl text-sm transition-colors text-left">
              <FileText size={16} className="text-[#ff0040] shrink-0" /> Paragraf / Teks Panjang
            </button>
            <button onClick={() => addField('number')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl text-sm transition-colors text-left">
              <span className="text-[#ff0040] font-bold">123</span> Angka
            </button>
            <button onClick={() => addField('email')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl text-sm transition-colors text-left">
              <span className="text-[#ff0040] font-bold">@</span> Email
            </button>
            <button onClick={() => addField('dropdown')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl text-sm transition-colors text-left">
              <List size={16} className="text-[#ff0040] shrink-0" /> Pilihan (Dropdown)
            </button>
            <button onClick={() => addField('file')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white p-3 rounded-xl text-sm transition-colors text-left">
               <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#ff0040] shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
               Upload File
            </button>
          </div>

          <div className="mt-auto border-t border-white/5 pt-6">
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="w-full bg-[#ff0040] disabled:bg-[#ff0040]/50 hover:bg-[#ff1a55] text-white py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(255,0,64,0.3)] transition-colors"
            >
              {saving ? 'Menyimpan...' : 'Simpan Formulir'}
            </button>
          </div>
       </div>
    </div>
  );
}

function FormResponses({ formId, formDef }: { formId: string, formDef: FormDef }) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch form_responses for this specific form
    const unsub = onSnapshot(collection(db, 'form_responses'), (snapshot) => {
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((d: any) => d.formId === formId);
      
      data.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      
      setResponses(data);
      setLoading(false);
    }, handleFirestoreError);
    return () => unsub();
  }, [formId]);

  const handleDelete = async (id: string) => {
      if (window.confirm('Hapus respon ini?')) {
        try {
          await deleteDoc(doc(db, 'form_responses', id));
        } catch (error) {
          handleFirestoreError(error);
        }
      }
  };
  
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'form_responses', id), { status });
    } catch (error) {
      handleFirestoreError(error);
    }
  };

  // Prepare columns from formDef fields, max 4 columns to avoid clutter
  const displayFields = formDef.fields.slice(0, 4);

  return (
    <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden w-full overflow-x-auto">
        <div className="p-4 border-b border-white/5 flex gap-4 min-w-max">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Cari data..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ff0040]/50" />
          </div>
        </div>
        
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b border-white/5 text-[11px] uppercase tracking-wider text-white/40 bg-white/5">
                <th className="px-6 py-4 font-bold">Waktu</th>
                {displayFields.map(f => (
                   <th key={f.id} className="px-6 py-4 font-bold">{f.label}</th>
                ))}
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={displayFields.length + 3} className="px-6 py-8 text-center text-white/40">Memuat data...</td>
                </tr>
              ) : responses.length === 0 ? (
                <tr>
                  <td colSpan={displayFields.length + 3} className="px-6 py-8 text-center text-white/40">Belum ada respon untuk formulir ini.</td>
                </tr>
              ) : (
                responses.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-xs text-white/50">
                       {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('id-ID') : '-'}
                    </td>
                    {displayFields.map(f => (
                       <td key={f.id} className="px-6 py-4 text-sm text-white/80 truncate max-w-[200px]">
                         {f.type === 'file' ? (
                            item.data && item.data[f.id] ? (
                               <a href={item.data[f.id]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Lihat Lampiran</a>
                            ) : '-'
                         ) : (
                            // Render text/number/dropdown
                            item.data && item.data[f.id] ? item.data[f.id] : '-'
                         )}
                       </td>
                    ))}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'accepted' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        item.status === 'rejected' ? 'bg-[#ff0040]/10 text-[#ff0040] border border-[#ff0040]/20' : 
                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleUpdateStatus(item.id, 'accepted')} className="p-2 rounded-lg text-green-500 hover:bg-green-500/10 transition-colors" title="Terima">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleUpdateStatus(item.id, 'rejected')} className="p-2 rounded-lg text-[#ff0040] hover:bg-[#ff0040]/10 transition-colors" title="Tolak">
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors">
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
  );
}
