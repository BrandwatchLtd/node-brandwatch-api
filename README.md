node-brandwatch-api
===================

NodeJS wrapper around the Brandwatch API

## Usage

```javascript
var BrandwatchAPI = require('brandwatch-api').BrandwatchAPI,
    api = new BrandwatchAPI({apiHost: 'newapi.brandwatch.com', apiPort: 80}, {
        auth: access_token
    });
    
// "api" is a wrapped request object
api.get('/me', function(err, res, body){
});
```

The module is just a wrapper around [Request](https://github.com/mikeal/request) so the rest of the API is the same
