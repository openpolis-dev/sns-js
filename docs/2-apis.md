#### 1.1 Resolve one addr from sns

```typescript
const addr: string = await sns.resolve("abc.seedao")
```

#### 1.2 Resolve one sns from addr

```typescript
const sns: string = await sns.name("0x123...789")
```

#### 2.1 Batch resolve addr from sns

```typescript
const addrArr: string[] = await sns.resolves(["abc.seedao", "def.seedao"]);
```

#### 2.2 Batch resolve sns from addr

```typescript
const snsArr: string[] = await sns.names(["0x123...789", "0x456...654"]);
```
