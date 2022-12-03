import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plug-ins/unpkg-path-plugin';
import { fetchPlugin } from './plug-ins/fetch-plugin';

export default async ( rawCode ) => {

    // .build attempts to bundle user-created code, using the plugin if necessary
    // note: in order to handle/bundle imports (like React for example), esBuild wants to look at our file system but we are not utilizing a filesystem because we are trying to bundle w/in the browser, so we need to create a workaround
    // workaround: we will fetch the files from npm/unpkg ourselves then feed them back to esbuild
    // note: cannot reach out to npm directly because of CORS error
    try {

    const result = await esbuild
      .build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        define: {
          'process.env.NODE_ENV': '"production"',
           global: 'window'
        }
      });

      return {
        code: result.outputFiles[0].text,
        err: ''
      }
    } catch(err){
      return {
        code: '',
        err: err.message
      }
    }

}