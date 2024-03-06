import { useEffect } from 'react';
import { useRouter } from 'next/router';
require('dotenv').config();

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect users to the sign-in page
    router.push('/signin');
  }, [router]);

  // Optionally, display a loading indicator or any placeholder content 
  // while the redirection is in progress
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-center">
        Redirecting to sign-in...
      </div>
    </div>
  );
}
