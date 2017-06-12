## React Boilerplate

### Setup

Make sure your NPM and Node versions are up to date.

```bash
cp .env.shadow .env # initialize environment configuration
brew install yarn # make sure you have yarn
yarn install # installs all package.json dependencies
npm start # starts dev server
```

### Development

#### Adding new dependencies
To add a new dependency:

```
yarn add {dependency}
```

Then, be sure to add/commit the yarn.lock file.

#### Tasks

* `npm start` runs local development server at localhost:8080
* `npm test` to run the linter and unit tests
* `npm run lint` to run only the linter
* `npm run test:unit` to run only the unit tests
* `npm run watch` to run unit tests every time a change is saved
* `npm run bundle` bundles all application js into build/bundle.js

Note: to see all available tasks, run `npm run`.

#### Using ows-grass as microservice proxy

```bash
cd webserver
docker-compose build
cd ../
yarn install
npm run bundle
docker-compose up
echo $DOCKER_HOST
```

### Notes
* You only need to build the Docker one time, it will always mount the volume
  and allow you to perform live edits.
* To get the IP of your Docker: `echo $DOCKER_HOST`.

### Questions

- Why do I need Docker? You need to run Docker because it allows you to have
  access to our microservice proxy. The Docker sets up an nginx proxy on `/api/`.
  Thus, your javascript application can call this url instead of calling a
  remote server, and introducing CORS issues.

- How do I test if Grass is accessible? Just go to `/api/hello/`. If it does
  not work, it's likely you're not on the VPN.

#### Internationalization

Support for Internationalization is done using [react-intl](https://github.com/yahoo/react-intl)
and you can find an example in [hello-world](/theorchard/docs/blob/master/boilerplates/react-webpack/src/components/example/hello-world.js).

Run the build to create the components and generate the list of strings:
```
$ npm run webpack
```

Prepare and export the strings to POEditor:
```
$ export POEDITOR_PROJECT_ID=<project_id>
$ export API_KEY=<api_key>
$ npm run i18n:export
```

Download the latest version of all the strings:
```
$ export POEDITOR_PROJECT_ID=<project_id>
$ export API_KEY=<api_key>
$ npm run i18n:import
```

All the above:
```
$ npm run i18n
```

To create the localized bundles (bundles that have both the right locale code)
and translation messages:

```
$ npm run build
```

If you wish to add support for a new locale, add in `/locale/` the following
folder structure: `<locale>/LC_MESSAGES/` and create in it a `messages.json` file.
 Note: the `<locale>` has to match the value in POEditor.

So if you wish to add French (`fr`), it will look like this:

```
$ cat react-webpack/locale/fr/LC_MESSAGES/message.json
{}
```
