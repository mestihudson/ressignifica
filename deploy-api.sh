#!/bin/sh
export API_PATH=.deploy/api
export GIT_HEROKU_URL="https://$HEROKU_USERNAME:$HEROKU_API_KEY@git.heroku.com/ressignifica-api.git"
git clone $GIT_HEROKU_URL $API_PATH
rm -frv $API_PATH/*
cp -frv api/dist $API_PATH/dist
cp -frv api/deploy.package.json $API_PATH/dist/package.json
cd $API_PATH/dist
git add --all
git commit -m "Build $TRAVIS_BUILD_NUMBER"
git push origin master
