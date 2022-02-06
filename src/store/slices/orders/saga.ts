import { IOrder } from 'types'
import createApiRequestActions from 'utils/createApiRequestActions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { Api } from 'api'
import { CreateOrderPayload } from 'api/types'

export const createOrderActions = createApiRequestActions<CreateOrderPayload, IOrder>(
  'CREATE_ORDER',
  (args) => ({
    payload: args.payload,
  })
)

export function* fetchCreateOrder({ payload }: { payload: CreateOrderPayload }) {
  const { start, success, error } = createOrderActions
  yield put(start())

  try {
    const response: IOrder = yield call(Api.createOrder, payload)
    yield put(
      success({
        data: response,
      })
    )
  } catch (err) {
    yield put(error(err))
  }
}

export function* createOrderSaga() {
  yield takeLatest(createOrderActions.init, fetchCreateOrder)
}
