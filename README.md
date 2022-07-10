# Journey planner

## Getting started

The project is built using React 18 and Node 16.

To set up the project, run:

```
npm install
```

You will also need a Google API key with Maps and Geocoding enabled. Copy the example `.env` file
and add your key to the new file - for example using `nano`:

```
cp .env.example .env
nano .env
```

Once you've added your key, the project can started with:

```
npm start
```

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Hopefully there shouldn't be any lint errors in the console.

## Other scripts

```
npm test
```

Launches the test runner in the interactive watch mode - there's only one test.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

> You probably wouldn't want to deploy this app as your API key will be included in the bundle!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
