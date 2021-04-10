import { getLocalStore } from '../utils/storage'
export default {
  cart: getLocalStore('cart') || [],
  userInfo: getLocalStore('user-info') || {},
  userBirth: getLocalStore('user-birth') || '',
  userAddress: getLocalStore('user-address') || []
}
