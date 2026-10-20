'use strict';

const assert = require('node:assert/strict');
const { after, before, describe, it } = require('node:test');
const { createServer } = require('node:http');
const { BrandwatchAPI } = require('..');

let server;
let baseUrl;
let lastRequest;

before(async () => {
    server = createServer((request, response) => {
        const chunks = [];
        request.on('data', (chunk) => chunks.push(chunk));
        request.on('end', () => {
            lastRequest = {
                body: Buffer.concat(chunks).toString(),
                headers: request.headers,
                method: request.method,
                url: request.url
            };
            response.statusCode = request.url.startsWith('/failure') ? 400 : 200;
            response.setHeader('content-type', 'application/json');
            response.end(JSON.stringify({ ok: response.statusCode === 200 }));
        });
    });

    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

describe('BrandwatchAPI', () => {
    it('supports the HTTP methods and del alias', async () => {
        const api = new BrandwatchAPI({ apiUrl: baseUrl });

        for (const [method, path] of [
            ['get', '/get'],
            ['post', '/post'],
            ['put', '/put'],
            ['patch', '/patch'],
            ['del', '/delete']
        ]) {
            const response = await api[method](path);
            assert.equal(response.status, 200);
            assert.equal(lastRequest.method, method === 'del' ? 'DELETE' : method.toUpperCase());
            assert.equal(lastRequest.url, path);
        }
    });

    it('returns Axios response data and maps query, body, and bearer auth', async () => {
        const api = new BrandwatchAPI({ apiUrl: baseUrl }, {
            auth: 'default-token',
            params: { region: 'us' },
            timeout: 1000
        });

        const response = await api.post({
            uri: '/items',
            auth: 'request-token',
            query: { page: 2 },
            body: { name: 'example' }
        });

        assert.deepEqual(response.data, { ok: true });
        assert.equal(lastRequest.url, '/items?region=us&page=2');
        assert.equal(lastRequest.headers.authorization, 'bearer request-token');
        assert.deepEqual(JSON.parse(lastRequest.body), { name: 'example' });
    });

    it('rejects non-2xx responses with Axios error details', async () => {
        const api = new BrandwatchAPI({ apiUrl: baseUrl });

        await assert.rejects(api.get('/failure'), (error) => {
            assert.equal(error.response.status, 400);
            assert.deepEqual(error.response.data, { ok: false });
            return true;
        });
    });

    it('supports the legacy apiHost and apiPort URL options', async () => {
        const api = new BrandwatchAPI({
            apiHost: '127.0.0.1',
            apiPort: server.address().port
        });
        const originalWarn = console.warn;
        console.warn = () => {};

        try {
            await api.get('/legacy');
        } finally {
            console.warn = originalWarn;
        }

        assert.equal(lastRequest.url, '/legacy');
    });
});
