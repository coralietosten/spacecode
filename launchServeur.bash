#!/bin/bash

git pull

cd spacecode

npm i 
npm run build

pm2 restart SpacecodeBuild


# npx pm2 start npm --name "SpacecodeBuild" -- run runBuild
# npx serve -s build -l 8080 --no-clipboard
# export HTTPS_PROXY=http://cache.ha.univ-nantes.fr:3128/
# export HTTP_PROXY=http://cache.ha.univ-nantes.fr:3128/
# export NO_PROXY=*.univ-nantes.fr