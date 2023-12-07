import express from "express";
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./storage";
import { isVideoNew, setVideo } from "./firestore";

setupDirectories();

const app = express();
app.use(express.json());

app.post('/process-video', async(req, res) => {
  // Get the bucket and filename from the Cloud Pub/Sub message
  let data;
  const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
  data = JSON.parse(message);

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;
  const videoId = inputFileName.split('.')[0];

  try{
    if(!data.name){
      throw new Error("Invalid message payload received");
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send("Bad request: missing filename");
  }

  if(!isVideoNew(inputFileName)){
    return res.status(400).send("Bad request: Video has already been processed");
  }else {
    await setVideo(videoId, {
      id: videoId,
      uid: videoId.split('-')[0],
      status: 'processing'
    });
  }

  // Download raw video from GCS
  await downloadRawVideo(inputFileName);

  // Convert video to 360p
  try {
    await convertVideo(inputFileName, outputFileName);
  }catch (err) {
    await Promise.all([    
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);
    console.error(err);
    return res.status(500).send("Internal server error");
  }

  // Upload processed video to GCS
  await uploadProcessedVideo(outputFileName);

  await setVideo(videoId, {
    status: 'processed',
    filename: outputFileName
  });

  await Promise.all([    
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)
  ]);

  return res.status(200).send("Processing complete");
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
console.log(`Video processing service listening at http://localhost:${port}`);
});