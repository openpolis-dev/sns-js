# SNS JS

SNS JS is the JavaScript API wrapper for [SeeDAO Name Service](https://github.com/Taoist-Labs/sns).

## Install

#### 1. npm

install:

```shell
$ npm i @seedao/sns-js
```

then, import `sns` from `@seedao/sns-js` package:

```typescript
import sns from "@seedao/sns-js";

// then you can use `sns.Xxx()` to call functions, for example `const n = await sns.resolve("abc.seedao")`
```

#### 2. Browser with `iife` format

```html
<script src="https://cdn.jsdelivr.net/npm/@seedao/sns-js@<VERSION>/dist/iife/index.min.js"></script>
<script>
  // then you can use `sns.Xxx()` to call functions, for example `sns.resolve("abc.seedao").then((n) => { console.log("name: ", n) })`
</script>
```

> Note: `<VERSION>` should be replaced with the version you want to use, for example using `1.0.0`: `https://cdn.jsdelivr.net/npm/@seedao/sns-js@1.0.0/dist/iife/index.min.js`

#### 3. Browser with `esm` format

```html
<script type="module">
  import sns from "https://cdn.jsdelivr.net/npm/@seedao/sns-js@<VERSION>/dist/esm/index.min.js";
  // then you can use `sns.Xxx()` to call functions, for example `const n = await sns.resolve("abc.seedao")`
</script>
```

> Note: `<VERSION>` should be replaced with the version you want to use, for example using `1.0.0`: `https://cdn.jsdelivr.net/npm/@seedao/sns-js@1.0.0/dist/iife/index.min.js`

## APIs

#### 1.1 Resolve one addr from sns

```typescript
const addr: string = await sns.resolve("abc.seedao");
```

If the `SNS` is not registered, it will return `0x0000000000000000000000000000000000000000` (Zero Address).

#### 1.2 Resolve one sns from addr

```typescript
const sns: string = await sns.name("0x123...789");
```

If the address has no `SNS`, it will return `""` (Empty String).

#### 2.1 Batch resolve addr from sns

```typescript
const addrArr: string[] = await sns.resolves(["abc.seedao", "def.seedao"]);
```

If the `SNS` is not registered, it will return `0x0000000000000000000000000000000000000000` (Zero Address).

#### 2.2 Batch resolve sns from addr

```typescript
const snsArr: string[] = await sns.names(["0x123...789", "0x456...654"]);
```
If the address has no `SNS`, it will return `""` (Empty String).
