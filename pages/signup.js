import { useState, useEffect } from 'react';
import { signUpWithEmailPassword, signInWithGoogle } from '../firebaseUtils'; // Assuming you've exported these functions
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image'; 

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push('/notes');
        }
        });

        return () => unsubscribe();
    }, [router]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password)
      await signUpWithEmailPassword(auth, email, password);
      router.push('/notes');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(auth);
      router.push('/notes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSignUp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
            <button type="button" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleGoogleSignIn}>
              Sign up with Google
            </button>
          </div>
          <hr /> <br></br>
          <div className="flex items-center justify-between">
            <Link href="/signin" passHref>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                    </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}