node-brandwatch-api
===================

Simple Node.js client for the Brandwatch API, built with Axios. Requires Node.js 24 or newer.

## Usage

```javascript
const { BrandwatchAPI } = require('brandwatch-api');

const api = new BrandwatchAPI({ apiUrl: 'https://api.brandwatch.com' }, {
    auth: accessToken
});

(async () => {
    const response = await api.get('/user');
    console.log(response.data);
})();
```

Methods `get`, `post`, `put`, `patch`, and `del` return Axios promises. Read response content from `response.data`. Non-2xx responses reject with an Axios error.

Request options use Axios configuration. The `auth` option sets a bearer token. `query` and `body` are supported as aliases for Axios `params` and `data`. The legacy `apiHost` and `apiPort` constructor options remain supported; prefer `apiUrl`.

## Migrating to 1.0.0

Version 1.0.0 requires Node.js 24 or newer and replaces the callback-based `request` API with Axios promises. Update calls to use `async`/`await` or promise handlers, and read the response body from `response.data`:

```javascript
async function loadUser() {
    try {
        const response = await api.get('/user');
        console.log(response.data);
    } catch (error) {
        // Axios rejects the promise for network errors and non-2xx responses.
        console.error(error.response?.status, error.response?.data);
    }
}
```

The HTTP methods and `del` alias remain available. Constructor-level bearer auth and the legacy `apiHost`/`apiPort` options also remain supported. Request options can use Axios `params` and `data`; the `query` and `body` aliases are retained. Axios response metadata is available on the returned response object, while its payload is in `data`.

## Releasing

After changes merge to `master`, run **Version and publish Node package** from the GitHub Actions tab. Choose `major`, `minor`, or `patch`. The shared semantic-version action updates `package.json` and `package-lock.json`, commits the version, and creates a matching tag. The workflow then publishes the package from that tag and creates a GitHub Release. Choose `major` for the first 1.0.0 release from the current 0.4.0 version.

## Contributing

Run `npm test` to lint, compile TypeScript, and run tests with Node's built-in test runner.
