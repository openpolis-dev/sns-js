#### 1.1 Resolve one addr from sns

```typescript
const addr: string = await sns.resolve("abc.seedao")
```

If the `SNS` is not registered, it will return `0x0000000000000000000000000000000000000000` (Zero Address).

#### 1.2 Resolve one sns from addr

```typescript
const sns: string = await sns.name("0x123...789")
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
