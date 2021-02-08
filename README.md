# crusader

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Firebase

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.2.3/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.2.3/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

npm install -g firebase-tools
firebase deploy --only hosting:crusader

# Test!

git config --global user.name "michaeljharrison"
git config --global user.email "michael.j.harrison@outlook.com"
