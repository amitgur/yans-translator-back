#!/bin/bash

# restart with git and forever

echo 'starting YANS on server with forever'
    echo "Stopping node thread"
    forever stop yans_translator_back.js

    echo "Restarting yans_translator_back.js"
    # user
    rm ./log/forever.log

    forever start -l /home/bandpad/bandpad/yans-translator_back/log/forever.log yans_translator_back.js
