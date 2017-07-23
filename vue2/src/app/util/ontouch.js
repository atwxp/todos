/**
 * ontouch
 *
 * @param {HTMLElement}     touchsurface           要绑定事件的容器
 * @param {Object}          ctx                    函数的上下文
 * @param {Object}          options                配置
 * @property {number}       options.threshold      最小滑动距离
 * @property {number}       options.restraint      垂直方向最大滑动距离
 * @property {number}       options.allowedTime    允许的滑动时间
 * @property {boolean}      options.disableScroll  是否禁用滚动, 阻止系统滚动发生
 */

 export default function ontouch(touchsurface, ctx, options) {
        let dir
        let startX
        let startY
        let startTime

        let distX
        let distY

        let threshold = options && options.threshold || 50
        let restraint = options && options.restraint || 100
        let allowedTime = options && options.allowedTime || 250

        touchsurface.addEventListener('touchstart', function (e) {
            const touchobj = e.touches[0]

            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = +new Date()

            ctx.fire('touchstart', e)
        }, false)

        touchsurface.addEventListener('touchmove', function (e) {
            // ensure swiping with one touch and not pinching
            if (e.touches.length > 1 || e.scale && e.scale !== 1) {
                return
            }

            if (options && options.disableScroll) {
                e.preventDefault()
            }

            const touchobj = e.touches[0]

            distX = touchobj.pageX - startX
            distY = touchobj.pageY - startY

            if (Math.abs(distX) > Math.abs(distY)) {
                dir = distX < 0 ? 'left' : 'right'
                ctx.fire('move', e, dir, distX)
            }
            else {
                dir = distY < 0 ? 'up' : 'down'
                ctx.fire('move', e, dir, distY)
            }
        }, false)

        touchsurface.addEventListener('touchend', function (e) {
            ctx.fire('touchend')

            if (+new Date() - startTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    ctx.fire('swipe' + dir, e, distX);
                }
                else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                    ctx.fire('swipe' + dir, e, distY)
                }
                else {
                    ctx.fire('release', e, (dir === 'left' || dir === 'right') ? distX : distY)
                }
            }
            else {
                ctx.fire('release', e, (dir === 'left' || dir === 'right') ? distX : distY)
            }
        }, false)
}
