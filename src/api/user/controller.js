const jwt = require("jsonwebtoken");
const { register, login } = require('./query');
const crypto = require('crypto');

/** 해당 id의 회원정보를 */
exports.info = (ctx, next) => {
    let id = ctx.params.id;
    ctx.body = `${id} 회원에 대한 정보`;
}

// 회원가입 처리 모듈
exports.register = async (ctx, next) => {
    let  { email, password, name } = ctx.request.body;
    let result = await crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512');

    let { affectedRows } = await register(email, result.toString('base64'), name);

    /**
     * 서비스 오류로 둘 이상이 영향받을 수도 있음
     * 그래서 `== 1` 이 아닌 `> 0`을 사용
     */
    if(affectedRows > 0) {
        let token = await generateToken({ name, id: insertId });
        ctx.body = token;
    } else {
        ctx.body = {result: "fail"};
    }
}

// 로그인 모듈
exports.login = async (ctx, next) => {
    let { email, password } = ctx.request.body;
    let result = await crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512');

    let item = await this.login(email, result.toString('base64'));

    if(item == null) {
        ctx.body = { result: "fail" };
    } else {
        let token = await  generateToken({ name: item.name, id: item.id });
        ctx.body = token;
    }
}

/**
 * jwt 토큰 생성
 * @param {object} payload 
 * @returns {string} jwt 토큰 string
 */
let generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.APP_KEY, (error, token) => {
            if(error) { reject(error); }
            resolve(token);
        })
    })
}