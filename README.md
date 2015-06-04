node-brandwatch-api
===================

Really, really simple NodeJS wrapper for the Brandwatch API that wraps [request](https://github.com/request/request).

## Usage

```javascript
var BrandwatchAPI = require('brandwatch-api').BrandwatchAPI,
    api = new BrandwatchAPI({apiHost: 'newapi.brandwatch.com', apiPort: 80}, {
        auth: access_token
    });
    
// "api" is a wrapped request object
api.get('/user', function(err, res, body){
});
```

As the module is just a wrapper around [request](https://github.com/request/request) the API is the same

## Contributing

Contributions accepted - please just ensure you have unit tests, update documentation, and adhere to the linting rules 

