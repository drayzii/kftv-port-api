# KFTV STUDIO PORTOFOLIO
[![Build Status](https://travis-ci.com/drayzii/kftv-studio-port.svg?token=QJSgEadXdEUhi3SnYStj&branch=develop)](https://travis-ci.com/drayzii/kftv-studio-port)
[![Coverage Status](https://coveralls.io/repos/github/drayzii/kftv-studio-port/badge.svg?branch=develop)](https://coveralls.io/github/drayzii/kftv-studio-port?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/9d3eb14117a045c43b1d/maintainability)](https://codeclimate.com/github/drayzii/kftv-studio-port/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9d3eb14117a045c43b1d/test_coverage)](https://codeclimate.com/github/drayzii/kftv-studio-port/test_coverage)

## Usage

### Dependencies

First install sequelize and sequelize-cli globally then run `npm install`

### .env

Create a .env file in root directory and paste in this

```sh
DATABASE_URL=
TEST_DATABASE_URL=
JWT_KEY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
Then fill in.

### Endpoints

Start with: 
```sh
api/v1
```

1. Creating an account: POST request

```json
/auth/signup
```

Body :

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "janedoe@example.com",
  "password": "pass1234"
}
```

Response:

```json
{
  "status": 201,
  "message": "Account successfully created!",
  "data": {
    "token": "43hgjg2u5gyg5ft4f5yg5u24g54.24h5f24k5y425.52h45fj245",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "janedoe@example.com"
  }
}
```

2. Logging In: POST request

```json
/auth/signin
```

Body :

```json
{
  "email": "janedoe@example.com",
  "password": "pass1234"
}
```

Response:

```json
{
  "status": 200,
  "message": "Successfully logged in!",
  "data": {
    "token": "43hgjg2u5gyg5ft4f5yg5u24g54.24h5f24k5y425.52h45fj245",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "janedoe@example.com"
  }
}
```

3. Posting a Video: POST request

```json
/videos
```

First:
- use form-data instead of body in postman
- Set Authorization in postman and select Bearer token and paset in the token

Body:

```json
{
  "description": "This is a description sample",
  "video": "<Select type file and add Video>"
}
```

Response:

```json
{
  "status": 201,
  "message": "Video successfully added",
  "data": {
    "id": 324,
    "description": "This is a description sample",
    "thumbnail": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.jpg",
    "url": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.mp4",
  }
}
```

4. Updating a Video: PATCH request

```json
/videos/:id
```

First:
- Set Authorization in postman and select Bearer token and paset in the token

Body:

```json
{
  "description": "This is a new description sample"
}
```

Response:

```json
{
  "status": 200,
  "message": "Video successfully added",
  "data": {
    "id": 324,
    "description": "This is a new description sample",
    "thumbnail": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.jpg",
    "url": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.mp4",
  }
}
```

5. Deleting a Video: DELETE request

```json
/videos/:id
```

Response:

```json
{
  "status": 200,
  "message": "Video Successfully deleted!"
}
```

7. Viewing all Videos: GET request

```json
/videos
```

Response:

```json
{
    "status": 200,
    "message":"Successfully retrieved all videos",
    "data": [{
        "id": 324,
        "description": "This is a description sample",
        "thumbnail": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.jpg",
        "url": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.mp4",
    },
    {
        "id": 325,
        "description": "This is a description sample",
        "thumbnail": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.jpg",
        "url": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.mp4",
    }...]
}
```

8. Viewing a Video: GET request

```json
/videos/:id
```

Response:

```json
{
  "status": 200,
  "message": "Successfully retrieved the video",
  "data": {
        "id": 324,
        "description": "This is a description sample",
        "thumbnail": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.jpg",
        "url": "https://res.cloudinary.com/drayzii/image/upload/v1565290420/fssr8ssftpgqqg6p2d7k.mp4",
    }
}
```

## Contributors

- Jonathan Shyaka