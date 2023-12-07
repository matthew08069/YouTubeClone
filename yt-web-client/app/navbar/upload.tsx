'use client';

import { Fragment } from "react";
import { uploadVideo } from "../utils/firebase/functions";
import Image from 'next/image';

import styles from "./upload.module.css";

export default function Upload() {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
          handleUpload(file);
        }
      };
    
      const handleUpload = async (file: File) => {
        try {
          const response = await uploadVideo(file);
          alert(`File uploaded successfully. Server responded with: ${JSON.stringify(response)}`);
        } catch (error) {
          alert(`Failed to upload file: ${error}`);
        }
      }; 

    return (
      <Fragment>
      <input id="upload" className={styles.uploadInput} type="file" accept="video/*" onChange={handleFileChange} />
      <label htmlFor="upload" className={styles.uploadButton}>
        <Image width={90} height={20} src="/upload-logo.svg" alt="Upload Logo"></Image>
      </label>
    </Fragment>
    )
};