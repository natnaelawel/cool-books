# Deployed URL

https://cool-books-main.herokuapp.com/

# Architecture

![architecture](./img1.png)

# Technology Used

    * Nest js(Node js, Typescript)
    * Prisma (ORM)
    * Postgresql (Database)
    * Cloudinary(for cloud image storage)
    * RabbitMQ(Queue Processing for Microservice Communication)
    * Swagger for API documentation
    * Passport JWT for Authentication/Authorization

## Why Nest js

Nest is a framework for building efficient, scalable Node.js server-side applications. It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

### NestJs is an opinionated Node.js framework, it’s giving tools like:

    * Dependency Injection
    * Separation of code with modules
    * Controllers
    * Middleware
    * Filters
    * Guards

## Why Prisma?

Prisma is the only fully type-safe ORM in the TypeScript ecosystem . The generated Prisma Client ensure typed query results even for partial queries and relations.

It is compatible with a number of different SQL servers, including MySQL, Postgres, and SQLite,with MongoDB and Microsoft SQL servers in pre-release. Prisma simplifies database operations and enforces type safety in your queries.

## Why Cloudinary?

Cloudinary is a cloud-based end-to-end media management platform that provides solutions to help site creators serve optimized media files (images and videos) to their audiences. It also provides a lot of optional transformations that can be carried out on these media assets.

Cloudinary provides a couple of amazing solutions to this problem, namely:

    * Remote storage and delivery of images via CDN
    * Offers a wider range of transformations than gatsby-plugin-image.
    * Digital Asset Management for enterprise assets

## Why RabbitMQ?

RabbitMQ is often summarized as an “open source distributed message broker.”, it facilitates the efficient delivery of messages in complex routing scenarios.
RabbitMQ brokers can be distributed and configured to be reliable in case of network or server failure.

## Why Passport?

Passport is authentication middleware for Node. js . Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more

## Why Swagger?

Swagger is the largest framework for designing APIs using a common language and enabling the development across the whole API lifecycle, including documentation, design, testing, and deployment.
Swagger is easily adjustable, it can be successfully used for API testing and bug fixing. Another important point is that the same documentation can be used for accelerating various API-dependent processes.

# REST API Endpoints

- / -> Swagger UI endpoint
  -> the swagger is used to test all the api endpoints

  ### Global Api Prefix

- /api -> Application endpoint

  - /auth -> Auth Route
    - /signin -> POST: Signin
    - /signup -> POST: Signup
  - /users -> User Route
    - /me -> Get: Profile
    - / -> Get: Users
    - /:id -> Get: a Single User
    - /:id -> Patch: update user profile
    - /:id -> Delete: delete user
  - /books -> Books Route
    - / -> POST: Create Books
    - / -> Get: Get all books
    - /:id -> Get: Get a single books
    - /:id -> Patch: update book
    - /:id -> Delete: delete book
  - /exchange-requests -> Exchange Request Route
    - / -> POST: Create Exchange Request
    - / -> Get: Get all Exchange Request
    - /:id -> Get: Get a single Exchange Request
    - /:id -> Patch: update exchange request
    - /:id -> Delete: delete exchange request
  - /proposals -> Proposals(Exchange Requests that match users request) Route
    - / -> Get: find all proposals
    - /user -> Get: find proposal by user
    - /:id -> Get: find proposals by specific request

# REST API Example

The REST API to the coolbooks app is described below.

## User sign up

### Request

`POST /api/auth/signup/`

curl -X 'POST' 'http://localhost:3000/api/auth/signup' -H 'accept: _/_' -H 'Content-Type: application/json' -d '{
"email": "email@email.om",
"password": "password",
"username": "password",
"firstName": "John",
"lastName": "Doe",
"preferences": []
}'

### Response

    HTTP/1.1 201 Created
    access-control-allow-origin: \*
    connection: keep-alive
    content-length: 226
    content-type: application/json; charset=utf-8
    date: Sat,09 Apr 2022 23:30:28 GMT
    etag: W/"e2-AKdGUJUHt3E/8lz7sAze3m4mXSQ"
    keep-alive: timeout=5
    x-powered-by: Express

    {
    "data": {
        "id": 2,
        "firstName": "John",
        "lastName": "Doe",
        "username": "password",
        "email": "email@email.om",
        "password": "$argon2i$v=19$m=4096,t=3, p=1$yI7Upj0Tfvgz6RqufsZ1tw$yTAqnhTQiMeYChzrLLSF2wYEADZwS1ijeFkPaA/rRuQ",
        "preferences": []
        }
    }

## User sign in

### Request

`POST /api/auth/signin/`

    curl -X 'POST' 'http://localhost:3000/api/auth/signin' -H 'accept: _/_' -H 'Content-Type: application/json' -d '{
    "email": "email@email.om",
    "password": "password"
    }'

### Response

    HTTP/1.1 201 Created
    access-control-allow-origin: \*
    connection: keep-alive
    content-length: 226
    content-type: application/json; charset=utf-8
    date: Sat,09 Apr 2022 23:30:28 GMT
    etag: W/"e2-AKdGUJUHt3E/8lz7sAze3m4mXSQ"
    keep-alive: timeout=5
    x-powered-by: Express

    {

    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiZW1haWxAZW1haWwub20iLCJpYXQiOjE2NDk1NDcyMzAsImV4cCI6MTY0OTU4MzIzMH0.pfLUe_wkZY0WiCdrVnWCtCMsY5KhejmYI4Df-pqPKag"
    }

# Marketplace userflow

## Get Proposal

![Get Proposal](./get-proposals.png)

## Create Exchange Request

![Create Exchange Request](./create-exchange-request.png)
