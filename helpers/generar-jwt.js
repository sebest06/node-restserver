const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

        return new Promise( (resolve, reject)=> {

            const payload = { uid };

            jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                if( err ) {
                    console.log(err);
                    reject("no se pudo generear token")
                } else {
                    resolve( token );
                }
            })

        })

}

module.exports = {
    generarJWT
}