#Describe the bug
When building large projects on vercel/netlify sveltekit builds fails due to exceeding build memory allocations.

I believe this issue is related to vite/esbuild - kit maintainers if you feel I should post the issue elsewhere please let me know but I thought it would be best to make the issue known here first.

##Context

We have migrated our codebase to sveltekit a long time ago and have been loving it. In the last few months I created a branch to upgrade our core svelte packages to the latest versions. Everything worked locally but I kept running into vague esbuild errors with every deploy to Vercel. After experimenting with many different sveltekit, esbuild and vite configs I could not get our project to build successfully on Vercel. I deployed the same code to Netlify and got a memory heap allocation error which narrowed down the cause of the issue.

##Problem

I believe the issue is that during the building/bundling esbuild is transforming too many files in parallel and holding too much in memory which results in a javascript heap allocation error.

This error is easily reproducible and I have provided an example repo below which is a fork of sveltejs/realworld. I have simply cloned the src/routes/article folder 2000 times to inflate the build. This causes a build heap error on my local machine and in Vercel. If you lower the number of cloned folders 1000 builds it will build successfully on Vercel.

In our production codebase we are at a point where this error occurs only on Vercel and is blocking us from upgrading. Obviously it is not an option for us to remove routes / components from our project so if we wish to upgrade sveltekit we are forced to consider other bespoke deployment options.

For reference I know Vercel provides 8GB of memory per build.

##Solution
Not sure if its possible to implement some kind of progressive build strategy to combat these large builds or perhaps this issue is originating from some internal bug within esbuild package.

##Reproduction
https://github.com/Axeldeblen/realworld-big-build

run npm run build locally and deploy to vercl/netlify using default configs

remove 1000 folders and commit to trigger another deploy, it should build successfully on those platforms I have done this in this PR - Axeldeblen/realworld-big-build#1

