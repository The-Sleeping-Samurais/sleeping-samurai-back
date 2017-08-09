## Description of Application

This API allows you to sign up for an account, sign in, change password, and log out.
This API also allows you to get all files uploaded, get a file uploaded, and get files
uploaded by a certain user, upload a file, update a file, and destroy a file. Files are
owned by a user and require authentiction for editing and deleting files.

## Link to Deployed Back-end Application

URL: https://mysterious-hamlet-91108.herokuapp.com/

## Link to Front-End Repository

URL: https://github.com/The-Sleeping-Samurais/sleeping-samurai-1-frontend

## Technologies Used

- Multer
- AWS SDK
- Crypto
- Mongoo
- Express
- Mongoose
- mime
- fs

## API End Points

| Verb   | URI Pattern            | Controller#Action      |
|--------|------------------------|------------------------|
| POST   | `/sign-up`             | `users#signup`         |
| POST   | `/sign-in`             | `users#signin`         |
| PATCH  | `/change-password/:id` | `users#changepw`       |
| DELETE | `/sign-out/:id`        | `users#signout`        |
| GET    | `/uploads`             | `uploads#index`        |
| GET    | `/uploads/:id`         | `uploads#show`         |
| GET    | `/uploads/:id`         | `uploads#useruploads`  |
| POST   | `/uploads`             | `uploads#create`       |
| PATCH  | `/uploads/:id`         | `uploads#update`       |
| DELETE | `/uploads/:id`         | `uploads#destroy`      |


## User Actions

#### POST /sign-up

Request:

```sh
curl --include --request POST http://localhost:4741/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
```

```sh
scripts/sign-up.sh
```

Response:

```md
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```sh
curl --include --request POST http://localhost:4741/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
```

```sh
scripts/sign-in.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/:id

Request:

```sh
curl --include --request PATCH http://localhost:4741/change-password/$ID \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/change-password.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/:id

Request:

```sh
curl --include --request DELETE http://localhost:4741/sign-out/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=1 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/sign-out.sh
```

Response:

```md
HTTP/1.1 204 No Content
```

### Users

| Verb | URI Pattern | Controller#Action |
|------|-------------|-------------------|
| GET  | `/users`    | `users#index`     |
| GET  | `/users/1`  | `users#show`      |

#### GET /users

Request:

```sh
curl --include --request GET http://localhost:4741/users \
  --header "Authorization: Token token=$TOKEN"
```

```sh
TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/users.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "users": [
    {
      "id": 2,
      "email": "another@example.email"
    },
    {
      "id": 1,
      "email": "an@example.email"
    }
  ]
}
```

#### GET /users/:id

Request:

```sh
curl --include --request GET http://localhost:4741/users/$ID \
  --header "Authorization: Token token=$TOKEN"
```

```sh
ID=2 TOKEN=33ad6372f795694b333ec5f329ebeaaa scripts/user.sh
```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 2,
    "email": "another@example.email"
  }
}
```

## File Actions

#### GET /uploads

Request:

```sh
#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo

```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "uploads": [
      {
      "_id": "5989f2e85a10c1b1d873ea78",
      "updatedAt": "2017-08-08T17:20:40.063Z",
      "createdAt": "2017-08-08T17:20:40.063Z",
      "name": "Recipes",
      "url": "https://airkicks.s3.amazonaws.com/2017-08-08/48ff395416e7ed66698bf02c17340f3b.png",
      "_owner": "5988818c23eab140dca1d668",
      "tag": "cooking",
      "description": "my recipe for cooking different apple pies",
      "size": 0.11,
      "__v": 0,
      "id": "5989f2e85a10c1b1d873ea78",
      "editable": false
    },
    {
      "_id": "5989f2e85a10c1b1d873ea78",
      "updatedAt": "2017-08-08T17:20:40.063Z",
      "createdAt": "2017-08-08T17:20:40.063Z",
      "name": "WorkoutPlan",
      "url": "https://airkicks.s3.amazonaws.com/2017-08-08/48ff395416e7ed66698bf02c17340f3b.png",
      "_owner": "598fd8c23eab140dca1as68",
      "tag": "exercise",
      "description": "hardcore workout sets",
      "size": 0.22,
      "__v": 0,
      "id": "5989f2e85a10c1123d873ea78",
      "editable": false
    },
    {
      "_id": "5989f2e85a10c1b1d873ea78",
      "updatedAt": "2017-08-08T17:20:40.063Z",
      "createdAt": "2017-08-08T17:20:40.063Z",
      "name": "quotes",
      "url": "https://airkicks.s3.amazonaws.com/2017-08-08/48ff395416e7ed66698bf02c17340f3b.png",
      "_owner": "5988818c23eab140dca1d668",
      "tag": "inspiration",
      "description": "daily dose of inspiration",
      "size": 1.1,
      "__v": 0,
      "id": "5989f2e85a10c1b1d873ea78",
      "editable": false
    },
  ]
}
```

#### GET /uploads/:id

Request:

```sh
#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads/:id"
TOKEN=''
curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo

```

Response:

```md
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "upload": {
    "_id": "5989f2e85a10c1b1d873ea78",
    "updatedAt": "2017-08-08T17:20:40.063Z",
    "createdAt": "2017-08-08T17:20:40.063Z",
    "name": "appple ",
    "url": "https://airkicks.s3.amazonaws.com/2017-08-08/48ff395416e7ed66698bf02c17340f3b.png",
    "_owner": "5988818c23eab140dca1d668",
    "tag": "pin",
    "description": "pin",
    "size": 0.11,
    "__v": 0,
    "id": "5989f2e85a10c1b1d873ea78",
    "editable": false
  }
}
```

#### CREATE /uploads

Note: There is no curl script for uploading a file to this API. In your AJAX
request to upload a file, you would need to pass file into a multi-part form,
which will transform the file into a long JSON string. You would need to pass in
a token in your AJAX request for user ownership.

Guiding Data Structure:

```js
upload: {
  name: name,
  description: description,
  tag: tag,
  file[load]: stringified file
}
```
Sample AJAX Request:

```javascript
const createMulti = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data,
    processData: false,
    contentType: false
  })
}
```

#### UPDATE /uploads/:id

Request:

```sh
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

```

Response:

```md
HTTP/1.1 204 No Content

```

#### DELETE /uploads/:id

Request:

```sh
#!/bin/sh
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

```

Response:

```md
HTTP/1.1 204
No Content
```
