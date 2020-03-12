/**
 *  项目配置信息
 */
//  开发环境域名
const DOMAIN_DEV = ''

// 生产环境域名
const DOMAIN_PROD = ''

// 判断环境
const IS_DEV = process.env.NODE_ENV === 'development'

// 接口域名
export const DOMAIN = IS_DEV ? DOMAIN_DEV : DOMAIN_PROD

// 基本配置
export const CONFIG = {
  // 接口
  intf: {
  }

}
