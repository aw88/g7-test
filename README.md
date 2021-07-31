# Coding test

## The Task

> Build an API which calls this API, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

## The solution

To run the solution, first clone the repository and then run the following commands:

```sh
npm i
npm start
```

The server should then be listening on [`http://localhost:3000/`](http://localhost:3000/).

Unit tests can be run via the following command:

```sh
npm test
```

### Endpoints

The solution exposes 3 endpoints:

#### Users marked as in London - [`http://localhost:3000/london`](http://localhost:3000/london)

This simply requests the `/cities/London/users` endpoint on the provided API and returns the result if successful.

#### Users within 50 miles of London - [`http://localhost:3000/london/near`](http://localhost:3000/london/near)

This requests all users using the `/users` endpoint on the provided API and filters the returned users to those within 80km of London using the [`geolib`](https://www.npmjs.com/package/geolib) library.

#### Users in or within 50 miles of London - [`http://localhost:3000/`](http://localhost:3000/)

This return the results of both previous endpoints combined into a single list of users. Any duplicate users are ignored based on the value of their `id`.
