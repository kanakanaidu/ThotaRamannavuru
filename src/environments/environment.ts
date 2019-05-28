// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  config: {
    apiKey: "AIzaSyCzy7YXs1OOGPpz9dSvxnDoILju1gIpGpo",
    authDomain: "tvdauth.firebaseapp.com",
    databaseURL: "https://tvdauth.firebaseio.com",
    projectId: "tvdauth",
    storageBucket: "tvdauth.appspot.com",
    messagingSenderId: "611481470485",
    appId: "1:611481470485:web:d8bd04c416ca0dce"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
