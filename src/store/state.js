import { getLocalStore } from '../utils/storage'
export default {
  userInfo: getLocalStore('user-info') || {},
  userBirth: getLocalStore('user-birth') || '',
  userAddress: getLocalStore('user-address') || []
}
