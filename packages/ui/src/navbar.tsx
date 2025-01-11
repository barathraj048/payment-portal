'use client'
import { Button } from './button.js';
import { signIn, signOut, useSession } from "next-auth/react";


function Navbar() {
  const { data: session, status: sessionStatus } = useSession();

  const handler = async () => {
    if (session) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return (
    <nav className="w-full h-fit px-24 py-4 justify-between flex bg-black text-white">
      <div>logo</div>
      <div>
        <Button onClick={handler}>
          {session ? 'Logout' : 'Login'}
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;