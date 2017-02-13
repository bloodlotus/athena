/**
 * Created by FanTaSyLin on 2017/2/7
 */
(function () {

    "use strict";

    var _ = require("lodash");
    var moment = require("moment");
    var ContentSharingSchema = require("./../modules/contentsharing-schema.js");
    var ParamProviderError = require("./../errors/ParamProviderError.js");
    var DBOptionError = require("./../errors/DBOptionError.js");

    module.exports = function (server, BASEPATH) {

        /**
         * @typedef attachments 附件
         * @property {string} name 附件名称 
         * @property {string} type 附件类型
         * @property {string} description 附件描述
         * @property {string} url 链接
         */

        /**
         * @description 提交新的分享内容
         * @param {string} body.authorID - 作者账号 (必须)
         * @param {string} body.authorName - 作者姓名 (必须)
         * @param {string} body.title - 内容标题 (必须)
         * @param {string} body.content - 内容 (必须)
         * @param {attachments[]} body.attachments - 附件 
         * @param {string[]} body.tags - 标签
         * @param {string[]} body.range - 可见范围
         */
        server.post({
            path: BASEPATH + "/sharing/newcontent",
            version: "0.0.1",
        }, _submitNewContent);
        
        /**
         * @description 获取分享列表
         * @param {string} authorid 作者账号
         * @param {string} rangetype 可见范围
         * @param {string} params 以空格分割 (if rangetype=project params=projectids; if rangetype=department params=departmentNames; if rangetype=global or rangetype=private params 无效)
         * @param {string} tags 标签 (以空格分割)
         */
        server.get({
            path: BASEPATH + "/sharing/list",
            version: "0.0.1",
        }, _getContentList);

    }

    function _getContentList(req, res, next) {
        var condition = {};
        if (!_.isUndefined(req.params.authorid)) {
            condition.authorID = req.params.authorid;    
        }
        if (!_.isUndefined(req.params.rangetype)) {
            
        }
    }

    function _submitNewContent(req, res, next) {

        if (_.isUndefined(res.body)) {
            return next(new ParamProviderError(415, {
                message: "body is undefined"
            }));
        }
        try {
            var contentSchema = new ContentSharingSchema();
            contentSchema.submitInit(res.body);
            contentSchema.save(function (err) {
                if (err) {
                    return next(new DBOptionError(415, err));
                } else {
                    res.end();
                }
            });
        } catch (err) {
            return next(err);
        }

    }

})