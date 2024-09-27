'use client'
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const { data: session } = useSession(); // Get the session data
  const router = useRouter(); // To handle redirection after sign out

  const handleSignOut = async () => {
    localStorage.clear();
    await signOut({ redirect: false }); // Sign out without immediate redirection
    router.push('/'); // After logout, redirect to homepage
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex items-center space-x-4">
        {/* Home Link */}
        <li>
          <Link href="/" className="text-white hover:text-gray-300 transition duration-200 ease-in-out">
            Home
          </Link>
        </li>

        {/* Conditionally render Dashboard and Logout if session exists */}
        {session ? (
          <>
            {/* Dashboard Link */}
            <li className="ml-auto">
              <Link href="/Dashboard" className="text-white hover:text-gray-300 transition duration-200 ease-in-out">
                Dashboard
              </Link>
            </li>

            {/* Logout Button */}
            <li>
              <button
                onClick={handleSignOut}
                className="text-white hover:bg-red-500 hover:text-white px-4 py-2 transition duration-200 ease-in-out rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          /* Login Button if no session */
          <li className="ml-auto">
            <button
              onClick={() => signIn()} // Trigger OAuth login
              className="text-white hover:bg-green-500 hover:text-white px-4 py-2 transition duration-200 ease-in-out rounded"
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
