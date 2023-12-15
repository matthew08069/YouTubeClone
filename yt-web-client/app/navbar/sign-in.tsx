'use client';

import { Fragment, use } from "react";
import styles from "./sign-in.module.css";
import { signInWithGoogle, signOut } from "../utils/firebase/firebase";
import { User } from "firebase/auth";
import Image from 'next/image'
import {useState} from "react";

const defaultAvatar = "../../public/thumbnail.png";

interface SignInProps {
    user: User | null;
}

export function SignIn({ user }: SignInProps) {
    const [dropDown, setdropDown] = useState<true | false>(false);
    const signOutWithDropDown = () => {
        signOut();
        setdropDown(false);
    }

    return(
        <Fragment>
            { user ?
                (   
                    <div>
                        {/*TODO: style the button so it looks more like the one on YouTube */}
                        <Image  onClick={() => setdropDown(!dropDown)} className={styles.signin} 
                                    src={user.photoURL || defaultAvatar} 
                                    width={50} height={50} alt="avatar"/>
                        {/* <button className={styles.signin} onClick={signOut}>
                            Sign Out
                        </button>
                        {/* <button className={styles.signin} onClick={() => setdropDown(!dropDown)}>
                            Click Me
                        </button> */}
                        { dropDown ?
                            ( 
                                <div className={styles.dropdown}>
                                    <ul>
                                        <li>
                                            {user.displayName}
                                        </li>
                                        <li>
                                            {user.email}
                                        </li>
                                        <li>
                                            <button className={styles.dropdownContent} onClick={signOutWithDropDown}>
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <p></p>  
                            )
                        }
                    </div>
                ) : (
                    <button className={styles.signin} onClick={signInWithGoogle}>
                        Sign In
                    </button>
                )
            }
        </Fragment>
    )
}