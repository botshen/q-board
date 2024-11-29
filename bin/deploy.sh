USER='mangosteen'
SERVER='1.94.239.72'
DEPLOY_PATH="/home/$USER/app"

function title {
  echo
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################"
  echo
}

title '本地构建'
pnpm install
pnpm run build

title '创建 nginx 配置文件'
mkdir -p nginx/conf.d
cat > nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name qq-board.shenxin.space;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl;
    server_name qq-board.shenxin.space;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://mangosteen-prod-1:3000/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

title '压缩文件'
mkdir -p temp
tar -zcf temp/dist.tar.gz dist

title '创建部署目录'
ssh $USER@$SERVER "mkdir -p $DEPLOY_PATH/nginx/conf.d"

title '上传文件'
scp -q temp/dist.tar.gz $USER@$SERVER:$DEPLOY_PATH/dist.tar.gz
scp -r nginx/conf.d/* $USER@$SERVER:$DEPLOY_PATH/nginx/conf.d/
 
title '删除本地临时目录'
rm -rf temp
rm -rf nginx

title '解压和部署文件'
ssh $USER@$SERVER "cd $DEPLOY_PATH && \
    tar -xzf dist.tar.gz && \
    rm dist.tar.gz"

title '创建 Docker 网络'
ssh $USER@$SERVER "docker network create app-network || true && \
    docker network connect app-network mangosteen-prod-1 || true"

title '修改 nginx 配置并重启'
ssh $USER@$SERVER "docker stop nginx || true && \
    docker rm nginx || true && \
    docker run -d --name nginx \
    --network app-network \
    -p 80:80 \
    -p 443:443 \
    -v $DEPLOY_PATH/dist:/usr/share/nginx/html \
    -v $DEPLOY_PATH/ssl:/etc/nginx/ssl:ro \
    -v $DEPLOY_PATH/nginx/conf.d:/etc/nginx/conf.d:ro \
    nginx"

title '完成'
