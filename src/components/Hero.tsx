import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-black/40">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1598809053896-c11fb084de1e?auto=format&fit=crop&q=80&w=2000&h=1200" 
          alt="Study Group Poster Background" 
          className="w-full h-full object-cover object-top opacity-60 mix-blend-luminosity brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f12] via-[#1a0f12]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f12] via-[#1a0f12]/40 to-transparent"></div>
      </div>
      
      {/* Hero Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
        <div className="w-full md:w-4/5 lg:w-1/2">

          {/* Logo Title text with Pencil graphics (simulated via text & SVG) */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="mb-4 relative"
          >
             <h1 className="text-[52px] sm:text-[72px] lg:text-[100px] leading-[0.9] sm:leading-[0.8] font-black italic text-white uppercase tracking-tighter drop-shadow-2xl font-sans">
               STUDY <br/> 
               <span className="relative">
                  GROUP
                  <svg className="absolute -top-6 sm:-top-12 -right-4 sm:-right-8 w-10 h-10 sm:w-16 sm:h-16 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M7 21L12.5 15.5L8.5 11.5L3 17V21H7ZM19 8L16 5L17.5 3.5C18 3 18.5 3 19 3.5L20.5 5C21 5.5 21 6 20.5 6.5L19 8Z" />
                  </svg>
               </span>
             </h1>
          </motion.div>
          
          {/* Detailed Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 text-white/90 text-xs sm:text-[13px] font-medium tracking-wide mb-8 mt-6"
          >
             <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">
                <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor">
                   {/* Crown/Rating icon roughly */}
                   <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V18H19V19Z" />
                </svg>
                <span className="font-bold">13+</span>
             </div>
             <span className="text-white/40 hidden sm:inline">|</span>
             <span>2025</span>
             <span className="text-white/40 hidden sm:inline">|</span>
             <span>4 Episodes</span>
             <span className="text-white/40 hidden sm:inline">|</span>
             <span>Action</span>
             <span className="text-white/40 hidden sm:inline">|</span>
             <span>Thriller</span>
          </motion.div>

          {/* Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button className="bg-[#ff0040] hover:bg-[#ff0040]/80 text-white font-bold tracking-widest text-sm sm:text-[15px] px-8 sm:px-12 py-3.5 rounded-full shadow-[0_0_20px_rgba(255,0,64,0.5)] transition-all uppercase w-full sm:w-64 text-center">
              Watch Now
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Side Arrow (Right) - Hidden on mobile */}
      <div className="hidden sm:flex absolute right-0 top-[40%] -translate-y-1/2 w-[70px] h-32 bg-[#ff0040] items-center justify-start rounded-l-full z-20 cursor-pointer shadow-[-10px_0_30px_rgba(255,0,64,0.5)] transition-transform hover:-translate-x-2 pl-4">
         <ChevronLeft className="w-10 h-10 text-white stroke-[3]" />
      </div>

      {/* Share / Forward icon in transparent circle */}
      <div className="hidden sm:flex absolute right-[5%] bottom-[15%] w-14 h-14 border-2 border-white/40 hover:border-white rounded-full items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors z-20 backdrop-blur-sm group">
         <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </div>
      
    </section>
  );
}
