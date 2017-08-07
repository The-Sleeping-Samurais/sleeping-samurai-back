TOKEN="nSWcJqdHymxLxQAI454w3KmNuabIWFOLET2sATnUaVY=--RNF0v5YpAtfurWEbEj2PrhunszeDM1tIwLhrO5n8HA="
API="http://localhost:4741"
URL_PATH="/uploads"

ID='598778c0a730d12e796a158e'
curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
