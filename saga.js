const { createStore, applyMiddleware } = require('redux');
const createSagaMiddleware = require('redux-saga').default;
const { all, put, takeEvery } = require('redux-saga/effects');

const middleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(middleware));
middleware.run(rootSaga);

console.log('main: dispatching PING');
store.dispatch({ type: 'PING' });

function reducer(state = {}, action) {
  console.log('reducer got ' + action.type);
}

function* rootSaga() {
  yield all([takeEvery('PING', ping), takeEvery('PONG', pong)]);
}

function* ping() {
  console.log('ping: putting PONG');
  yield put({ type: 'PONG' });
  console.log('ping: putted PONG');
}

function* pong() {
  console.log('in pong');
}
