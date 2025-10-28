'use strict';

const assert = require('assert');

var url = require('url'),
    debug = require('debug')('brandwatch-api'),
    _ = require('underscore'),
    request = require('request').defaults({
        encoding: 'utf8',
        jar: false,
        timeout: 240 * 1000,
        json: true
    });

function buildRequest(apiUrl, method, options, requestOptions, callback){
    let uri = options.url || options.uri

    requestOptions = requestOptions || {};

    if(typeof options === 'string'){
        uri = options;
        options = {
            url: uri
        };
    }

    const sendOptions = _.defaults(options, requestOptions);
    sendOptions.method = (method === 'del' ? 'delete' : method).toUpperCase();
    sendOptions.uri = url.resolve(apiUrl, uri);

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
    assert(options.apiUrl !== undefined, 'apiUrl is required');

    this.apiUrl = options.apiUrl;
    this.requestOptions = requestOptions;
}

['get', 'post', 'put', 'patch', 'del'].forEach(function(method){
    BrandwatchAPI.prototype[method] = function(options, callback){
        return buildRequest(this.apiUrl, method, options, this.requestOptions, callback);
    };
});

module.exports = {
    BrandwatchAPI: BrandwatchAPI
};
