# YouTubeClone = https://yt-web-client-eeshjkauiq-uc.a.run.app
<--
docker build -t us-central1-docker.pkg.dev/<PROJECT_ID>/yt-web-client-repo/yt-web-client .
-- for Mac add --platform linux/amd64

docker push us-central1-docker.pkg.dev/<PROJECT_ID>/yt-web-client-repo/yt-web-client

-- Deploy container to cloud run
gcloud run deploy yt-web-client --image us-central1-docker.pkg.dev/PROJECT_ID/yt-web-client-repo/yt-web-client \
  --region=us-central1 \
  --platform managed \
  --timeout=3600 \
  --memory=2Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=1 \
  --project=<projectID>
  -->
