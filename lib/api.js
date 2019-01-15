'use strict';
var url = require('url'),
    debug = require('debug')('brandwatch-api'),
    _ = require('underscore'),
    request = require('request').defaults({
        encoding: 'utf8',
        jar: false,
        timeout: 240 * 1000,
        json: true
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
        sendOptions.uri = url.resolve(apiUrl, uri);
    } else {
        console.warn('Deprecated api, use apiUrl instead of apiHost and apiPort');
        sendOptions.uri = url.format({
            protocol: 'http',
            hostname: apiUrlParts.apiHost,
            port: apiUrlParts.apiPort,
            pathname: uri
        });
    }

    delete sendOptions.url;

    debug('Making request to brandwatchApi', sendOptions.method, sendOptions.uri, sendOptions.query || {}, sendOptions.auth);

    if(sendOptions.auth){
        sendOptions.headers = sendOptions.headers || {};
        sendOptions.headers.Authorization = 'bearer ' + sendOptions.auth;
        delete sendOptions.auth;
    }

    return request(sendOptions, callback);
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
