
// can have multiple onResolve. For example, one onResolve can be for js files and another could be for ts files, which is what the filter expressions are for. Filter expressions are executed against the filetype we are trying to load. Namespace allows for specific filenames to be targeted within that filetype.
// the code below has the ability to bundle nested pkgs (including different versions) + work on 99% of modules except those that are designed to only work within Node.js or require in a css file or font file or something like that 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a'}
      });
      
      // Handle relative path to module or a path containing './' or '../'
      build.onResolve({ filter: /^\.+\// }, (args) => {
        return {
          namespace: 'a',
          path: new URL(
            args.path, 
            'https://unpkg.com' + args.resolveDir + '/'
            ).href
          };
      }) 

      // Handle main file of module
        build.onResolve({ filter: /.*/}, (args)=> {
        return {
          namespace: 'a',
          path: `http://unpkg.com/${args.path}`
        }
        });
      }
  };
};