#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sign-out"
TOKEN='bKJLaR1aMpZIjFBV/OqZEyPQcsf0g7fe5gdu7RmbRUc=--wwVCnq6bNChcjDFxq9PtBcqY1nTP68TM+X4ky1RH08M='
ID='59860eb22a61060534a41056'
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
