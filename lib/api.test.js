import { afterEach, beforeEach, describe, it, expect } from "vitest";

var sinon = require('sinon'),
    BrandwatchApi = require('..').BrandwatchAPI,
    request = require('request');

const nextTick = () => new Promise(resolve => process.nextTick(resolve));

describe('brandwatchApi', function(){
    var sandbox = sinon.sandbox.create(),
        requestStartStub;

    beforeEach(function(){
        requestStartStub = sandbox.stub(request.Request.prototype, 'init');
    });
    afterEach(function(){
        sandbox.restore();
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

        it('passes GET method to request on get', async function(){
            brandwatchApi.get('/ping');

            await nextTick();

            expect(requestStartStub.calledOnce).toEqual(true);
            expect(requestStartStub.thisValues[0].method).toEqual('GET');
        });

        it('passes POST method to request on post', async function(){
            brandwatchApi.post('/ping');

            await nextTick();

            expect(requestStartStub.calledOnce).toEqual(true);
            expect(requestStartStub.thisValues[0].method).toEqual('POST');
        });

        it('passes PUT method to request on put', async function(){
            brandwatchApi.put('/ping');

            await nextTick();

            expect(requestStartStub.calledOnce).toEqual(true);
            expect(requestStartStub.thisValues[0].method).toEqual('PUT');
        });

        it('passes PATCH method to request on patch', async function(){
            brandwatchApi.patch('/ping');

            await nextTick();

            expect(requestStartStub.calledOnce).toEqual(true);
            expect(requestStartStub.thisValues[0].method).toEqual('PATCH');
        });

        it('passes DELETE method to request on del', async function(){
            brandwatchApi.del('/ping');

            await nextTick();

            expect(requestStartStub.calledOnce).toEqual(true);
            expect(requestStartStub.thisValues[0].method).toEqual('DELETE');
        });

        it('builds URL from the apiHost and apiPort passed in at creation', async function(){
            brandwatchApi.get('/ping');

            await nextTick();

            expect(requestStartStub.args[0][0].uri).toEqual('http://localhost:9999/ping');
        });

        it('sets Authorization header when auth passed in with options', async function(){
            brandwatchApi.get({url: '/ping', auth: 'Foo'});

            await nextTick();

            expect(requestStartStub.args[0][0].headers.Authorization).toEqual('bearer Foo');
        });

        it('uses auth from requestOptions if none passed in with options', async function(){
            brandwatchApi.get('/ping');

            await nextTick();

            expect(requestStartStub.args[0][0].headers.Authorization).toEqual('bearer abcdef');
        });
    });
});
