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

## GET /api/auth/login

authorize user via Facebook using Passport middleware

## GET /api/auth/logout

log out and end passport session

## GET /api/users

get all users

## GET /api/users/:id

get user with :id


### Editing Content

All website content is rendered from precompiled Handlebar templates located in `client/app/scripts/templates`.  Each page template has it's model attributes available as variables.

To spin up an interactive, live-reloading build environment, run `gulp` from within the `client` directory.


## Notes

### template rendering

Handlebar template rendering can happen in one of three ways

* precompiled at deployment using browserify w/ hbsfy, for static resources that don't change.  to precompile, run `gulp build`.

* server side at request time using express-handlebars, for dynamic content that changes no more than once per page, like username and flash messages.

* client side at any time using handlebars, for dynamic content that changes multiple times on the page, like user dashboard tooltips. *(not currently implemented)*
