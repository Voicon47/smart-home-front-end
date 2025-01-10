// import 'dotenv/config'
let apiRoot = ''
// console.log("Import meta env: ", import.meta.env)
// console.log("Process env: ", process.env)
// console.log("Import meta env: ", import.meta.env.API_ROOT)
// console.log("Process env: ", process.env.API_ROOT)
if (process.env.BUILD_MODE === 'dev'){
    apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production'){
    apiRoot = 'https://smart-home-back-end.onrender.com'
}
console.log('API ROOT: ',apiRoot)
export const API_ROOT = apiRoot