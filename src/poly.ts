import Taro from '@tarojs/taro';

async function fileExist(path: string) {
    return await new Promise((resolve) => {
        Taro.getFileSystemManager().getFileInfo({
            filePath: path,
            success: () => resolve(true),
            fail: (r) => resolve(false),
        })
    })
};

export async function fetch(url: string, headers) {
    const ASSETS = [
        "/assets/fonts/MaterialIcons-Regular.otf",
        "/assets/fonts/roboto/v32/KFOmCnqEu92Fr1Me4GZLCzYlKw.otf",
        "/assets/fonts/roboto/v32/KFOmCnqEu92Fr1Me4GZLCzYlKw.woff2",
        "/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf",
        "/assets/FontManifest.json"
    ]
    console.log(`Fetch from: ${url} with headers ${JSON.stringify(headers)}`)
    try {
        // if (url.startsWith("/assets/FontManifest.json")) {
        //     const str = JSON.stringify(fontManifest)
        //     const data = new TextEncoder().encode(str)
        //     return {
        //         ok: true,
        //         status: 200,
        //         arrayBuffer: () => data.buffer,
        //         text: async () => str,
        //         body: new ReadableStream({
        //             start(controller) {
        //                 controller.enqueue(data)
        //                 controller.close()
        //             }
        //         }),
        //     };
        // }
        // if (["/assets/canvaskit/canvaskit.wasm", "/assets/canvaskit-nofont/canvaskit.wasm"].includes(url)) {
        //     return {
        //         ok: true,
        //         status: 200,
        //         arrayBuffer: async () => new TextEncoder().encode(`${url}.br`).buffer,
        //     };
        // }
        // if (url.startsWith("file:///") && url.endsWith("/assets/canvaskit/canvaskit.wasm")) {
        //     const wasmPath = "/assets/canvaskit/canvaskit.wasm"
        //     return {
        //         ok: true,
        //         status: 200,
        //         arrayBuffer: async () => new TextEncoder().encode(`${wasmPath}.br`).buffer,
        //     };
        // }
        if (url.startsWith("file:///") && url.endsWith("/assets/canvaskit-nofont/canvaskit.wasm")) {
            const wasmPath = "/assets/canvaskit-nofont/canvaskit.wasm"
            return {
                ok: true,
                status: 200,
                arrayBuffer: async () => new TextEncoder().encode(`${wasmPath}.br`).buffer,
            };
        } 
        if (ASSETS.includes(url)) {
            const fs = Taro.getFileSystemManager();
            const data = (await fileExist(url)) ?  fs.readFileSync(url) : fs.readCompressedFileSync({ filePath: `${url}.br`, compressionAlgorithm: "br" })
            return {
                ok: true,
                status: 200,
                arrayBuffer: async () => data,
                body: new ReadableStream({
                    start(controller) {
                        controller.enqueue(new Uint8Array(data))
                        controller.close()
                    }
                }),
            };
        }  
        throw new Error("can't fetch")
    } catch (e) {
        console.error(e)
        throw new Error(`my fetch error: ${e}`)
    }
}

globalThis.WebAssembly = globalThis.WXWebAssembly;
const orignalInstantiate = globalThis.WXWebAssembly.instantiate
globalThis.WXWebAssembly.instantiate = function(bufferSource, importObject) {
    const path = new TextDecoder().decode(bufferSource)
    console.log(`use wasm from path: ${path}`)
    return orignalInstantiate(path, importObject)
}
export const WebAssembly = globalThis.WXWebAssembly

// export const URL = globalThis.URL