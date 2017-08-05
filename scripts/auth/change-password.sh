#!/bin/bash

API="http://localhost:4741"
URL_PATH="/change-password"
OLDPW='1'
NEWPW='bish'
TOKEN='bKJLaR1aMpZIjFBV/OqZEyPQcsf0g7fe5gdu7RmbRUc=--wwVCnq6bNChcjDFxq9PtBcqY1nTP68TM+X4ky1RH08M='
ID='59860eb22a61060534a41056'
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
