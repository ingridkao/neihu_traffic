#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e

npm run gitpage

# 移動至到打包後的dist目錄 
cd dist

# 讓github page重新整理正常(沒有複製則會到github的預設404 page)
cp index.html 404.html

# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init 
git checkout -b github-pages
git add -A
git commit -m 'Deploy 20230106 - feat: add GA4'

git push -f https://<github token>@github.com/<git user>/<git rep>.git

cd -
