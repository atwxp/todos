/**
 * generate 4位 id
 */
exports.gid = function () {
    return 'xxxx'.replace(/x/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    });
};
