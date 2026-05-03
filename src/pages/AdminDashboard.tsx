import React, { useEffect, useState } from 'react';
import { 
  MoreVertical,
  Activity,
  Bell
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const initialChartData = [
  { name: 'Sen', presensi: 12 },
  { name: 'Sel', presensi: 19 },
  { name: 'Rab', presensi: 15 },
  { name: 'Kam', presensi: 22 },
  { name: 'Jum', presensi: 30 },
  { name: 'Sab', presensi: 25 },
];

export default function AdminDashboard() {
  const [totalAnggota, setTotalAnggota] = useState(0);
  const [totalAcara, setTotalAcara] = useState(0);
  
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const currentTime = new Date().toLocaleTimeString('id-ID');
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Realtime listener for Total Anggota
    const unsubscribeAnggota = onSnapshot(collection(db, 'members'), (snapshot) => {
      setTotalAnggota(snapshot.size);
    }, (error) => {
      console.error("Firestore error [members]:", error);
    });

    // Realtime listener for Total Acara
    const unsubscribeAcara = onSnapshot(collection(db, 'events'), (snapshot) => {
      setTotalAcara(snapshot.size);
    }, (error) => {
      console.error("Firestore error [events]:", error);
    });

    return () => {
      unsubscribeAnggota();
      unsubscribeAcara();
    };
  }, []);

  return (
    <>
      {/* Title Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Dasbor Admin</h2>
            <p className="text-white/60 text-sm">Ringkasan Eksekutif PK IMM Ibnu An-Nafis</p>
        </div>
        <div className="bg-[#121212] border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between gap-6">
            <div>
              <p className="text-[11px] text-white/40 uppercase tracking-wider font-bold mb-0.5">Waktu Server</p>
              <p className="text-[13px] text-white/80 font-medium">{currentDate} <span className="text-[#ff0040] ml-1 font-mono">{time}</span></p>
            </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <MetricCard title="Total Anggota" value={totalAnggota.toString()} subtext={totalAnggota > 0 ? "Update realtime" : "Kosong"} />
        <MetricCard title="Presensi Hari Ini" value="0" subtext="Surplus" />
        <MetricCard title="Saldo Kas" value="Rp 0" subtext="" highlight />
        <MetricCard title="Proker Aktif" value="0" subtext="0 Aktif" />
        <MetricCard title="Acara" value={totalAcara.toString()} subtext={totalAcara > 0 ? "Update realtime" : "Update"} />
        <MetricCard title="Aset Dipinjam" value="0" subtext="0 Aset" />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Chart */}
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                  <h3 className="text-base font-bold text-white">Statistik Presensi</h3>
                  <p className="text-[13px] text-white/40">7 Hari Terakhir</p>
              </div>
              <button className="text-white/40 hover:text-white transition-colors">
                  <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={initialChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: '#222'}}
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    />
                    <Bar dataKey="presensi" fill="#ff0040" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
            {/* Log panel */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 h-[200px] flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-white/40" />
              </div>
              <h3 className="text-[15px] font-bold text-white mb-1">Log Aktivitas</h3>
              <p className="text-[13px] text-white/40">Belum ada log aktivitas.</p>
            </div>

            {/* Notification panel */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 h-[200px] flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-white/40" />
              </div>
              <h3 className="text-[15px] font-bold text-white mb-1">Ringkasan Notifikasi</h3>
              <p className="text-[13px] text-white/40">Tidak ada notifikasi baru.</p>
            </div>
        </div>
      </div>
    </>
  );
}

function MetricCard({ title, value, subtext, highlight = false }: { title: string, value: string, subtext: string, highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border relative overflow-hidden group ${highlight ? 'bg-gradient-to-br from-[#1a0508] to-[#120305] border-[#ff0040]/30' : 'bg-[#121212] border-white/5'}`}>
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] -translate-y-8 translate-x-8 opacity-20 ${highlight ? 'bg-[#ff0040]' : 'bg-white'}`}></div>
      <p className="text-[12px] font-medium text-white/50 mb-2 truncate">{title}</p>
      <div className="flex items-end gap-2">
        <p className={`text-2xl font-bold tracking-tight ${highlight ? 'text-[#ff0040]' : 'text-white'}`}>{value}</p>
      </div>
      {subtext && (
        <p className="text-[11px] text-white/40 mt-2 font-medium">{subtext}</p>
      )}
    </div>
  )
}


