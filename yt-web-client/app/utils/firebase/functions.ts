import {httpsCallable} from "firebase/functions";
import { functions } from "./firebase";

const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");
const getVideosFunction = httpsCallable(functions, "getVideos");

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string  
}

export async function uploadVideo(file: File){

    const respond: any = await generateUploadUrl({fileExtension: file.name.split(".").pop()});

    // Upload the file via the signed URL
    await fetch(respond?.data?.url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type
        },
    });
    return;
};

export async function getVideos(){
    const respond: any = await getVideosFunction();
    return respond?.data as Video[];
}
