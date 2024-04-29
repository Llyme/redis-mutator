# Redis Mutator
[GitHub](https://github.com/Llyme/redis-mutator/tree/javascript)

Inject another Redis connection to your Redis connection!

# Installation
```sh
npm install redis-mutator
```

# Uses
1. Separate read-only functions to another Redis connection.
2. Log functions as you use them.

# How to Use
```js
import { mutate, READ_METHOD_NAMES } from 'redis-mutator';
import { Redis } from 'ioredis';

const redis = new Redis(...);
const readOnlyRedis = new Redis(...);
mutate(redis, READ_METHOD_NAMES).use(readOnlyRedis);

(async _ => {
    await redis.sadd("hello", "world!"); // Uses `redis`.
    await redis.smembers("hello"); // Uses `read_only_redis`.
})();
```

## Specify Method Names
```js
import { mutate } from 'redis-mutator';
import { Redis } from 'ioredis';

const redis = new Redis(...);
const myOtherRedis = new Redis(...);

mutate(redis, "sadd", "spop").use(myOtherRedis);

(async _ => {
    await redis.sadd("hello", "world!"); // Uses `my_other_redis`.
    await redis.spop("hello", 1); // Uses `my_other_redis`.

    await redis.hset("hello", "world", "hi"); // Uses `redis`.
    await redis.hget("hello", "world"); // Uses `redis`.
})();
```

## Prefix & Postfix Hooks
```js
import { mutate } from 'redis-mutator';
import { Redis } from 'ioredis';

const redis = new Redis(...);

function prefix(name, args) {
    console.log('Prefix called.');
}

function postfix(value, name, args) {
    console.log('Postfix called.');
}


mutate(redis, "sadd", "spop").prefix(prefix);
mutate(redis, "sadd", "spop").postfix(postfix);

(async _ => {
    await redis.sadd("hello", "world!");
    // Prefix called.
    // `redis.sadd(...)`
    // Postfix called.
})();
```

## Override Methods
```js
import { mutate } from 'redis-mutator';
import { Redis } from 'ioredis';

const redis = new Redis(...);
const myOtherRedis = new Redis(...);

function prefix(name, args) {
    console.log('Hi-jacked!');

    return false; // Return `false` to stop the process.
}

mutate(redis, "sadd", "spop").prefix(prefix)

(async _ => {
    await redis.sadd("hello", "world!") // Hi-jacked!
})();
```