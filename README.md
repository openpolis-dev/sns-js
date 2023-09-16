# SNS JS

SNS JS is the JavaScript API wrapper for (SeeDAO Name Service)[https://github.com/Taoist-Labs/sns].

# Usage

To interactive with SNS contracts, you can use javascript sdk and call in contracts.

## Javascript sdk

### 1. Install

```
$ npm install sns-contracts
```

### 2. Include contracts

* ENSRegistry
* SNSRegistrar
* PublicResolver
* ReverseRegistrar

### 3. How to instance a contract

you can import the contract's typescript type definition and abi, and then use them to create a contract instance and interactive with on-chain contracts using the instance:

```
import { ENSRegistry } from "sns-contracts/lib/contracts/registry";
import { ENSRegistryABI } from "sns-contracts/lib/abi";

const contract: ENSRegistry = new ethers.Contract("0xAb...yZ", ENSRegistryABI, provider) as unknown as ENSRegistry;
```

or, you can create a contract instance use `at(address)` directly and interactive with on-chain contracts using the instance:

```
import { ENSRegistry } from "sns-contracts/lib/contracts/registry";
import { ENSRegistryContract } from "sns-contracts";

const contract: ENSRegistry = ENSRegistryContract.at("0xAb...yZ").connect(provider);
```

or, you can create a contract instance use `at[network]()` with builtin **contract address** from this package:

```
import { ENSRegistry } from "sns-contracts/lib/contracts/registry";
import { ENSRegistryContract } from "sns-contracts";

const contract: ENSRegistry = ENSRegistryContract.atMainnet().connect(provider);
```

### 4. Methods

##### 4.1 Register an SNS name

```
// function signature: `register(name: string, owner: AddressLike, resolver: AddressLike)`
// example: register "yourname.seedao" SNS name
import { PublicResolverLocalhostAddr } from "sns-contracts/lib/deployed";
let tx = await testRegistrar.register("yourname", (await provider.getSigner()).getAddress(), PublicResolverMainnetAddr);
await tx.wait();
```

##### 4.2 Query SNS's info

```
// query SNS's owner
const ownerOfYourname = await registry.owner(ethers.namehash('yourname.seedao'));

// query SNS's resolver
const resolverAddr = await registry.resolver(ethers.namehash('yourname.seedao'));
```

##### 4.3 Save Data to SNS and read it

1. Set mainnet address for SNS. function signature: `setAddr(bytes32 node, address addr)`

```
tx = await publicResolver["setAddr(bytes32,address)"](
    ethers.namehash('yourname.seedao'),
    (await provider.getSigner()).getAddress()
);
await tx.wait();
```

2. Read mainnet address of SNS. function signature: `addr(bytes32 node)`

```
const addr = await publicResolver["addr(bytes32)"](ethers.namehash('yourname.seedao'))
```

3. Query SNS's name from wallet address. function signature: `name(bytes32 node)`

```
await publicResolver.name(await reverseRegistrar.node("0x123"))
```

Use `reverseRegistrar.node(address addr)` to get `node` from wallet address, and then use `publicResolver.name(bytes32 node)` to get SNS's name from `node`.


4. Set text. function signature: `setText(bytes32 node, string key, string value)`

```
tx = await publicResolver.setText(
    ethers.namehash('yourname.seedao'),
    "github",
    "github.com/xx/yy"
  );
  await tx.wait();
```

5. Read text. function signature: `text(bytes32 node, string key)`

```
const github = await publicResolver.text(ethers.namehash('yourname.seedao'), "github")
```

### 3. Other resources

##### 3.1 Contract ABIs

```
import { 
    ENSRegistryABI,
    SNSRegistrarABI,
    ReverseRegistrarABI,
    PublicResolverABI
} from "sns-contracts/lib/abi";
```

##### 3.2 Contract deployed addresses

```
import { 
    ENSRegistryMainnetAddr,
    SNSRegistrarMainnetAddr,
    ReverseRegistrarMainnetAddr,
    PublicResolverMainnetAddr
} from "sns-contracts/lib/deployed";
```

The "Mainnet" suffix means the contract is deployed on mainnet network, for other networks, the suffix will be the network name, e.g. "Ropsten", "Polygon", etc.

## Call in contracts

TODO...

# How to contribute
