# URL Shortener Client Side API

## Setup

* Clone this repo
* Run `yarn install`

### Interacting with the production API
* By default this application makes calls to the production API, no further action needed. 

### Setting up a local backend API
* Set up the [API repo](https://github.com/cquinones100/url-shortener-api/).
* Navigate to `src/constants.js`
* Change the `API_PATH` to `''`
* Add a proxy to the top level of `pacakge.json`
`"proxy": "http://localhost:3001"`

### Run the local server
* Run `yarn start`
* Navigate to localhost:3000
