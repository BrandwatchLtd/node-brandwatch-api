import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";

const { BrandwatchAPI } = require('..');
const request = require('request');

const nextTick = () => new Promise(resolve => process.nextTick(resolve));

describe('brandwatchApi', () => {
    let requestStartStub;

    beforeEach(() => {
        requestStartStub = vi.spyOn(request.Request.prototype, 'init').mockImplementation(() =>{});
    });

    describe('using the apiUrl param', function () {
        var brandwatchApi;

        beforeEach(() => {
            brandwatchApi = new BrandwatchAPI({
                apiUrl: 'http://localhost:9999'
            }, {
                auth: 'abcdef'
            });
        });

        it('Has get, post, put, patch and del methods', () => {
            expect(brandwatchApi.get).toBeDefined();
            expect(brandwatchApi.post).toBeDefined();
            expect(brandwatchApi.put).toBeDefined();
            expect(brandwatchApi.patch).toBeDefined();
            expect(brandwatchApi.del).toBeDefined();
        });

        it('passes GET method to request on get', async () => {
            brandwatchApi.get('/ping');

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledOnce();
            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET' }));
        });

        it('passes POST method to request on post', async () => {
            brandwatchApi.post('/ping');

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledOnce();
            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ method: 'POST' }));
        });

        it('passes PUT method to request on put', async () => {
            brandwatchApi.put('/ping');

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledOnce();
            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ method: 'PUT' }));
        });

        it('passes PATCH method to request on patch', async () => {
            brandwatchApi.patch('/ping');

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledOnce();
            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ method: 'PATCH' }));
        });

        it('passes DELETE method to request on del', async () => {
            brandwatchApi.del('/ping');

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledOnce();
            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ method: 'DELETE' }));
        });

        it('builds URL from the apiHost and apiPort passed in at creation', async () => {
            brandwatchApi.get('/ping');

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ uri: 'http://localhost:9999/ping' }));
        });

        it('sets Authorization header when auth passed in with options', async () => {
            brandwatchApi.get({url: '/ping', auth: 'Foo'});

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'bearer Foo' }) }));
        });

        it('uses auth from requestOptions if none passed in with options', async () => {
            brandwatchApi.get('/ping');

            await nextTick();

            expect(requestStartStub).toHaveBeenCalledWith(expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'bearer abcdef' }) }));
        });
    });
});
