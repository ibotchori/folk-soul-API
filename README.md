## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/ibotchori/folk-soul-API.git
cd folk-soul-API
```

```bash
npm install
```

### To start the express server, run the following

Open `.env` and inject your credentials so it looks like this

```
NODE_ENV=development
SERVER_PORT=4000
MONGO_URI=<MONGO_URI>
JWT_SECRET=<JWT_SECRET>
```

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) and take a look around.
