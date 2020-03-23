#!/bin/sh
export UI_PATH=.deploy/ui
export GIT_HEROKU_URL="https://$HEROKU_USERNAME:$HEROKU_API_KEY@git.heroku.com/ressignifica.git"
git clone $GIT_HEROKU_URL $UI_PATH
rm -frv $UI_PATH/*
cp -frv ui/build $UI_PATH/dist
cp -frv ui/static.json $UI_PATH
cd $UI_PATH
git add --all
git commit -m "Build $TRAVIS_BUILD_NUMBER"
git push origin master
