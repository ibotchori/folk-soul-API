# Music Band Page with dashboard

- [API documentation](https://folk-soul-api.ibotchori.space/api-docs/)

- [Production Url](https://folk-soul-api.ibotchori.space)

#

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/ibotchori/folk-soul-API.git
cd folk-soul-API
```

```bash
npm install
```

#

### To start the express server, run the following

Open `.env` and inject your credentials so it looks like this

```
NODE_ENV=development
SERVER_PORT=4000
MONGO_URI=<mongo_uri>
JWT_SECRET=<secret_world>
```

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) and take a look around.


#

### Project Structure

```bash
├─── src      # project source codes
│   ├─── config   # configs
│   ├─── controllers   # middleware functions
│   ├─── middlewares   # auth & error middlewares
|   ├─── models   # models
│   ├─── routes   # routes
|   ├─── schemas   # validations
|   ├─── types   # typescript types
    ├─── server.ts   # main file to run server
├─── uploads      # folder for file upload  
│   ├─── images   # image uploads
- .env.example   # env example
- .eslintrc.json   # eslint config file
- .prettierrc.js   # prettier config file
- babel.config.json   # babel config file
- package-lock.json   # dependency manager configurations
- package.json   # dependency manager configurations
- README.md   # readme file
- tsconfig.json   # typescript configuration

```

#

### Deployment

For deploying app first connect to your server via ssh.

```sh
ssh root@your_server
```

After that create apps folder in

```sh
mkdir apps
```

navigate to this folder and pull code from github:

```sh
git clone https://github.com/ibotchori/folk-soul-API.git
```

after cloning app navigate to that folder and run:

```sh
npm ci
```

to install all necessary packages.

Build server with command:

```sh
npm run build:prod
```

In order to run your app on server like service you need to install pm2 tool:

```sh
sudo npm install pm2 -g
```

after installing just run:

```sh
pm2 start node build/server.js
```

