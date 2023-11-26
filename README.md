# API Nodejs + Cliente js

Api rest con nodejs, express con un cliente con js sin framework.

## Start

To start client server:

```bash
npm run dev:cliente
```

To start server:

```bash
npm run dev:servidor
```

Install the dependencies:

```bash
npm run install
```

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) con libreria [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: usando [jwt](https://jwt.io/)
- **Encriptacion contraseñas**: usando [bcrypt](https://bcrypt-generator.com/)

## API

port: 3000

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /api/login` - login

**User routes**:\
`POST /api/users` - create a user\
`GET /api/users` - create a users\
`GET /api/users/:userId` - get user

## Front

port: 3001

## Dependencies

- **Bootstrap**: [bootstrap](https://getbootstrap.com/)
- **DotEnv**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Cors**: [cors](https://www.npmjs.com/package/cors)
- **Express**: [express](https://expressjs.com/)
- **Bcrypt**: [bcrypt](https://bcrypt-generator.com/)
- **JsonWebToken**: [jwt](https://www.npmjs.com/package/jsonwebtoken)

## Auth

![Refresh Token](./static/jwt-refresh-token-node-js-example-flow.png)

![Node.js Express Architecture with Authentication & Authorization](./static/node-js-mongodb-jwt-authentication-architecture.png)

## Aturization

stateless statefull

http es stateless para convertirlo en statefull

Librerias

Crear una sesion, hacer un token y meterlo en la cookie
