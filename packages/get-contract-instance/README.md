# @drizzle-utils/get-contract-instance

Retrieves a Web3.js [contract instance](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html).

You can pass in a contract artifact JSON generated by Truffle (i.e. `truffle compile` and `truffle migrate`), or you can pass in the contract ABI and address.

A warning will let you know if a deployed address is not supplied, to suppress the warning, pass in `suppressWarnings: true` into the options object.

## Usage

Import the helper function:

```js
import getContractInstance from "@drizzle-utils/get-contract-instance";
```

### With Truffle artifact

```js
import SimpleStorage from "./SimpleStorage.json";

const instance = await getContractInstance({
  web3,
  artifact: SimpleStorage,
});
```

### With ABI and contract address

```js
const instance = await getContractInstance({
  web3,
  abi: contractAbi,
  address: "0x..."
});
```

### With ABI only

```js
const instance = await getContractInstance({
  web3,
  abi: contractAbi,
});
```

Note that this instance will not have a contract address attached to it.