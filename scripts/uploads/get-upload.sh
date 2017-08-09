#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"
TOKEN='S75IMc8/D4qX1iJ5zA/3HHWcDtlpHTCzY03k+DKkAZc=--7WXjwu9mGSwRyJ64IvOXiD1Q3rwfBUJloVePW9PhQvI='
ID='5989f2e85a10c1b1d873ea78'
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
