# Novastage TypeScript SDK Reference

Complete API reference for the Novastage TypeScript SDK.


## NovastageSDK

### Constructor

```ts
new NovastageSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NovastageSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = NovastageSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `NovastageSDK` instance in test mode.


### Instance Methods

#### `AccountSetting(data?: object)`

Create a new `AccountSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountSettingEntity` instance.

#### `Member(data?: object)`

Create a new `Member` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MemberEntity` instance.

#### `MessageResult(data?: object)`

Create a new `MessageResult` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageResultEntity` instance.

#### `Project(data?: object)`

Create a new `Project` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `NovastageSDK.test()`.

**Returns:** `NovastageSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AccountSettingEntity

```ts
const account_setting = client.AccountSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `profile` | `Record<string, any>` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AccountSetting().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `NovastageSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MemberEntity

```ts
const member = client.Member()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatarUrl` | `string` | No |  |
| `email` | `string` | No |  |
| `fullName` | `string` | No |  |
| `joinedAt` | `string` | No | Human-readable relative time, not an ISO timestamp. |
| `role` | `string` | Yes |  |
| `userId` | `string` | Yes |  |
| `username` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Member().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MemberEntity` instance with the same client and
options.

#### `client()`

Return the parent `NovastageSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageResultEntity

```ts
const message_result = client.MessageResult()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes |  |
| `projectId` | `string` | Yes |  |
| `success` | `boolean` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MessageResult().create({
  message: 'example_message',
  projectId: 'example_projectId',
  success: true,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageResultEntity` instance with the same client and
options.

#### `client()`

Return the parent `NovastageSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEntity

```ts
const project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | Yes |  |
| `inviteCode` | `string` | No |  |
| `maxMembers` | `number` | No |  |
| `memberList` | `any[]` | No |  |
| `members` | `number` | Yes |  |
| `name` | `string` | Yes | Trimmed before the 1-80 character validation. |
| `pendingRequestsCount` | `number` | No |  |
| `role` | `string` | No |  |
| `slug` | `string` | Yes |  |
| `updatedAt` | `string` | Yes | Human-readable text such as Updated just now, not an ISO timestamp. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Project().create({
  id: 'example_id',
  members: 1,
  name: 'example_name',
  slug: 'example_slug',
  updatedAt: 'example_updatedAt',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Project().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `NovastageSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new NovastageSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

