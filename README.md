# NextJS-ContactManager
Front-end built using the NextJS framework and a back-end built using PostgreSQL as the database and Prisma as the query tool.

## Create a new PostgreSQL table
### Link to a server
In .env file, Edit value of DATABASE_URL

### Create a database
Using Prisma CLI : prisma migrate save --name "migration name"

### Improvements
Use a global Prisma Client to avoid creating and disconnecting client in each mutation / query



