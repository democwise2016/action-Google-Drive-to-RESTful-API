# Dockerhub

- https://docs.docker.com/get-started/04_sharing_app/
- https://hub.docker.com/
- `docker image ls | head` 找出合適的名稱，例如「html-webpage-dashboard_app」
- 建立合適的repo https://hub.docker.com/
- `docker tag action-rss-fb-feed-app pudding/github-action-app:puppeteer-python-14-action-rss-20230826-1641`
- `docker push pudding/github-action-app:puppeteer-python-14-action-rss-20230826-1641`
- 修改docker-compose.yaml `image: pudding/github-action-app:puppeteer-python-14-action-rss-20230826-1641`