import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  Search, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ClipboardList, 
  Wallet, 
  Target, 
  FileText, 
  MessageSquare, 
  MessagesSquare, 
  Mail, 
  BarChart3, 
  Box, 
  GraduationCap, 
  Vote, 
  Folder, 
  Settings, 
  UserCog, 
  BookOpen, 
  DatabaseBackup,
  Bell,
  Globe,
  Menu,
  X,
  LogOut
} from 'lucide-react';

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close mobile menu when clicking outside or navigating
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-white/50 text-sm">Validating credentials...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050505] flex text-white overflow-hidden font-sans selection:bg-[#ff0040]/30 selection:text-white">
       
       {/* Mobile Overlay */}
       {isMobileMenuOpen && (
         <div 
           className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
           onClick={closeMobileMenu}
         />
       )}

       {/* Sidebar */}
       <aside className={`w-[280px] bg-[#121212] border-r border-white/5 flex flex-col h-screen fixed md:relative z-50 shrink-0 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 pb-2 border-b border-white/5 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded bg-[#ff0040] text-white flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,0,64,0.4)]">
                  I
               </div>
               <div>
                  <h1 className="font-bold text-[15px] leading-tight text-white tracking-wide">PK IMM Ibnu An-Nafis</h1>
               </div>
             </div>
             <button onClick={closeMobileMenu} className="md:hidden text-white/60 hover:text-white">
               <X size={20} />
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto pb-8 custom-scrollbar">
            <div className="px-4 py-4">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3 ml-2">Workspace</p>
              <div className="space-y-0.5">
                 <SidebarItem to="/admin" icon={<LayoutDashboard size={18} />} label="Dasbor" exact onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/acara" icon={<Calendar size={18} />} label="Acara & Presensi" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/anggota" icon={<Users size={18} />} label="Data Anggota" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/pendaftaran" icon={<ClipboardList size={18} />} label="Kelola Pendaftaran" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/keuangan" icon={<Wallet size={18} />} label="Keuangan" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/proker" icon={<Target size={18} />} label="Tracking Proker" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/berita" icon={<FileText size={18} />} label="Berita & Blog" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/aspirasi" icon={<MessageSquare size={18} />} label="Kotak Aspirasi" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/forum" icon={<MessagesSquare size={18} />} label="Forum Internal" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/arsip" icon={<Mail size={18} />} label="E-Arsip Surat" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/laporan" icon={<BarChart3 size={18} />} label="Laporan Otomatis" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/aset" icon={<Box size={18} />} label="Inventaris Aset" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/alumni" icon={<GraduationCap size={18} />} label="Database Alumni" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/evoting" icon={<Vote size={18} />} label="Sistem E-Voting" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/dokumen" icon={<Folder size={18} />} label="Dokumen" onClick={closeMobileMenu} />
              </div>
            </div>

            <div className="px-4 py-2 border-t border-white/5">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 mb-3 ml-2 mt-4">Drive</p>
              <div className="space-y-0.5">
                 <SidebarItem to="/admin/pengaturan" icon={<Settings size={18} />} label="Pengaturan" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/pengguna" icon={<UserCog size={18} />} label="Manajemen Pengguna" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/panduan" icon={<BookOpen size={18} />} label="Panduan" onClick={closeMobileMenu} />
                 <SidebarItem to="/admin/backup" icon={<DatabaseBackup size={18} />} label="Backup & Restore" onClick={closeMobileMenu} />
              </div>
            </div>
          </div>
       </aside>

       {/* Main Content */}
       <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
          {/* Top Header */}
          <header className="h-[70px] bg-[#121212] border-b border-white/5 flex items-center justify-between px-4 md:px-6 shrink-0 z-10 relative">
             <div className="flex items-center gap-3 md:gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white/80 hover:text-white p-1">
                   <Menu size={24} />
                </button>
                
                {/* Search Bar */}
                <div className="relative group flex items-center hidden md:flex">
                   <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2 w-64 md:w-80 transition-colors focus-within:border-[#ff0040]/50 focus-within:bg-black/20">
                      <Search className="w-4 h-4 text-white/40 mr-2" />
                      <input type="text" placeholder="Cari…" className="bg-transparent text-sm text-white focus:outline-none w-full placeholder-white/40" />
                      <div className="flex items-center justify-center border border-white/10 rounded px-1.5 py-0.5 bg-white/5 text-[10px] text-white/40 font-mono">
                         ⌘K
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-3 md:gap-4">
                <Link to="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                   <Globe className="w-4 h-4" />
                   <span className="hidden sm:inline">Website</span>
                </Link>
                <button className="relative text-white/60 hover:text-white transition-colors">
                   <Bell className="w-5 h-5" />
                   <span className="absolute top-0 right-0 w-2 h-2 bg-[#ff0040] rounded-full border border-[#121212]"></span>
                </button>
                <div className="h-8 w-[1px] bg-white/10"></div>
                
                <div className="flex items-center gap-2 md:gap-3 group relative cursor-pointer">
                   <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1e1e1e] border border-white/10 flex items-center justify-center text-xs md:text-sm font-bold text-white group-hover:border-[#ff0040]/50 transition-colors overflow-hidden">
                      {user.photoURL ? <img src={user.photoURL} alt="Profile" /> : ((user.displayName?.[0] || user.email?.[0] || 'A').toUpperCase())}
                   </div>
                   <div className="hidden sm:block text-left">
                      <p className="text-[13px] font-bold text-white leading-tight truncate max-w-[120px]">{user.displayName || user.email}</p>
                      <p className="text-[11px] text-[#ff0040]">Administrator</p>
                   </div>
                   
                   {/* Tooltip Logout */}
                   <div className="absolute right-0 top-full mt-2 w-48 bg-[#121212] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-1">
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-white/5 flex items-center gap-2">
                        <LogOut size={16} /> Keluar
                      </button>
                   </div>
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            {/* The child routes will render here */}
            <Outlet />
          </div>
       </main>
    </div>
  );
}

function SidebarItem({ to, icon, label, exact = false, onClick }: { to: string, icon: React.ReactNode, label: string, exact?: boolean, onClick?: () => void }) {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link onClick={onClick} to={to} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all group ${isActive ? 'bg-[#ff0040]/10 text-[#ff0040]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
      <span className={`${isActive ? 'text-[#ff0040]' : 'text-white/40 group-hover:text-white'} transition-colors`}>{icon}</span>
      {label}
    </Link>
  )
}

