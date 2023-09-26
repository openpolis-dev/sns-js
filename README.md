# SNS JS

SNS JS is the JavaScript API wrapper for [SeeDAO Name Service](https://github.com/Taoist-Labs/sns).

## Install

```shell
$ npm i @seedao/sns-js
```

## APIs

## 1.1 Resolve addr from sns

```typescript
import { sns } from "sns-js";

const addr: string = await sns.resolve("abc.seedao")
```

## 1.2 Resolve sns from addr

```typescript
import { sns } from "sns-js";

const sns: string = await sns.name("0x123...789")
```

## 2.1 Batch resolve addr from sns

```typescript
import { sns } from "sns-js";

const addrArr: string[] = await sns.resolves(["abc.seedao", "def.seedao"]);
```

## 2.2 Batch resolve sns from addr

```typescript
import { sns } from "sns-js";

const snsArr: string[] = await sns.names(["0x123...789", "0x456...654"]);
```
