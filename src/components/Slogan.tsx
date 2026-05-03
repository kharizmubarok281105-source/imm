import { motion } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Slogan() {
  return (
    <section className="py-12 bg-transparent relative overflow-hidden flex flex-col items-center min-h-[600px] sm:min-h-[800px] md:min-h-[900px]">
       <div className="relative z-20 flex flex-col items-center mb-8 sm:mb-12 mt-4 sm:mt-8">
           <div className="bg-[#ff0040] text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-full font-bold uppercase tracking-widest text-[11px] sm:text-[13px] shadow-[0_0_20px_rgba(255,0,64,0.6)] z-20">
              SUKU CADANG
           </div>
           <div className="relative -mt-4 sm:-mt-6 z-10 flex items-center justify-center">
              <svg width="32" height="20" sm:width="40" sm:height="24" viewBox="0 0 40 24" fill="none">
                 <path d="M0 0C6.6 0 12 5.4 12 12V20C12 22.2 13.8 24 16 24H24C26.2 24 28 22.2 28 20V12C28 5.4 33.4 0 40 0H0Z" fill="#ff0040" />
                 <path d="M14 12L20 18L26 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </div>
       </div>

       <div className="relative w-full max-w-[1200px] flex-1 flex justify-center mt-6 sm:mt-10 overflow-hidden sm:overflow-visible">
           {/* Big semi-circle - hidden on very small screens, shown on sm+ */}
           <div className="hidden sm:flex absolute -bottom-[400px] md:-bottom-[600px] w-[800px] h-[800px] md:w-[1400px] md:h-[1400px] rounded-full border-[60px] md:border-[100px] border-[#da5a1b] bg-gradient-to-t from-[#8b2b0a] to-[#451206] items-center justify-center -z-10 shadow-[inner_0_0_100px_rgba(0,0,0,0.8)]">
           </div>
           <div className="absolute -bottom-[100px] sm:-bottom-[200px] w-[500px] sm:w-[1000px] h-[300px] sm:h-[600px] bg-[#ff0040]/30 blur-[100px] sm:blur-[150px] -z-10 pointer-events-none rounded-full"></div>

           {/* Circular Text */}
           <div className="hidden md:flex absolute bottom-[200px] w-[900px] h-[900px] pointer-events-none border border-white/10 rounded-full items-center justify-center">
               <svg viewBox="0 0 400 400" className="w-[840px] h-[840px]">
                 <path id="curve" d="M 50 200 A 150 150 0 1 0 350 200" fill="transparent" />
                 <text width="400" className="text-[10px] font-sans font-bold tracking-[0.4em] fill-white opacity-80 uppercase">
                   <textPath href="#curve" startOffset="50%" textAnchor="middle">
                     • BERDAYA • BERKARYA • BERJAYA •
                   </textPath>
                 </text>
               </svg>
           </div>

           {/* Left Circular Icon */}
           <div className="hidden lg:flex absolute left-[12%] bottom-[250px] w-[100px] h-[100px] bg-[#b16447] rounded-full items-center justify-center shadow-2xl border-[3px] border-[#d88960] z-10 overflow-hidden cursor-pointer hover:scale-105 transition-transform group">
               <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
               <svg viewBox="0 0 24 24" className="w-12 h-12 text-white relative z-10 group-hover:scale-110 transition-transform">
                 <path fill="currentColor" d="M3 21l3-8 5 4L21 3l-8 11.5-4-3L3 21z" />
               </svg>
           </div>

           {/* Right Circular Icon */}
           <div className="hidden lg:flex absolute right-[12%] bottom-[250px] w-[100px] h-[100px] bg-[#b98e21] rounded-full items-center justify-center shadow-2xl border-[3px] border-[#d6af3d] z-10 overflow-hidden cursor-pointer hover:scale-105 transition-transform group">
               <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
               <svg viewBox="0 0 24 24" className="w-12 h-12 text-white relative z-10 group-hover:scale-110 transition-transform">
                 <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 16h14v2H5v-2zm2-2h10V9l-5 3-5-3v5z" />
               </svg>
           </div>

           {/* Mobile view top text */}
           <div className="flex md:hidden absolute top-4 flex-col text-white text-center gap-2">
             <div className="text-[10px] font-bold tracking-[0.4em] text-[#ff0040] uppercase">
                • BERDAYA • BERKARYA • BERJAYA •
             </div>
           </div>

           {/* Background images for mobile layout positioning */}
           <div className="relative w-full h-[400px] sm:h-[600px] md:h-[800px] max-w-[800px] flex justify-center items-end px-4 mt-16 sm:mt-0">
             
             {/* Left Image Placeholder */}
             <div className="absolute left-[-20px] sm:left-[5%] md:left-[10%] bottom-[30px] sm:bottom-[50px] w-[140px] sm:w-[200px] md:w-[260px] aspect-[2/3] rounded-[16px] sm:rounded-[24px] overflow-hidden -rotate-[15deg] origin-bottom-right z-10 shadow-2xl transition-all blur-[1px] md:blur-[2px] opacity-60 md:opacity-70 group hover:blur-none hover:opacity-100 cursor-pointer hover:z-40">
                <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=400&h=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Left Project" />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent overlay mix-blend-overlay"></div>
                
                <div className="hidden md:block absolute top-[40%] right-[10px] bg-white/20 rounded-full p-2 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronLeft className="w-8 h-8 text-white font-bold" />
                </div>
             </div>

             {/* Right Image Placeholder */}
             <div className="absolute right-[-20px] sm:right-[5%] md:right-[10%] bottom-[30px] sm:bottom-[50px] w-[140px] sm:w-[200px] md:w-[260px] aspect-[2/3] rounded-[16px] sm:rounded-[24px] overflow-hidden rotate-[15deg] origin-bottom-left z-10 shadow-2xl transition-all blur-[1px] md:blur-[2px] opacity-60 md:opacity-70 group hover:blur-none hover:opacity-100 cursor-pointer hover:z-40">
                <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=400&h=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Right Project" />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent overlay mix-blend-overlay"></div>
                
                <div className="hidden md:block absolute top-[40%] left-[10px] bg-white/20 rounded-full p-2 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronRight className="w-8 h-8 text-white font-bold" />
                </div>
             </div>

             {/* Center Image */}
             <div className="relative bottom-4 sm:bottom-10 w-[200px] sm:w-[280px] md:w-[340px] aspect-[4/5] rounded-[24px] sm:rounded-[36px] overflow-hidden border-[3px] sm:border-[4px] border-[#180a0c] z-30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.9)] cursor-pointer group">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&h=500" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Main Project" />
                
                <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                   <div className="w-[48px] h-[48px] sm:w-[72px] sm:h-[72px] bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-transform duration-300 pointer-events-none group-hover:scale-110">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-10 sm:h-10 text-black ml-1" fill="currentColor">
                         <path d="M8 5v14l11-7z"/>
                      </svg>
                   </div>
                </div>
             </div>

             {/* Navigation Arrows for Center Image */}
             <div className="absolute bottom-[40%] sm:bottom-[300px] left-[15%] sm:left-[25%] md:left-[30%] z-40 text-white cursor-pointer hover:-translate-x-2 transition-transform opacity-80 hover:opacity-100">
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-xl" strokeWidth={3} />
             </div>
             <div className="absolute bottom-[40%] sm:bottom-[300px] right-[15%] sm:right-[25%] md:right-[30%] z-40 text-white cursor-pointer hover:translate-x-2 transition-transform opacity-80 hover:opacity-100">
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-xl" strokeWidth={3} />
             </div>
           </div>

       </div>
    </section>
  );
}
