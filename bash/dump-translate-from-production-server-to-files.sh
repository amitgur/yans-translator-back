#!/bin/bash

mongodump -h 139.59.209.250:27017 -d bandpad -p kehilamenagenet -u efratgur -c translates -o ./mongodb
