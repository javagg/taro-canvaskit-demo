export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  subpackages: [
    {
      "root": "canvaskit-nofont",
      "pages": [
        "pages/index",
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
})
