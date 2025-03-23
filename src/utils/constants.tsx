// import 'dotenv/config'
let apiRoot = ''
// console.log("Import meta env: ", import.meta.env)
// console.log("Process env: ", process.env)
// console.log("Import meta env: ", import.meta.env.API_ROOT)
// console.log("Process env: ", process.env.API_ROOT)
if (process.env.BUILD_MODE === 'dev'){
    apiRoot = import.meta.env.VITE_URL_API
}
if (process.env.BUILD_MODE === 'production'){
    apiRoot = import.meta.env.VITE_URL_API_PRODUCTION
}
console.log('API ROOT: ',apiRoot)
export const API_ROOT = apiRoot