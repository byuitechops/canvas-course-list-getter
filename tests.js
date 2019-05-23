const cameron = require('./prompt')
const configs = require('./config')

console.log(
    "\n"+
    "       __|__\n"+
    "--@--@--(_)--@--@--\n") 
console.log(configs.defaults.filters)
console.log(
    "\n"+
    "       __|__\n"+
    "--@--@--(_)--@--@--\n") 

async function main(){
    var courses = await cameron()
}

main()
