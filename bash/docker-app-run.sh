#!/usr/bin/env bash

# Compiles and runs all docker-compose files in a directory, including a root docker-compose file and .env for common configs

args=''

for x in `ls projects`; do
    path="projects/${x}/docker"
    if [ ! -d $path ]; then
        continue;
    fi
    # https://github.com/docker/compose/issues/3874#issuecomment-1088917046
    arg="-f <(docker compose --env-file ./docker/.env -f ${path}/docker-compose.yml -f ${path}/docker-compose.override.yml config)"
    args="$args $arg"
done;

eval "docker compose \
    -f ./docker/docker-compose.yml \
    -f ./docker/docker-compose.override.yml \
    $args \
    -p bill-360 \
    --ansi never \
    up -d"
    # config"
