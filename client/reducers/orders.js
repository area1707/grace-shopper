import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const load = orders => ({type: GET_ORDERS, orders})

export default orderReducer = function(state = [], action){
  switch(action.type){
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}

export function fetchOrders() {
  return function thunk (dispatch) {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        dispatch(load(orders))
      })
  }
}