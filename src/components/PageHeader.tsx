export default function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="bg-[#050505] pt-32 pb-16 text-center text-white border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-red/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-wider mb-6 italic uppercase">
             {title.split(' ').map((word, i) => 
               i % 2 !== 0 ? <span key={i} className="text-neon-red"> {word} </span> : <span key={i}>{word} </span>
             )}
          </h1>
          <div className="w-24 h-1 bg-neon-red mx-auto mb-6 relative glow-red"></div>
          {description && (
             <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium tracking-wide">
               {description}
             </p>
          )}
      </div>
    </div>
  );
}
