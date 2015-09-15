## Web Facade

A simple server acting as middle man between the web client and backend services.

To keep things modular, Client and Server are maintained as two separate modules, each with their own npm dependencies and test suites.

### Setup
```bash
# install server dependencies
npm install

# create .env file based on .env sample
cp .env-sample .env

# build client with dependencies
cd client/
npm install
gulp build
```


### Development

Make sure mongo is running and run `node server/server.js`.


### Server Routes

## GET /api/users

get all users

## GET /api/users/:id

get user with :id
