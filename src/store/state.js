import { getLocalStore } from '../utils/storage'
export default {
  cartList: getLocalStore('cart-list') || [],
  userInfo: getLocalStore('user-info') || {},
  userBirth: getLocalStore('user-birth') || '',
  userAddress: getLocalStore('user-address') || []
}
