# Voxgig Mini Task 1 — NovaStage SDK

## Overview

I used Voxgig to generate a TypeScript SDK for NovaStage, my own application. The SDK covers five operations: reading account settings, listing projects, creating a project, listing project members, and deleting a project.

## Setup

I worked on Windows using PowerShell. Scaffolding and dependency installation worked, but generation failed because `@tabnas/multisource@0.5.8` handled Windows paths incorrectly.

The file I changed was:

```text
novastage-sdk\.sdk\node_modules\@tabnas\multisource\dist\resolver\file.js
```

I replaced the original line 64:

```js
const P = null != ctx.meta?.fs ? Path.posix : Path;
```

with these two lines, now at lines 64 and 65:

```js
const sourcePath = ctx.meta?.multisource?.path ?? popts.path ?? "";
const P = null != ctx.meta?.fs && !/^[A-Za-z]:[\\/]/.test(sourcePath) ? Path.posix : Path;
```

This adds a check for Windows drive paths before choosing how to resolve the path. Generation completed successfully after the change. This local fix may need to be reapplied after reinstalling dependencies.

## Testing

The SDK built successfully. The generated test suite reported 225 passed, 12 skipped, and no failures. The skipped tests covered optional features that were not included.

I also tested all five operations against the live application. The test created a temporary project, checked its owner membership, deleted it, and confirmed that my existing projects remained.

Missing authentication returned HTTP 401. Invalid project names and project IDs returned HTTP 400. The SDK exposed these errors correctly.

## Feedback

The SDK worked for the five operations I tested, but I found two issues with the generated types and documentation.

**Creation types.** The API only requires a name to create a project:

```ts
await client.Project().create({ name: 'My project' })
```

However, the generated `ProjectCreateData` type also requires `id`, `members`, `slug`, and `updatedAt`. TypeScript rejects the request when these fields are missing, even though the server normally provides them after creating the project. The input type should match what the API requires, so creating a project with just its name works without a type error.

**README logging example.** The README shows how to print a message before a request, which is useful for checking what the SDK is doing. It places the logging callback inside `hooks`:

```ts
const logger = {
  hooks: {
    PreRequest: () => console.log('Sending request'),
  },
}

const client = new NovastageSDK({ extend: [logger] })
```

The SDK looks for `logger.PreRequest` directly, so it never finds the callback inside `hooks` and no message is printed. The example should match the format the SDK accepts, so someone following the README can use it without checking the implementation first.
