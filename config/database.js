let mongoose = require('mongoose')

let connectdb = async () => {
    await mongoose.connect(process.env.mongo_url).then(() => console.log(`connected to db`)).catch(() => console.log(`failed to connect to db`))
}

module.exports = connectdb