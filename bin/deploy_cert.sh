#!/bin/bash

USER='mangosteen'
SERVER='1.94.239.72'
CERT_PATH="/home/$USER/app/ssl"

# 在服务器上创建证书目录
ssh $USER@$SERVER "mkdir -p $CERT_PATH"

# 复制证书到服务器
scp /tmp/fullchain.pem $USER@$SERVER:$CERT_PATH/
scp /tmp/privkey.pem $USER@$SERVER:$CERT_PATH/

echo "Certificates deployed successfully!"
