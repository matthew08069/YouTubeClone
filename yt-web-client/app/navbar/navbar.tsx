'use client';

import Image from 'next/image';
import Link from 'next/link';

import styles from './navbar.module.css';
import { SignIn } from './sign-in';
import { onAuthStateChangedHelper } from '../utils/firebase/firebase';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { unsubscribe } from 'diagnostics_channel';

export default function Navbar() {
    // Init user state 
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
          setUser(user);
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, [] /* No dependencies, never rerun */);

    return(    
        <nav className={styles.nav}>
            <Link href="/"> 
                    <Image width={90} height={20} src="/youtube-logo.svg" alt="YouTube Logo" />
            </Link>
            <SignIn user={user}/>
        </nav>
    );
}