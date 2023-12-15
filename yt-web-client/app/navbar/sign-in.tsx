'use client';

import { Fragment } from "react";
import styles from "./sign-in.module.css";
import { signInWithGoogle, signOut } from "../utils/firebase/firebase";
import { User } from "firebase/auth";
import Image from 'next/image'

const defaultAvatar = "/Users/matthewchan/Documents/GitHub/YouTubeClone/yt-web-client/public/thumbnail.png";

interface SignInProps {
    user: User | null;
}

export function SignIn({ user }: SignInProps) {
    return(
        <Fragment>
            { user ?
                (   <div>
                        {/*TODO: style the button so it looks more like the one on YouTube */}
                        <Image className={styles.signin} src={user.photoURL || defaultAvatar} width={50} height={50} alt="avatar" onClick={signOut}/>
                        {/* <button className={styles.signin} onClick={signOut}>
                            Sign Out
                        </button> */}
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