# create-react-app with a Node server on Heroku

## Deploy to Heroku

```bash
heroku create
git push heroku master
```

## Local Development

### Run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

### Run Only the Client

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```
