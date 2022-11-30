#!/bin/bash

#while ! curl http://"$PGHOST":"$PGPORT"/ 2>&1 | grep '52'
#do
#  sleep 1
#done
if [ "$NODE_ENV" != 'production' ]
then
  npm run watch
else
  npm start
fi

tail -f /dev/null
