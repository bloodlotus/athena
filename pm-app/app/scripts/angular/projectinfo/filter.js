/**
 * Created by FanTaSyLin on 2016/9/29.
 */

(function () {

    'use strict';

    var app = angular.module('ProjectInfo');

    /**
     *
     */
    app.filter('to_trusted', toTrusted);

    /**
     * 截断字符串
     */
    app.filter('substring_str', substring_str);

    toTrusted.$inject = ['$sce'];

    function toTrusted($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }

    function substring_str() {

        return function (str, subNum) {
            if (str === undefined) {
                return;
            }
            if (str.length > subNum) {
                return str.substring(0, subNum) + "...";
            } else {
                return str;
            }
        }
    }
})();