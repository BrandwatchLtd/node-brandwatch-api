'use strict';
var sinon = require('sinon'),
    proxyquire = require('proxyquire').noCallThru();

describe('brandwatchApi', function(){
    var sandbox = sinon.sandbox.create(),
        axiosStub,
        BrandwatchApi;

    beforeEach(function(){
        axiosStub = sandbox.stub().returns(Promise.resolve());
        BrandwatchApi = proxyquire('../lib/api.js', {
            'axios': {
                create: () => axiosStub
            }
        }).BrandwatchAPI;
    });
    afterEach(function(){
        sandbox.restore();
    });

    describe('using the old apiHost and apiPort params', function () {
        var brandwatchApi;

        beforeEach(function(){
            brandwatchApi = new BrandwatchApi({
                apiHost: 'localhost',
                apiPort: 9999
            }, {
                auth: 'abcdef'
            });
        });

        it('Has get, post, put, patch and del methods', function(){
            expect(brandwatchApi.get).toBeDefined();
            expect(brandwatchApi.post).toBeDefined();
            expect(brandwatchApi.put).toBeDefined();
            expect(brandwatchApi.patch).toBeDefined();
            expect(brandwatchApi.del).toBeDefined();
        });
        it('passes GET method to request on get', function(){
            brandwatchApi.get('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('GET');
        });
        it('passes POST method to request on post', function(){
            brandwatchApi.post('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('POST');
        });
        it('passes PUT method to request on put', function(){
            brandwatchApi.put('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('PUT');
        });
        it('passes PATCH method to request on patch', function(){
            brandwatchApi.patch('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('PATCH');
        });
        it('passes DELETE method to request on del', function(){
            brandwatchApi.del('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('DELETE');
        });
        it('builds URL from the apiHost and apiPort passed in at creation', function(){
            brandwatchApi.get('/ping');

            expect(axiosStub.args[0][0].url).toEqual('http://localhost:9999/ping');
        });
        it('sets Authorization header when auth passed in with options', function(){
            brandwatchApi.get({url: '/ping', auth: 'Foo'});

            expect(axiosStub.args[0][0].headers.Authorization).toEqual('bearer Foo');
        });
        it('uses auth from requestOptions if none passed in with options', function(){
            brandwatchApi.get('/ping');

            expect(axiosStub.args[0][0].headers.Authorization).toEqual('bearer abcdef');
        });
    });

    describe('using the apiUrl param', function () {
        var brandwatchApi;

        beforeEach(function(){
            brandwatchApi = new BrandwatchApi({
                apiUrl: 'http://localhost:9999'
            }, {
                auth: 'abcdef'
            });
        });
        it('Has get, post, put, patch and del methods', function(){
            expect(brandwatchApi.get).toBeDefined();
            expect(brandwatchApi.post).toBeDefined();
            expect(brandwatchApi.put).toBeDefined();
            expect(brandwatchApi.patch).toBeDefined();
            expect(brandwatchApi.del).toBeDefined();
        });
        it('passes GET method to request on get', function(){
            brandwatchApi.get('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('GET');
        });
        it('passes POST method to request on post', function(){
            brandwatchApi.post('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('POST');
        });
        it('passes PUT method to request on put', function(){
            brandwatchApi.put('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('PUT');
        });
        it('passes PATCH method to request on patch', function(){
            brandwatchApi.patch('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('PATCH');
        });
        it('passes DELETE method to request on del', function(){
            brandwatchApi.del('/ping');

            expect(axiosStub.calledOnce).toEqual(true);
            expect(axiosStub.args[0][0].method).toEqual('DELETE');
        });
        it('builds URL from the apiHost and apiPort passed in at creation', function(){
            brandwatchApi.get('/ping');

            expect(axiosStub.args[0][0].url).toEqual('http://localhost:9999/ping');
        });
        it('sets Authorization header when auth passed in with options', function(){
            brandwatchApi.get({url: '/ping', auth: 'Foo'});

            expect(axiosStub.args[0][0].headers.Authorization).toEqual('bearer Foo');
        });
        it('uses auth from requestOptions if none passed in with options', function(){
            brandwatchApi.get('/ping');

            expect(axiosStub.args[0][0].headers.Authorization).toEqual('bearer abcdef');
        });
    });
});
