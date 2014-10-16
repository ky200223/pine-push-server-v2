#!/bin/bash

# parse arguments
while [[ $# > 1 ]]
do
  key="$1"
  shift

  case "$key" in
    --env)
    export PUSH_SERVER_ENV="$1"
    shift
    ;;

    --debug)
    export DEBUG="$1"
    shift
    ;;

    *)
    echo "Unknown option detected : $key"
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


# Clone source if directory does not exists
if [ ! -d "$HOME/pine-push-server-v2" ]; then
  git clone https://github.com/reaperes/pine-push-server-v2.git $HOME/pine-push-server-v2
fi

# update source
cd $HOME/pine-push-server-v2
git pull
npm install

# Run application
node bin/www