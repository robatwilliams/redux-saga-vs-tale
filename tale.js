const { createStore, applyMiddleware } = require('redux');
const createTaleMiddleware = require('redux-tale').default;
const { put, takeEvery } = require('redux-tale').effects;

const middleware = createTaleMiddleware();
const store = createStore(reducer, applyMiddleware(middleware));

// equivalent of rootSaga
middleware.run(takeEvery('PING', ping));
middleware.run(takeEvery('PONG', pong));

console.log('main: dispatching PING');
store.dispatch({ type: 'PING' });

function reducer(state = {}, action) {
  console.log('reducer got ' + action.type);
}

function* ping() {
  console.log('ping: putting PONG');
  yield put({ type: 'PONG' });
  console.log('ping: putted PONG');
}

function* pong() {
  console.log('in pong');
}
