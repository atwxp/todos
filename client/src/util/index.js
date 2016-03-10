/**
 * generate 4位 id
 */
var gid = function () {
    return 'xxxx'.replace(/x/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    });
};

var clone = function (obj) {
    var ret = {};

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                ret[key] = clone(obj[key]);
            }
            else {
                ret[key] = obj[key];
            }
        }
    }

    return ret;
};

var extend = function (target, source, alone) {
    target = alone ? clone(target) : target;

    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }

    return target;
};

var trim = function (str) {
    return str.replace(/^(\s|\u00A0|　)+|(\s|\u00A0|　)+$/g, '');
};

module.exports = {
    gid: gid,
    clone: clone,
    extend: extend,
    trim: trim
};
