#!/bin/sh
cd /VSCodeSpace/node-blog-1
cp access.log $(date + %Y-%m-%d).access.log
echo "" > access.log