# GITHUB README READER

## Live

[Live app](https://gr3.demarsh.dev/)

## Requirements

- NodeJS 10.16 / LTS (12.13).

## Usage

### Install dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start
```

- Open http://localhost:8080 to view it in the browser.

### Compiles and minifies for production

```
npm run build
```
- Find the minified code in ./build folder.

### Project Structure:

- **public/** assets folder for the app.
- **src/** main source code folder.
  - **build/** folder for minified source code (npm run build).
  - **config/** configuration directory.
  - **components/** reusable component directory.
  - **pages/** list of pages.
  - **services/** third party services.
  - **router.js** main app router.
  - **App.vue** main app entry.
  - **index.js** main app vue instance and global imports.
- **webpack.config.js/** webpack configuration file.

## Things to note

- The application is using personal access token with rate limit of 5000 GET (non-search API) requests and 30 GET (search API) requests per hour.
- Partial search keyword has to be complete partial e.g **gaear** will suggest **gaear**on, **gaear**az, etc. but **gaearol** won't suggest **gaearon**.


## Changelog
- Add BaseInput component that emits an input event and use the component in homepage's search form.
- Loading is now Loader and has simple animation.
- Error now thrown as an error object.
- All conditional rendering that uses 2 or more property are now using instance computed property.
- Use vue.min.js on production build
