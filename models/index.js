const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack')

    const Page = db.define('page',{
        title: {type: Sequelize.STRING, allowNull: false}, //look into notNUll
        slug: {type: Sequelize.STRING, allowNull: false},
        content: {type: Sequelize.STRING, allowNull: false},
        status: {type: Sequelize.ENUM('open','closed'), default: 'closed'}, //trying default
    })

    const User = db.define('user',{
        name: {type: Sequelize.STRING, allowNull: false},
        email: {type: Sequelize.STRING, allowNull: false, validate:{isEmail: true}},
    })


module.exports = {
    db,
    Page,
    User
}