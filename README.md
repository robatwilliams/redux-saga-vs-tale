# redux-saga vs. redux-tale

> Everything is sync-first. This means that "put" or redux dispatch happens immediately. It also means that a saga will run until it hits an async yield meaning that two synchronous running sagas will never interleave. This solves a few problems where using redux-saga you have to work-around sagas essentially making JavaScript multi-threaded. By being sync-first it is easier to predict cause and effect and optimize performance.

But... `put()` is already synchronous in redux-saga. Docs were recently updated to clarify that https://github.com/redux-saga/redux-saga/issues/1921.

Output of `node saga.js` and `node tale.js` is identical:

```
reducer got @@redux/INIT5.w.z.l.0.p
main: dispatching PING
reducer got PING
ping: putting PONG
reducer got PONG
in pong
ping: putted PONG
```

That appears to be two synchronous running sagas interleaving, and puts happening immediately.

Seems that it used to be that `put()` was non-blocking and there was a `put.sync()` that was blocking: https://github.com/redux-saga/redux-saga/issues/626
