
# Product Management API
## Task:
The candidate will develop a Product Management API to handle product data and provide
role-based access control. The API will allow users to create, update, view, and delete products,
with different levels of permissions for different user roles.

##### Task Overview:

- Create a Product Management API with the following features:
	- User Roles: Admin, Manager, and Client.
	- Products: Each product contains a name, description, price, category, and stock quantity.
	- Categories: Categories organize products and contain a name and description.
	- User Management: Admins can create and manage users, assign roles, and delete users.
	- Product Management:
		- Admins can create, update, and delete products and categories.
		- Managers can create and update products and categories.
		- Clients can only view products and categories.

## Used tools

* [ExpressJs](https://expressjs.com/): Node JS Framework
* [Mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For authentication and securing routes
* [Joi (for express)](https://www.npmjs.com/package/express-joi-validation): A middleware for validating express inputs
* [TypeScript](https://www.npmjs.com/package/typescript): A language for application-scale JavaScript
* [Jest](https://www.npmjs.com/package/jest) & [Supertest](https://www.npmjs.com/package/supertest): Testing utility to test units.

## Requirements
* NodeJs >= 18

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sys31337/product-management-api
   ```
2. Installing dependencies (Using **Yarn**)
   ```sh
   yarn
   ```
3. Copy `.env.example` to `.env`
4.

## Environment file
`PORT`: The port where the server will serve

`DATABASEURI`: The Database connection string

`CORS_FRONTEND_DOMAINS`: List of cors to allow

`ACCESS_TOKEN_SECRET`: A token to sign `accessTokens` with

`REFRESH_TOKEN_SECRET`: A token to sign `refreshTokens` with, should be different and unique


## Scripts

1. To start the dev server
   ```sh
   yarn dev
   ```
2. Build
   ```sh
   yarn build
   ```
3. Lint using `estlint`, to check for problems and syntax errors
   ```sh
   yarn lint
   ```
4. Run tests:
   ```sh
   yarn test
   ```
5. Serve on production
   ```sh
   yarn serve
   ```
