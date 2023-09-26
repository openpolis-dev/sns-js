## 2. Instance a contract

You can import the contract's typescript type definition and abi, and then use them to create a contract instance and interactive with on-chain contracts using the instance:

```typescript
import { ENSRegistry } from "sns-contracts/lib/contracts/registry";
import { ENSRegistryABI } from "sns-contracts/lib/abi";

const contract: ENSRegistry = new ethers.Contract("0xAb...yZ", ENSRegistryABI, provider) as unknown as ENSRegistry;
```

Or, you can create a contract instance use `at(address)` directly and interactive with on-chain contracts using the instance:

```typescript
import { ENSRegistry } from "sns-contracts/lib/contracts/registry";
import { ENSRegistryContract } from "sns-contracts";

const contract: ENSRegistry = ENSRegistryContract.at("0xAb...yZ").connect(provider);
```

Or, you can create a contract instance use `at[network]()` with builtin **contract address** from this package:

```typescript
import { ENSRegistry } from "sns-contracts/lib/contracts/registry";
import { ENSRegistryContract } from "sns-contracts";

const contract: ENSRegistry = ENSRegistryContract.atMainnet().connect(provider);
```
