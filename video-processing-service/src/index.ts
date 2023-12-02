import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
  //Get path of the input video file from the request
    const inputFilePath = req.body.inputFilePath; 
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad request: missing file path.");
    }

    ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=1:360, pad=ceil(iw/2)*2:ceil(ih/2)*2") //Resize the video to 360p
    .on('end', () => {
        res.status(200).send("Video processing completed.");
    })
    .on('error', (err) => {
        console.log(`An error occured! ${err}`);
        res.status(500).send(`Video processing failed! ${err}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});