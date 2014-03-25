#!/bin/sh

cd static
git pull origin gh-pages
git add -A .
git commit -m "update"
git push origin gh-pages:gh-pages
