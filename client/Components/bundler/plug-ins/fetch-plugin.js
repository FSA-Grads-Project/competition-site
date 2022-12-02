import axios from 'axios';
// localForage makes working w/ indexedDB a lot simpler. We are using indexedDB to cache information (for instance, if a user imports react, we only make the request for and import react once as it is a big file) for performance gains, similar to how something like localStorage would be used.
import localForage from 'localforage';
  
  const fileCache = localForage.createInstance({
    // name for db we want to create
    name: 'filecache'
  });
  
  // loads up file returned from onResolve
  // if esload finds any import/requre/export statements during the onLoad process then esbuild will repeat onResolve / onLoad steps

  export const fetchPlugin = (inputCode) => {
    return {
      name: 'fetch-plugin',
      setup(build) {
        build.onLoad({ filter: /(^index\.js$)/ }, () => { 
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        })

      build.onLoad({filter: /.*/}, async (args) => {
           // The code below does the following:
          //// Check to see if we have already fetched this file
          //// and if it is in the cache
          const cachedResult = await fileCache.getItem(args.path)
          //// if it is, return it immediately
          if (cachedResult) {
            return cachedResult;
          }
      });

        build.onLoad({ filter: /.css$/ }, async (args) => {
      
          const { data, request } = await axios.get(args.path);

          // Handle css files
          // downside: cannot handle advanced css (images, font files, @import statements) -> Can only handle simple css
          // ensures that css files are not returned if there is a single quote somewhere in the file
          const escaped = data
            .replace(/\n/g, '')
            .replace('\\"')
            .replace(/'/g, "\\'");

          const contents = 
            `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
            ` 

          const result = {
            loader: 'jsx',
            contents,
          // request.responseURL = in the event that we are fetching data re: import/require statement, we can use request/resolveDir to determine last url from unpkg. For example, if we do not do this, we relyon the name of the pkg to resolve the url, but what if the file we require is found in url is <nameofpackage>/src/? Without resolveDir, we wouldn't have access to the /src folder in which our file exists.
            resolveDir: new URL('./', request.responseURL).pathname
          }
          //// store response in cache
          await fileCache.setItem(args.path, result);
          return result
    })

      build.onLoad({ filter: /.*/ }, async (args) => {
    
        const { data, request } = await axios.get(args.path);

        const result = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }
        await fileCache.setItem(args.path, result);
        return result

    })
  }}
};