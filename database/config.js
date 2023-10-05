const mongoose = require('mongoose');

const dbConnection = async() => {

    try{
        //mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.MONGODB, {
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });
       
        console.log('base de datos on');

    }catch(err){
        console.log(err);
        throw new Error('Error base de datos');
    }

}

module.exports = {
    dbConnection
}