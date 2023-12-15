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
                        { dropDown ?
                            ( 
                                <div>
                                    <Image  onClick={() => setdropDown(!dropDown)} className={styles.avatar} 
                                        src={user.photoURL || defaultAvatar} 
                                        width={50} height={50} alt="avatar"/>
                                    <div className={styles.dropDownMenu}>
                                        <ul className={styles.dropDownItem_container}>
                                            <li className={styles.dropDownItem}>
                                                {user.displayName}
                                            </li>
                                            <li className={styles.dropDownItem}>
                                                {user.email}
                                            </li>
                                            <li className={styles.dropDownSignout}>
                                                <button className={styles.signout} onClick={signOutWithDropDown}>
                                                    Sign Out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Image  onClick={() => setdropDown(!dropDown)} className={styles.avatar} 
                                        src={user.photoURL || defaultAvatar} 
                                        width={50} height={50} alt="avatar"/>
                                </div>
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