/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tentang from './pages/Tentang';
import Berita from './pages/Berita';
import Dokumen from './pages/Dokumen';
import Presensi from './pages/Presensi';
import Aspirasi from './pages/Aspirasi';
import Evoting from './pages/Evoting';
import Galeri from './pages/Galeri';
import Kalender from './pages/Kalender';
import Pendaftaran from './pages/Pendaftaran';
import Struktur from './pages/Struktur';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnggota from './pages/admin/AdminAnggota';
import AdminAcara from './pages/admin/AdminAcara';
import AdminKeuangan from './pages/admin/AdminKeuangan';
import AdminBerita from './pages/admin/AdminBerita';
import AdminAspirasi from './pages/admin/AdminAspirasi';
import AdminPendaftaran from './pages/admin/AdminPendaftaran';
import AdminProker from './pages/admin/AdminProker';
import AdminForum from './pages/admin/AdminForum';
import AdminArsip from './pages/admin/AdminArsip';
import AdminLaporan from './pages/admin/AdminLaporan';
import AdminAset from './pages/admin/AdminAset';
import AdminAlumni from './pages/admin/AdminAlumni';
import AdminEvoting from './pages/admin/AdminEvoting';
import AdminDokumen from './pages/admin/AdminDokumen';
import AdminPengaturan from './pages/admin/AdminPengaturan';
import AdminPengguna from './pages/admin/AdminPengguna';
import AdminPanduan from './pages/admin/AdminPanduan';
import AdminBackup from './pages/admin/AdminBackup';
import Footer from './components/Footer';

// Layout wrapper to conditionally hide Navbar and Footer
function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideHeaderFooterPaths = ['/login'];
  const showLayout = !hideHeaderFooterPaths.includes(location.pathname) && !location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] text-white font-sans selection:bg-neon-red selection:text-white">
      {showLayout && <Navbar />}
      <main>
        {children}
      </main>
      {showLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
       <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/struktur" element={<Struktur />} />
            <Route path="/dokumen" element={<Dokumen />} />
            <Route path="/presensi-qr" element={<Presensi />} />
            <Route path="/kotak-aspirasi" element={<Aspirasi />} />
            <Route path="/e-voting" element={<Evoting />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/kalender" element={<Kalender />} />
            <Route path="/pendaftaran" element={<Pendaftaran />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="acara" element={<AdminAcara />} />
              <Route path="anggota" element={<AdminAnggota />} />
              <Route path="pendaftaran" element={<AdminPendaftaran />} />
              <Route path="keuangan" element={<AdminKeuangan />} />
              <Route path="proker" element={<AdminProker />} />
              <Route path="berita" element={<AdminBerita />} />
              <Route path="aspirasi" element={<AdminAspirasi />} />
              <Route path="forum" element={<AdminForum />} />
              <Route path="arsip" element={<AdminArsip />} />
              <Route path="laporan" element={<AdminLaporan />} />
              <Route path="aset" element={<AdminAset />} />
              <Route path="alumni" element={<AdminAlumni />} />
              <Route path="evoting" element={<AdminEvoting />} />
              <Route path="dokumen" element={<AdminDokumen />} />
              <Route path="pengaturan" element={<AdminPengaturan />} />
              <Route path="pengguna" element={<AdminPengguna />} />
              <Route path="panduan" element={<AdminPanduan />} />
              <Route path="backup" element={<AdminBackup />} />
            </Route>

          </Routes>
       </MainLayout>
    </Router>
  );
}
