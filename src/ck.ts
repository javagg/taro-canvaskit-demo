export async function ckload() {
  let m = await import('@/assets/canvaskit-nofont/canvaskit')
  const CanvasKitInit = m.default
  const kit = CanvasKitInit() // used when canvaskit shipped with flutter, good for h5
  console.log(kit)
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