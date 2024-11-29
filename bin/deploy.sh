USER='mangosteen'
SERVER='1.94.239.72'
DEPLOY_PATH="/home/$USER/app"
NGINX_PATH="/var/www/html"

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

title '压缩文件'
mkdir -p temp
tar -zcf temp/dist.tar.gz dist

title '创建部署目录'
ssh $USER@$SERVER "mkdir -p $DEPLOY_PATH"

title '上传文件'
scp -q temp/dist.tar.gz $USER@$SERVER:$DEPLOY_PATH/dist.tar.gz
 
title '删除本地临时目录'
rm -rf temp

title '上传完成'

title '解压和部署文件'
ssh $USER@$SERVER "cd $DEPLOY_PATH && \
    tar -xzf dist.tar.gz && \
    rm dist.tar.gz"

title '使用docker启动nginx 使用80端口'
ssh $USER@$SERVER "docker stop nginx || true && \
    docker rm nginx || true && \
    docker run -d --name nginx -p 80:80 -v $DEPLOY_PATH/dist:/usr/share/nginx/html nginx"
title '完成'
