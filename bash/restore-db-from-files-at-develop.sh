#!/bin/bash

echo 'This script will delete the DB, use it only on TEST server'

read -p "Is this a TEST server? Are you sure? " -n 1 -r
echo    # (optional) move to a new line

if [[ $REPLY == 'y' ]]
then
mongorestore --db yanstranslator  --drop ./mongodb/bandpad --noIndexRestore
fi
