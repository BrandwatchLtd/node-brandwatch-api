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

function buildRequest(apiHost, apiPort, method, options, requestOptions, callback){
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
    sendOptions.uri = url.format({
        protocol: 'http',
        hostname: apiHost,
        port: apiPort,
        pathname: uri
    });
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
    this.apiHost = options.apiHost;
    this.apiPort = options.apiPort;

    this.requestOptions = requestOptions;
}

['get', 'post', 'put', 'patch', 'del'].forEach(function(method){
    BrandwatchAPI.prototype[method] = function(options, callback){
        return buildRequest(this.apiHost, this.apiPort, method, options, this.requestOptions, callback);
    };
});

module.exports = {
    BrandwatchAPI: BrandwatchAPI
};
