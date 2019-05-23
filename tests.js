const cameron = require('./prompt')

async function main(){
    var courses = await cameron()
    console.log(courses)
}

main()
