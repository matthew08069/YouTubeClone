<<comment
Description: Script to build and deploy docker image to GCP Cloud Run
Project: yt-clone-407015
comment

read -p "Running on a M chip(ARM) machine. (y)Yes/(n)No/(c)Cancel:- " choice
case $choice in
[yY]* ) echo "docker build -t us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client . --platform linux/amd64"
        docker build -t us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client . --platform linux/amd64;;
[nN]* ) echo "docker build -t us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client ."
        docker build -t us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client .;;
[cC]* ) echo "Docker build cancelled" ;;
*) exit ;;
esac

echo "docker push us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client"
docker push us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client

echo "gcloud run deploy yt-web-client --image us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client \
  --region=us-central1 \
  --platform managed \
  --timeout=3600 \
  --memory=2Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=1"
gcloud run deploy yt-web-client --image us-central1-docker.pkg.dev/yt-clone-407015/yt-web-client-repo/yt-web-client \
  --region=us-central1 \
  --platform managed \
  --timeout=3600 \
  --memory=2Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=1
