'use strict';
var url = require('url'),
    debug = require('debug')('brandwatch-api'),
    _ = require('underscore'),
    axios = require('axios').create({
        timeout: 240 * 1000
    });

function buildRequest(apiUrl, apiUrlParts, method, options, requestOptions, callback){
    var uri = options.url || options.uri,
        sendOptions = {};

    requestOptions = requestOptions || {};

    if(typeof options === 'string'){
        uri = options;
        options = {
            url: uri
        };
    }

    sendOptions = _.defaults(options, requestOptions);

    sendOptions.method = (method === 'del' ? 'delete' : method).toUpperCase();

    if (apiUrl !== undefined) {
        sendOptions.url = url.resolve(apiUrl, uri);
    } else {
        console.warn('Deprecated api, use apiUrl instead of apiHost and apiPort');
        sendOptions.url = url.format({
            protocol: 'http',
            hostname: apiUrlParts.apiHost,
            port: apiUrlParts.apiPort,
            pathname: uri
        });
    }

    debug('Making request to brandwatchApi', sendOptions.method, sendOptions.url, sendOptions.query || {}, sendOptions.auth);

    if(sendOptions.auth){
        sendOptions.headers = sendOptions.headers || {};
        sendOptions.headers.Authorization = 'bearer ' + sendOptions.auth;
        delete sendOptions.auth;
    }

    return axios(sendOptions)
        .then(function(response) {
            response.statusCode = response.status;

            return callback(null, response, response.data);
        })
        .catch(function(err) {
            err.response = err.response || {};
            err.response.statusCode = err.response.status;

            return callback(err, err.response);
        });
}

function BrandwatchAPI(options, requestOptions){
    this.apiUrl = options.apiUrl;
    this.apiHost = options.apiHost;
    this.apiPort = options.apiPort;

    this.requestOptions = requestOptions;
}

['get', 'post', 'put', 'patch', 'del'].forEach(function(method){
    BrandwatchAPI.prototype[method] = function(options, callback){
        var apiUrlParts = { apiHost: this.apiHost, apiPort: this.apiPort };
        return buildRequest(this.apiUrl, apiUrlParts, method, options, this.requestOptions, callback);
    };
});

module.exports = {
    BrandwatchAPI: BrandwatchAPI
};
