# flip-id.js

[@flip-id](https://github.com/flip-id) api wrapper for Node.js

## How To Use

1. Import the module to your Node.js code

```ts
// ESM
import Flip from 'node-flip-id';

// CommonJS
const Flip = require('node-flip-id');
```

2. Setup your secret key

```ts
Flip.secretKey = ''; // Change this one
```

3. Change the state from `test` to `prod`

```ts
Flip.toSendBox = false; // Change this one
// Set it to be false, mean it will send the request to production such as `/api/v2/` or `/api/v3/`
// Set it to be true, mean it will send the request to test/sendbox such as `/big_sandbox_api/v2/` or `/big_sandbox_api/v3/`
```

4. Call any API base on their end-point version (`v1`/`v2`/`v3`)

```ts
// Get cities from the v1 end-point
const cities = await Flip.v1.general.get.list('cities', '1');

// Get current balance from v2 end-point
const balance = await Flip.v2.general.get.balance();

// Create special disbursement from v3 end-point
const special = await Flip.v3.disbursement.create.special(..., ...);

// Get international exchange rate
const rate = await Flip.v2.international.get.exchangeRate(...);
```
