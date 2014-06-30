node-brandwatch-api
===================

NodeJS wrapper around the Brandwatch API

## Usage

```
var BrandwatchApi = require('brandwatch-api').BrandwatchApi,
    api = new BrandwatchApi({apiHost: 'newapi.brandwatch.com', apiPost: 80}, {
        auth: access_token
    });
    
// "api" is a wrapped request object
api.get('/me', function(err, res, body){
});
```

The module is just a wrapper around [Request](https://github.com/mikeal/request) so the rest of the API is the same
