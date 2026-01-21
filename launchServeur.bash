#!/bin/bash

git pull

cd spacecode

npm i 
npm run build
npx pm2 start npm --name "SpacecodeBuild" -- run runBuild # npx serve -s build -l 8080 --no-clipboard