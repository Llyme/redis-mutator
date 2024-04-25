WRITE_METHOD_NAMES = [
    # BasicKeyCommands
    "append",
    "bitop",
    "copy",
    "decrby",
    "delete",
    "expire",
    "expireat",
    "getdel",
    "incrby",
    "incrbyfloat",
    "lmove",
    "blmove",
    "mset",
    "msetnx",
    "move",
    "persist",
    "pexpire",
    "pexpireat",
    "psetex",
    "rename",
    "renamenx",
    "restore",
    "set",
    "setbit",
    "setex",
    "setnx",
    "setrange",
    "stralgo",
    "touch",
    # SetCommands
    "sadd",
    "sdiffstore",
    "smove",
    "spop",
    "srem",
    "sunionstore",
    # ListCommands
    "blpop",
    "brpop",
    "brpoplpush",
    "blmpop",
    "lmpop",
    "linsert",
    "lpop",
    "lpush",
    "lpushx",
    "lrange",
    "lrem",
    "lset",
    "ltrim",
    "rpop",
    "rpoplpush",
    "rpush",
    "rpushx",
    "sort",
    "sort_ro",
    # SortedSetCommands
    "zadd",
    "zdiffstore",
    "zincrby",
    "zinterstore",
    "zpopmax",
    "zpopmin",
    "bzpopmax",
    "bzpopmin",
    "zmpop",
    "bzmpop",
    "zrangestore",
    "zrem",
    "zremrangebylex",
    "zremrangebyrank",
    "zremrangebyscore",
    "zunionstore",
    # StreamCommands
    "xack",
    "xadd",
    "xautoclaim",
    "xclaim",
    "xdel",
    "xgroup_create",
    "xgroup_delconsumer",
    "xgroup_destroy",
    "xgroup_createconsumer",
    "xgroup_setid",
    # HashCommands
    "hdel",
    "hincrby",
    "hincrbyfloat",
    "hset",
    "hsetnx",
    "hmset",
]
"""
List of Redis methods that involves writing.
"""

READ_METHOD_NAMES = [
    # BasicKeyCommands
    "bitcount",
    "bitpos",
    "dump",
    "exists",
    "expiretime",
    "get",
    "getex",
    "getbit",
    "getrange",
    "getset",
    "keys",
    "mget",
    "pexpiretime",
    "pttl",
    "hrandfield",
    "randomkey",
    "strlen",
    "substr",
    "ttl",
    "type",
    "lcs",
    # SetCommands
    "scard",
    "sdiff",
    "sinter",
    "sintercard",
    "sismember",
    "smembers",
    "smismember",
    "sunion",
    "srandmember",
    # ListCommands
    "lindex",
    "llen",
    "lpos",
    # SortedSetCommands
    "zcard",
    "zcount",
    "zdiff",
    "zinter",
    "zintercard",
    "zlexcount",
    "zrandmember",
    "zrange",
    "zrevrange",
    "zrangebylex",
    "zrevrangebylex",
    "zrangebyscore",
    "zrevrangebyscore",
    "zrank",
    "zrevrank",
    "zscore",
    "zunion",
    "zmscore",
    # StreamCommands
    "xinfo_consumers",
    "xinfo_groups",
    "xinfo_stream",
    "xlen",
    "xpending",
    "xpending_range",
    "xrange",
    "xread",
    "xreadgroup",
    "xrevrange",
    "xtrim",
    # HashCommands
    "hexists",
    "hget",
    "hgetall",
    "hkeys",
    "hlen",
    "hmget",
    "hvals",
    "hstrlen",
]
"""
List of Redis methods that does not involve writing.
"""
