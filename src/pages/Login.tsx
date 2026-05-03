import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  // Redirect to admin if already logged in (checked via auth state)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user && !loading) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             navigate('/admin');
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (isRegister) {
        if (userDoc.exists()) {
          // Already registered Just login
          navigate('/admin');
        } else {
          // Register
          await setDoc(userDocRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'admin',
            createdAt: serverTimestamp(),
          });
          navigate('/admin');
        }
      } else {
        // Login
        if (userDoc.exists()) {
          navigate('/admin');
        } else {
          await auth.signOut();
          setError('Akun belum terdaftar. Silakan daftar terlebih dahulu.');
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login dibatalkan.');
      } else {
        setError('Gagal masuk. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff0040]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative z-10 text-center">
        <div className="flex justify-start mb-8">
          <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
            &larr; Kembali
          </Link>
        </div>
        
        <h2 className="text-3xl font-bold font-sans text-white italic tracking-wider mb-2 text-left">
          {isRegister ? 'BUAT' : 'SELAMAT'} <span className="text-[#ff0040]">{isRegister ? 'AKUN' : 'DATANG'}</span>
        </h2>
        <p className="text-gray-400 text-sm mb-8 text-left">
          {isRegister ? 'Daftar menggunakan Akun Google Anda untuk mengakses sistem.' : 'Silakan masuk menggunakan Akun Google Anda untuk mengakses sistem.'}
        </p>

        {error && (
          <div className="bg-[#ff0040]/10 border border-[#ff0040]/20 text-[#ff0040] text-sm px-4 py-3 rounded-xl mb-6 text-left font-bold">
            {error}
          </div>
        )}

        <div className="flex items-center gap-2 mb-6 justify-start">
           <input 
             type="checkbox" 
             id="remember" 
             checked={rememberMe} 
             onChange={(e) => setRememberMe(e.target.checked)} 
             className="accent-[#ff0040] w-4 h-4 rounded border-white/20"
           />
           <label htmlFor="remember" className="text-sm text-gray-400 select-none cursor-pointer">
             Ingat Saya
           </label>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          disabled={loading}
          className="w-full py-4 mt-4 bg-white hover:bg-gray-200 text-black rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
             <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
             <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
             <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading ? 'Memproses...' : (isRegister ? 'Daftar dengan Google' : 'Masuk dengan Google')}
        </button>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-sm text-gray-400">
            {isRegister ? 'Sudah memiliki akun?' : 'Belum memiliki akun?'}
            <button 
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="ml-2 text-[#ff0040] font-bold hover:underline"
            >
              {isRegister ? 'Masuk' : 'Daftar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
