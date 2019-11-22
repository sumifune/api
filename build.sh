#!/bin/bash
SHA=$(git rev-parse HEAD)

dirname=$(pwd)
result="${dirname%"${dirname##*[!/]}"}" # extglob-free multi-trailing-/ trim
result="${result##*/}"

docker build -t sukia/$result:$SHA .

BRANCH_NAME=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
docker tag sukia/$result:$SHA sukia/$result:$BRANCH_NAME

BUILD_NUM=$(git rev-list --count HEAD)
docker tag sukia/$result:$SHA sukia/$result:build-$BUILD_NUM