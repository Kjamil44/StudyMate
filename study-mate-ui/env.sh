#!/bin/sh
echo 'window.env = {'`awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env`'};' > ./build/$1.js