import CanvasKitInit from '@/assets/canvaskit-nofont/canvaskit'
import { window } from '@tarojs/runtime'
export async function ckload() {
  // let m = await import('!@/assets/canvaskit-nofont/canvaskit')
  let wasm_dir =  "/assets/canvaskit-nofont"

  // const CanvasKitInit = m.default
  // const kit = await CanvasKitInit({ locateFile: (file) => `${wasm_dir}/${file}` })
  // const kit = await CanvasKitInit() // used when canvaskit shipped with flutter, good for h5
   const kit = CanvasKitInit() // used when canvaskit shipped with flutter, good for h5

  // if (process.env.TARO_ENV !== 'h5') {
  //   const oldGetWebGLContext = kit.GetWebGLContext
  //   kit.GetWebGLContext = function (canvas, attrs) {
  //     const t = attrs.majorVersion > 1 ? "webgl2" : "webgl"
  //     const can = canvas[`taro-canvas-${t}`]
  //     return oldGetWebGLContext(can, attrs)
  //   }
  // }
  // window.flutterCanvasKit = kit
  // window.flutterCanvasKitLoaded = await Promise.resolve(kit)
  console.log("ck loaded")
  // if (process.env.TARO_APP_NOFONT === 'true') {
  //   // install(kit, 1)
  //   install(kit, 1, [], {})
  // }
}