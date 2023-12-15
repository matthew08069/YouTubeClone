<<comment
Description: Script to build and deploy docker image to GCP Cloud Run
Project: yt-clone-407015
comment

docker build -t us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client . --platform linux/amd64
docker push us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client
gcloud run deploy yt-web-client --image us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client \
  --region=us-central1 \
  --platform managed \
  --timeout=3600 \
  --memory=2Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=1
