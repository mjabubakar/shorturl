# SHORTURL
A Node/Express app for shortening URLs.
#### Installation
1. Clone project 
`git clone https://github.com/mjabubakar/shorturl`
2. cd into folder
`cd ./shorturl/`
3. Download dependencies
`npm install`
4. Connect your project with Postgres Database
5. Run migrations
`npx sequlize db:migrate`

#### Usage
Start server from your root folder using `npm start`
#### Environmental Variables
* ` PORT ` determines which port the server is listening on.
* ` DB_HOST ` Postgres database host.
* ` DB_NAME ` Postgres database name.
* ` DB_USERNAME ` Postgres role.
* ` DB_PASSWORD ` Postgres password.
* ` NODE_ENV ` determines environment (production or development).
* ` ACCESS_TOKEN_SECRET ` JWT encryption secret for user login.