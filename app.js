const morgan = require('morgan')
const express = require('express')
const app = express()
const views = require('./views')
const {db} = require('./models') ///destructured
const routesUsers =require('./routes/users');
const routesWiki = require('./routes/wiki');

app.use(morgan("dev"))
app.use(express.static(__dirname))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/wiki', routesWiki);
app.use('/users', routesUsers);
db.authenticate()
    .then(()=>{
        console.log('connected to the database')
    })
    app.get('/', (req, res, next)=>{
        res.redirect('/wiki');

    })


/*app.get("/", (req,res,next)=>{
    // res.send(`<h1>Hello World</h1>`)
    res.send(views.main())
})
*/

async function init(){
    try{
        await db.sync({force:false})
        app.listen(1337, () => {
            console.log(`App listening in port 1337`);
        });

    }
    catch(err){
        console.log(err)
    }
}

init()

