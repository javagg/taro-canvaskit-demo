
import { ParentProps } from 'solid-js'
import { useLaunch } from '@tarojs/taro'
import { window, document } from '@tarojs/runtime'

import './app.scss'
import { ckload } from './ck'

function App({ children }: ParentProps) {
  useLaunch(async () => {
    console.log('App launched.')
    await ckload()
  })

  // children 是将要会渲染的页面
  return children
}


export default App
