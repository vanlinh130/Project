const  expressJwt = require('express-jwt')
const config = require('../config');

// để kiểm tra người dùng đã đăng nhập hay chưa nếu đăng nhập thì gữi các token tới server
function authJwt() {
    const secret = config.SECRET;
    const api = config.API;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/accounts/login`,
            // `${api}/accounts`
        ]
    })
}

// ktr người dùng có quyền sử dụng quyền đó ko
async function isRevoked(req, payload, done) {
    done();
}

module.exports = authJwt;