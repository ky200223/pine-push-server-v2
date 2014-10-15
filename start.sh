#!/bin/bash

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