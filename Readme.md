## Tech Stack

- Node.js
- GraphQL
- MySQL

## Run locally

- Clone the repo
- `npm install`
- Setup a `.env` file at the root of the repo
- `npm run dev`
- GraphQL endpoint will be http://localhost:PORT/graphql

## Notes

- Contents of `.env` file

```env
PORT=8080
NODE_ENV = development
READ_DB_HOST = localhost
READ_DB_USER = root
READ_DB_PASSWORD = password
READ_DB_NAME = awesome_products
READ_DB_PORT = 3306
READ_DB_CONNECTION_LIMIT = 10
WRITE_DB_HOST = localhost
WRITE_DB_USER = root
WRITE_DB_PASSWORD = password
WRITE_DB_NAME = awesome_products
WRITE_DB_PORT = 3306
WRITE_DB_CONNECTION_LIMIT = 10
```

- Use the `SQL` file located in `database` folder to create the database
