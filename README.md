# stack

Stack is a template that I use for writing web apps.

It is not meant to be installed from npm, so use ```degit``` to fetch the latest code and create a new scaffold.

## Stack details

- Express for http[s].
- React for UI
- Redux for UI state.
- Babel 7 & Webpack for front-end packaging and back-end ES* support.
- PostgreSQL database.
- Redis for sessions.
- StandardJS
- Mocha for unit & api testing.
- Minimui for React form components.

## Usage

- To create a new project called foo ```foo```:

```
$ npm i -g degit
$ degit bjnortier/stack foo
```

- Edit package.json to the new project name, git repo etc.
- Create a ```dev``` and ```api``` database in Postgres using ```createdb```, e.g. ```createdb foo_dev && createdb foo_api```.
- Create .dev-env and .api-env (replace db names, ports and secret with your own values). E.g.:

```
cat > .dev-env
export PORT=3107
export SESSION_SECRET=ff12
export DATABASE_URL=postgres://:@localhost/dev_foo
```

```
cat > .api-env
export PORT=3108
export SESSION_SECRET=b301a
export DATABASE_URL=postgres://:@localhost/api_foo
```

Install dependencies:

```
$ npm i
```

Create the database tables:

```
$ psql dev_foo
```

Paste the contents of ```db/create_tables_v2.sql``` into the console.

## Test

Run the unit and api tests:

```
$ npm test
```

## Run the app in dev mode
