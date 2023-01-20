/** 전체 피드 보기 */
// e.g. http://localhost:3000/api/feed?color=blue&size=XL

/**
 * id       auto inscrease
 * user_id
 * file_id
 * content
 * updated_at
 * created_at
 */

const { isNewFeed } = require('../../common/formatter/date');
const { qindex, qstore, qshow, qupdate, qdelete } = require('./query');

exports.index = async (ctx, next) => {
    let { id } = ctx.request.body;
    let feedDate = await this.qindex(id);
    let result = isNewFeed(`${feedDate}`);
    console.log(`새 글인가요 :  ${result}`);
    ctx.body = query;
}

/** 새 피드 작성 처리 */
exports.store = async (ctx, next) => {
    let { id, file_id, content }  = ctx.request.body;
    let created_at = moment()
    let result = await this.qstore(id, file_id, content, created_at);
    ctx.body = `피드작성 : ${result}`;    
}

/** 피드 상세 보기 */
exports.show = async (ctx, next) => {
    let { id } = ctx.params;
    let result = await this.qshow(id);
    ctx.body = `피드상세 : ${result}`;
}

/** 피드 수정 */
exports.update = async (ctx, next) => {
    let { file_id, content, id }= ctx.request;
    let updated_at = moment();
    let result = await this.qupdate(file_id, content, updated_at, id);
    ctx.body = `피드 수정 : ${result}`;
}

/** 피드 삭제 */
exports.delete = async (ctx, next) => {
    let { id } = ctx.params;
    let result = await this.qdelete(id);
    ctx.body = `${id} 피드 수정`;
}