# flip-id.js

[@flip-id](https://github.com/flip-id) api wrapper for Node.js

## How To Use

1. Import the module to your Node.js code

```ts
// ESM
import Flip from 'flip-id.js';

// CommonJS
const Flip = require('flip-id.js');
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
