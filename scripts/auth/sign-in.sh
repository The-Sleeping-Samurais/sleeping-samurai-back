#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-in"
EMAIL='test27'
PASSWORD='1'
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
