#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e

npm run build

tar zcfv neihu_dist.tar.gz dist