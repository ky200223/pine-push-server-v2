#!/bin/bash

while [[ $# > 1 ]]
do
  key="$1"
  shift

  case "$key" in
    --env=*)
    export PUSH_SERVER_ENV="$1"
    shift
    ;;

    --debug=*)
    export DEBUG="$1"
    shift
    ;;

    *)
    echo "Unknown option detected : $i ${i#*=}"
    exit 1
    ;;

esac
done


# check environments
if [ "$PUSH_SERVER_ENV" != "local" ] && \
   [ "$PUSH_SERVER_ENV" != "dev" ] && \
   [ "$PUSH_SERVER_ENV" != "production" ]; then
  echo "You should set PUSH_SERVER_ENV=local or dev or production first."
  exit 1
fi

if [ -z "$DEBUG" ]; then
  export DEBUG=warn:*,error:*
fi

node bin/www