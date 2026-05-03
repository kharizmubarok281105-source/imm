import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PlaceholderAdminPage({ title }: { title?: string }) {
  const location = useLocation();
  const displayTitle = title || location.pathname.split('/').pop()?.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 min-h-[400px]">
      <h2 className="text-xl font-bold text-white mb-4">{displayTitle}</h2>
      <p className="text-white/40 text-sm">Halaman ini sedang dalam pengembangan.</p>
    </div>
  );
}
