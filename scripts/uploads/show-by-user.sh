TOKEN="LeF3Y8sJDjc+DvAucfc/fvw6fH2tjh8y2rdsYlh5wJU=--QgDGlJKZ2Jep7ymtFbT1FCzhj0sPoMRXMpht1Nca7VE="
ID="598765f332eb6c2be21ea8fa"
API="http://localhost:4741"
URL_PATH="/useruploads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
