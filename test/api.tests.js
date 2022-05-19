'use strict';
var sinon = require('sinon'),
    BrandwatchApi = require('..').BrandwatchAPI,
    request = require('request');

describe('brandwatchApi', function(){
    var sandbox = sinon.sandbox.create(),
        requestStartStub;

    beforeEach(function(){
        requestStartStub = sandbox.stub(request.Request.prototype, 'init');
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
        it('passes GET method to request on get', function(done){
            brandwatchApi.get('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('GET');

                done();
            });
        });
        it('passes POST method to request on post', function(done){
            brandwatchApi.post('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('POST');

                done();
            });
        });
        it('passes PUT method to request on put', function(done){
            brandwatchApi.put('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('PUT');

                done();
            });
        });
        it('passes PATCH method to request on patch', function(done){
            brandwatchApi.patch('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('PATCH');

                done();
            });
        });
        it('passes DELETE method to request on del', function(done){
            brandwatchApi.del('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('DELETE');

                done();
            });
        });
        it('builds URL from the apiHost and apiPort passed in at creation', function(done){
            brandwatchApi.get('/ping');

            process.nextTick(function(){
                expect(requestStartStub.args[0][0].uri).toEqual('http://localhost:9999/ping');

                done();
            });
        });
        it('sets Authorization header when auth passed in with options', function(done){
            brandwatchApi.get({url: '/ping', auth: 'Foo'});

            process.nextTick(function(){
                expect(requestStartStub.args[0][0].headers.Authorization).toEqual('bearer Foo');

                done();
            });
        });
        it('uses auth from requestOptions if none passed in with options', function(done){
            brandwatchApi.get('/ping');

            process.nextTick(function(){
                expect(requestStartStub.args[0][0].headers.Authorization).toEqual('bearer abcdef');

                done();
            });
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
        it('passes GET method to request on get', function(done){
            brandwatchApi.get('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('GET');

                done();
            });
        });
        it('passes POST method to request on post', function(done){
            brandwatchApi.post('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('POST');

                done();
            });
        });
        it('passes PUT method to request on put', function(done){
            brandwatchApi.put('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('PUT');

                done();
            });
        });
        it('passes PATCH method to request on patch', function(done){
            brandwatchApi.patch('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('PATCH');

                done();
            });
        });
        it('passes DELETE method to request on del', function(done){
            brandwatchApi.del('/ping');

            process.nextTick(function(){
                expect(requestStartStub.calledOnce).toEqual(true);
                expect(requestStartStub.thisValues[0].method).toEqual('DELETE');

                done();
            });
        });
        it('builds URL from the apiHost and apiPort passed in at creation', function(done){
            brandwatchApi.get('/ping');

            process.nextTick(function(){
                expect(requestStartStub.args[0][0].uri).toEqual('http://localhost:9999/ping');

                done();
            });
        });
        it('sets Authorization header when auth passed in with options', function(done){
            brandwatchApi.get({url: '/ping', auth: 'Foo'});

            process.nextTick(function(){
                expect(requestStartStub.args[0][0].headers.Authorization).toEqual('bearer Foo');

                done();
            });
        });
        it('uses auth from requestOptions if none passed in with options', function(done){
            brandwatchApi.get('/ping');

            process.nextTick(function(){
                expect(requestStartStub.args[0][0].headers.Authorization).toEqual('bearer abcdef');

                done();
            });
        });
    });
});
