
import { CONFIG } from '@/utils/config'
import https from '@/utils/https'

const INTF = CONFIG.intf

// 判断登录
export function login() {
  return https.post(INTF.login)
}
