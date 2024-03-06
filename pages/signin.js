import { useState, useEffect } from 'react';
import { signInWithEmailPassword, signInWithGoogle } from '../firebaseUtils'; // Assuming you've exported these functions
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { auth } from '../firebaseConfig'; // Adjust the path as necessary
import Image from 'next/image'; 

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  //if logged in, route to /notes
  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push('/notes');
        }
        });

        return () => unsubscribe();
    }, [router]);

  //signin handler
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(auth, email, password);
      router.push('/notes');
    } catch (error) {
      console.error(error);
    }
  };

  //google sign in handler
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(auth);
      router.push('/notes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1  style={{color: "#2BEBB4"}} className="text-5xl font-bold mb-8">Trusis</h1>
      <div className="w-full max-w-xs">
        <form onSubmit={handleSignIn} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4" type="submit">
            Sign In
          </button>
          <button onClick={handleGoogleSignIn} className="flex items-center justify-center w-full bg-white border rounded py-2 px-4 mb-4 hover:shadow">
            <Image src="/glogo.png" alt="Sign in with Google" width={20} height={20} /> {/* Adjust the path as necessary */}
            <span className="ml-2">Sign in with Google</span>
          </button>
          <hr className="mb-4" />
          <Link href="/signup" passHref>
            <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}