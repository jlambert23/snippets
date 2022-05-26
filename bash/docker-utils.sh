#!/usr/bin/env bash

# docker killers
alias dc-sa='docker container stop `docker container ls -aq`'
alias dc-rma='docker container rm `docker container ls -aq`'
alias di-rma='docker image rm `docker image ls -aq`'
alias dv-rma='docker volume rm `docker volume ls -q`'

function dclean() {
  if [ -z "$1" ]; then
    echo "Cleaning all containers"
    docker ps -qaf name=.api$ | xargs docker stop | xargs docker rm
    docker images | tail -n +1 | awk '{print $3}' | xargs docker image rm
    return 1
  fi

  docker ps -qa -f name=$1.api$ | xargs docker stop | xargs docker rm
  docker images | grep $1 | tail -n +1 | awk '{print $3}' | xargs docker image rm
}
