import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {Firestore} from "firebase-admin/firestore";
import {Storage} from "@google-cloud/storage";
import {onCall} from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "matthew08069-yt-raw-videos";

const videoCollectionId = "videos";

export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string
}

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
  };

  firestore.collection("users").doc(user.uid).set(userInfo);
  logger.info(`User created: ${JSON.stringify(userInfo)}`);
});

export const generateUploadUrl = onCall({maxInstances: 1}, async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated",
      "You must be signed in to upload a video.");
  }

  const auth = request.auth;
  const data = request.data;
  const bucket = storage.bucket(rawVideoBucketName);

  // Generate a unique filename for upload
  const fileName = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

  const [url] = await bucket.file(fileName).getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return {url, fileName};
});

export const getVideos = onCall({maxInstances: 1}, async () => {
  const snapshot = 
    await firestore.collection(videoCollectionId).limit(10).get();
  return snapshot.docs.map((doc) => doc.data());
});