##Logs
local build failure
```
<--- Last few GCs --->

[60557:0x104905000]   199087 ms: Scavenge (reduce) 4058.9 (4101.9) -> 4058.4 (4101.9) MB, 5.8 / 0.0 ms  (average mu = 0.167, current mu = 0.052) allocation failure
[60557:0x104905000]   199106 ms: Scavenge (reduce) 4060.0 (4099.6) -> 4059.4 (4100.6) MB, 5.1 / 0.0 ms  (average mu = 0.167, current mu = 0.052) allocation failure
[60557:0x104905000]   199127 ms: Scavenge (reduce) 4061.0 (4100.6) -> 4060.5 (4101.6) MB, 7.3 / 0.0 ms  (average mu = 0.167, current mu = 0.052) allocation failure


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
vercel build failure

vite v2.9.6 building SSR bundle for production...
> The service was stopped
    at /vercel/path0/node_modules/esbuild/lib/main.js:1335:25
    at /vercel/path0/node_modules/esbuild/lib/main.js:666:9
    at Socket.afterClose (/vercel/path0/node_modules/esbuild/lib/main.js:644:7)
    at Socket.emit (events.js:412:35)
    at endReadableNT (internal/streams/readable.js:1334:12)
    at processTicksAndRejections (internal/process/task_queues.js:82:21)
Error: Command "npm run build" exited with 1
```
netlify
```
<--- Last few GCs --->
2:48:31 PM: [1460:0x4632bd0]   194829 ms: Scavenge (reduce) 2042.0 (2050.5) -> 2041.2 (2051.5) MB, 13.5 / 0.0 ms  (average mu = 0.258, current mu = 0.264) allocation failure
2:48:31 PM: [1460:0x4632bd0]   194841 ms: Scavenge (reduce) 2042.1 (2050.5) -> 2041.2 (2051.5) MB, 6.8 / 0.0 ms  (average mu = 0.258, current mu = 0.264) allocation failure
2:48:31 PM: [1460:0x4632bd0]   194855 ms: Scavenge (reduce) 2042.1 (2050.5) -> 2041.2 (2051.7) MB, 4.9 / 0.0 ms  (average mu = 0.258, current mu = 0.264) allocation failure
2:48:31 PM: <--- JS stacktrace --->
2:48:31 PM: FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
2:48:31 PM:  1: 0xa3aaf0 node::Abort() [node]
2:48:31 PM:  2: 0x970199 node::FatalError(char const*, char const*) [node]
2:48:31 PM:  3: 0xbba45e v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
2:48:31 PM:  4: 0xbba7d7 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
2:48:31 PM:  5: 0xd769e5  [node]
2:48:31 PM:  6: 0xd7756f  [node]
2:48:31 PM:  7: 0xd853ab v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [node]
2:48:31 PM:  8: 0xd88f6c v8::internal::Heap::AllocateRawWithRetryOrFailSlowPath(int, v8::internal::AllocationType, v8::internal::AllocationOrigin, v8::internal::AllocationAlignment) [node]
2:48:31 PM:  9: 0xd4e73d v8::internal::Factory::AllocateRaw(int, v8::internal::AllocationType, v8::internal::AllocationAlignment) [node]
2:48:31 PM: 10: 0xd4a999 v8::internal::FactoryBase<v8::internal::Factory>::AllocateRawArray(int, v8::internal::AllocationType) [node]
2:48:31 PM: 11: 0xd4aa54 v8::internal::FactoryBase<v8::internal::Factory>::NewFixedArrayWithFiller(v8::internal::Handle<v8::internal::Map>, int, v8::internal::Handle<v8::internal::Oddball>, v8::internal::AllocationType) [node]
2:48:31 PM: 12: 0xf914fb v8::internal::OrderedHashTable<v8::internal::OrderedHashSet, 1>::Allocate(v8::internal::Isolate*, int, v8::internal::AllocationType) [node]
2:48:31 PM: 13: 0xf9168f v8::internal::OrderedHashTable<v8::internal::OrderedHashSet, 1>::Rehash(v8::internal::Isolate*, v8::internal::Handle<v8::internal::OrderedHashSet>, int) [node]
2:48:31 PM: 14: 0x1083568 v8::internal::Runtime_SetGrow(int, unsigned long*, v8::internal::Isolate*) [node]
2:48:31 PM: 15: 0x1448e19  [node]
2:48:32 PM: Aborted (core dumped)
2:48:32 PM: npm ERR! code ELIFECYCLE
2:48:32 PM: npm ERR! errno 134
2:48:32 PM: npm ERR! realworld.svelte.dev@1.0.1-next.0 build: `svelte-kit build --verbose`
2:48:32 PM: npm ERR! Exit status 134
2:48:32 PM: npm ERR!
2:48:32 PM: npm ERR! Failed at the realworld.svelte.dev@1.0.1-next.0 build script.
2:48:32 PM: npm ERR! This is probably not a problem with npm. There is likely additional logging outpu
System Info
System:
    OS: macOS 11.5.2
    CPU: (12) x64 Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
    Memory: 367.55 MB / 16.00 GB
    Shell: 5.8 - /bin/zsh
  Binaries:
    Node: 14.17.3 - ~/.nvm/versions/node/v14.17.3/bin/node
    Yarn: 1.22.17 - /usr/local/bin/yarn
    npm: 8.1.3 - ~/.nvm/versions/node/v14.17.3/bin/npm
  Browsers:
    Brave Browser: 101.1.38.109
    Chrome: 100.0.4896.127
    Firefox: 99.0.1
    Safari: 14.1.2
  npmPackages:
    @sveltejs/adapter-netlify: next => 1.0.0-next.56
    @sveltejs/adapter-vercel: next => 1.0.0-next.50
    @sveltejs/kit: 1.0.0-next.216 => 1.0.0-next.324
    svelte: ^3.42.1 => 3.47.0
```
##Severity
blocking an upgrade


Below this line is the README from the sveltekit demo
---------------------------------------------------

# ![RealWorld Example App](logo.png)

> ### [Svelte](https://github.com/sveltejs/svelte) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://realworld.svelte.dev)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with SvelteKit including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


## Running locally

```bash
npm install
npm run dev
```

...then open [localhost:3000](http://localhost:3000). To build and start in prod mode:

```bash
npm run build
npm run preview
```
