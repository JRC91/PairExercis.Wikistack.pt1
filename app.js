const morgan = require('morgan')
const express = require('express')
const app = express()
const views = require('./views')
const {db} = require('./models') ///destructured

app.use(morgan("dev"))
app.use(express.static(__dirname))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.authenticate()
    .then(()=>{
        console.log('connected to the database')
    })

app.get("/", (req,res,next)=>{
    // res.send(`<h1>Hello World</h1>`)
    res.send(views.main())
})

async function init(){
    try{
        await db.sync({force:true})
        app.listen(1337, () => {
            console.log(`App listening in port 1337`);
        });

    }
    catch(err){
        console.log(err)
    }
}

init()
