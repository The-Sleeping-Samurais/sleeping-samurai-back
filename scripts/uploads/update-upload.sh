ID="5989afe7af93ac13324a7b4c"
TOKEN="gMXZRJPlJkbkS+FXdbA63IM2wU8/rgLEcHv0MCV27qQ=--Vz9HMD17Jhg1OMp3CrYZ5CPnlmH9ITqF6QuHLJCLN0Q="
TEXT="NEW UPDATE"
URL="www.zipcar.com"
TAG="fun"
DESCRIPTION="Short blurb"


API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "upload": {
      "name": "'"${TEXT}"'",
      "url": "'"${URL}"'",
      "tag": "'"${TAG}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
