#!/bin/bash

source ./secrets/config.sh
export PGPASSWORD=$pgpassword

echo "DATABASE CONFIGURATION START"
dropdb -U $username --if-exist returnkeydb
createdb -U $username returnkeydb

knex migrate:latest
knex seed:run

echo "CONFIGURATION FINISH"