#!/bin/sh

REPO_URL=`git config --get remote.origin.url`

if [ ! -d static ];
    then
        mkdir static
        cd static

        if git fetch && git branch -a | grep gh-pages;
            then
                git clone -b gh-pages "$REPO_URL" .
            else
                git init
                git remote add origin "$REPO_URL"
                git checkout -b gh-pages
                touch README.md
                git add -A
                git commit -m "init"
                git push origin gh-pages:gh-pages
        fi
fi


