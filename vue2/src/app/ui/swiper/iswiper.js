import Emitter from '../../util/emitter'
import ontouch from '../../util/ontouch'
import { throttle } from '../../util/util'

export default class iSwiper extends Emitter {
    /**
     * swiper
     *
     * @param    {Object}         options                 配置
     * @property {DOM}            options.container       轮播列表容器
     * @property {DOM}            options.pagination      指示位置的圈圈
     * @property {boolean}        options.paginableClick  圆圈是否可点击
     * @property {number}         options.cur             当前显示索引
     * @property {boolean|string} options.direction       滑动方向(horizontal, horizontal-reverse, vertical, vertocal-reverse)
     *                                                    默认是 horizontal向左, 值为 false 表示使用 fadeInOut
     * @property {boolean}        options.loop            是否循环播放
     * @property {number}         options.aniTime         动画时间
     * @property {number|string}  options.autoplay        是否自动播放，是的话指定间隔时长，否的话 false
     * @property {number}         options.proportion      滑动的阈值
     * @property {boolean}        options.allowGesture    是否开启手势滑动
     * @property {boolean}        options.initStart       初始化时就开始启动 start(), 指定自动轮播(autoplay=true),会自动开始轮播
     * @property {string}         options.type            预加载元素的类型(querySelector()接受的参数)
     * @property {number}         options.preload         预加载几张图片
     * @property {string}         options.dataSrc         指定图片url的字段, 默认 data-src
     */
    constructor(options) {
        super()

        const defaultOptions = {
            container: null,
            pagination: null,
            paginableClick: false,
            cur: 0,
            direction: 'horizontal',
            loop: false,
            aniTime: 400,
            autoplay: 2000,
            proportion: .3,
            allowGesture: true,
            initStart: true,
            type: '',
            preload: 0,
            dataSrc: 'data-src'
        }

        this._init(Object.assign({}, defaultOptions, options))
    }

    _init(options) {
        this.options = options

        options.allowGesture = ('ontouchstart' in window || window.DocumentTouch
            && document instanceof window.DocumentTouch)
            && options.allowGesture
        
        const container = this.container = options.container

        this.slides = container && container.children

        this.realLen = this.slides && this.slides.length

        // 容器不存在 or 不存在子元素
        if (!container || !this.realLen) {
            return
        }

        // todo 不支持 transition
        // if (!util.featureTest('transition') || this.realLen === 1) {
        //     this.container.classList.add('visible');
        //     return;
        // }

        this.pagination = options.pagination

        this.oldCur = this.cur = options.cur

        this.bindEvents()

        if (options.initStart) {
            this.resize()
        }
    }

    bindEvents() {
        const container = this.container;
        const options = this.options;

        ['transitonend', 'webkitTransitionEnd', 'otransitionend'].forEach(type => {
            container.addEventListener(type, this.transitionEndCallback.bind(this), false)
        })

        // resize or orientationchange
        window.addEventListener('resize', throttle(50, this.resize.bind(this)), false)
        window.addEventListener('orientationchange', throttle(50, this.resize.bind(this)), false)

        this
            .on('pagechange', cur => {
                this.toggleNav(cur)

                // preload img
                if (options.type) {
                    this.preloadImg()
                }
            })
            .on('touchstart', () => {
                this.isScroll = options.allowGesture ? false : void 0
            })
            .on('move', (touchEvt, dir, dist) => {
                if (this.isScroll === void 0) {
                    return
                }

                if (!this.isScroll && (dir === 'left' || dir === 'right')) {
                    this.isScroll = true
                }

                // if user is not trying to scroll vertically, then 防止滚动屏幕
                if (this.isScroll) {
                    touchEvt.preventDefault()

                    this.stop()

                    var cur = this.cur
                    var options = this.options
                    var slidePos = this.slidePos

                    if (options.loop) {
                        this._move(this.circle(cur - 1), slidePos[this.circle(cur - 1)] + dist, 0);

                        this._move(cur, slidePos[cur] + dist, 0);

                        this._move(this.circle(cur + 1), slidePos[this.circle(cur + 1)] + dist, 0);
                    }

                    else {
                        if (
                            (cur === 0 && dir === 'right')
                            || (cur === this.slides.length - 1 && dir === 'left')
                        ) {
                            dist = dist / (Math.abs(dist) / this.width + 1);
                        }

                        this._move(cur - 1, slidePos[cur - 1] + dist, 0);

                        this._move(cur, slidePos[cur] + dist, 0);

                        this._move(cur + 1, slidePos[cur + 1] + dist, 0);
                    }
                }
            })
            .on('releaseBack', () => {
                var width = this.width;
                var cur = this.cur;
                var options = this.options;
                var aniTime = options.aniTime;

                if (!options.loop) {
                    this._move(cur - 1, -width, aniTime)
                    this._move(cur, 0, aniTime)
                    this._move(cur + 1, width, aniTime)
                }
                else {
                    this._move(this.circle(cur - 1), -width, aniTime)
                    this._move(cur, 0, aniTime)
                    this._move(this.circle(cur + 1), width, aniTime)
                }
            })
            .on('swipeleft', () => {
                if (!this.isScroll) {
                    return
                }

                var cur = this.cur;
                var options = this.options;
                var slidePos = this.slidePos;

                // 最后一屏
                if (!options.loop && cur === this.slides.length - 1) {
                    return this.fire('releaseBack')
                }

                if (options.loop) {
                    this._move(this.circle(cur - 1), slidePos[this.circle(cur - 1)], 0)
                }
                else {
                    this._move(cur - 1, slidePos[cur - 1], 0)
                }

                this.next()
            })
            .on('swiperight', () => {
                if (!this.isScroll) {
                    return
                }

                var cur = this.cur;
                var options = this.options;
                var slidePos = this.slidePos;

                // 第一屏
                if (!options.loop && cur === 0) {
                    return this.fire('releaseBack')
                }

                if (options.loop) {
                    this._move(this.circle(cur + 1), slidePos[this.circle(cur + 1)], 0)
                }
                else {
                    this._move(cur + 1, slidePos[cur + 1], 0)
                }

                this.prev()
            })
            .on('release', (touchEvt, dist) => {
                if (!this.isScroll) {
                    return
                }

                // 手指离开屏幕，判断滑动距离是否超过 proportion
                if (Math.abs(dist) >= this.width * this.options.proportion) {
                    this.fire(dist < 0 ? 'swipeleft' : 'swiperight')
                    return
                }

                // 没有的话需要回弹回原始位置, 以及下面的情况
                // 1. 不再 allowedTime 时间内
                // 2. 在 allowedTime 时间内，但是滑动距离没有超过 threshold
                this.fire('releaseBack')

            })

        ontouch(container, this, options)
    }

    update() {
        this.start()

        const options = this.options

        const cur = this.cur

        const width = this.width

        let slidesArray = Array.from(this.slides)

        slidesArray.forEach((slide, index) => {
            slide.setAttribute('data-index', index)
            slide.hasAttribute('data-fake-index') && slide.parentNode.removeChild(slide)
        })

        slidesArray = Array.from(this.slides)

        this.realLen = slidesArray.length

        this.oldOptionLoop = this.oldOptionLoop || options.loop
        this.oldOptionAllowGesture = this.oldOptionAllowGesture || options.allowGesture

        // 只有一张图片 不循环 && 禁止手势
        options.loop = this.realLen === 1 ? false : this.oldOptionLoop
        options.allowGesture = this.realLen === 1 ? false : this.oldOptionAllowGesture

        if (typeof options.direction === 'boolean' && !options.direction) {
            slidesArray.forEach((slide, index) => {
                this._fadeInOut(index, parseInt(index, 10) !== cur ? 0 : 1, 0)
            })
        }
        else {
            // loop && 子元素个数小于三个，无法循环轮播，需要复制已有节点
            if (options.loop && this.realLen === 2) {
                slidesArray.forEach(slide => {
                    const fakeNode = slide.cloneNode(true)
                    fakeNode.setAttribute('data-fake-index', fakeNode.getAttribute('data-index'))
                    this.container.appendChild(fakeNode)
                })
            }

            this.slidePos = new Array(this.slides.length)

            // 以 this.cur 为界, 小于cur的移到-width, 大于cur的移到width
            Array.from(this.slides).forEach((slide, index) => {
                this._translate(index, index < cur ? -width : (index > cur ? width : 0), 0)
            })
            if (options.loop && this.realLen > 1) {
                cur === 0 && this._translate(this.circle(cur - 1), -width, 0)
                cur === this.slides.length - 1 && this._translate(this.circle(cur + 1), width, 0)
            }
        }

        if (this.pagination) {
            this.pagination.innerHTML = this.realLen > 1 ? new Array(this.realLen + 1).join('<i></i>') : ''
            this.toggleNav(cur)
        }
    }

    resize() {
        // getBoundingClientRect(): border + padding + width,
        // 返回top, right, bottom, left, width, heihgt
        const container = this.container
        const rect = container.getBoundingClientRect()

        this.width = rect.width || container.offsetWidth
        this.height = rect.height || container.offsetHeight

        this.update()
    }

    start() {
        const options = this.options

        this.stop()

        if (!options.initStart) {
            options.initStart = true
            this.resize()
        }
 
        if (typeof options.autoplay === 'number' && !this.timer) {
            this.timer = setTimeout(
                this[(options.direction && options.direction === 'horizontal-reverse') ? 'prev' : 'next'].bind(this),
                options.autoplay
            )
        }
    }

    stop() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    toggleNav(cur) {
        if (!this.pagination || this.realLen <= 1) {
            return
        }

        const dots = this.pagination.querySelectorAll('i')

        Array.from(dots).forEach(item => {
            item.classList.remove('active')
        })

        dots[cur % this.realLen].classList.add('active')
    }

    preloadImg() {
        var cur = this.cur
        var imgs = this.slides
        var total = imgs.length

        const options = this.options
        const dataSrc = options.dataSrc

        const me = this;

        const size = {
            w: this.width,
            h: this.height
        }

        const loadImage = function (elem) {
            if (elem.customTotal === undefined) {
                elem.customTotal = 0
            }

            if (!elem.customElem) {
                elem.customElem = elem.querySelectorAll(options.type)
            }
            // load all
            if (elem.customTotal === elem.customElem.length) {
                return
            }

            Array.from(elem.customElem).forEach(image => {
                if (image.lazyload) {
                    return
                }

                const isImageNode = image.nodeName.toLowerCase() === 'img'
                const newImg = isImageNode ? image : new Image()

                const src = image.getAttribute(dataSrc)

                if (src === 'null') {
                    return
                }

                image.lazyload = 'loading'

                newImg.addEventListener('load', function () {
                    if (!isImageNode) {
                        image.style['background-image'] = 'url("' + src + '")';
                    }

                    elem.customTotal++

                    image.lazyload = 'load'

                    me.fire('preload', image, size)
                }, false)

                newImg.addEventListener('error', function () {
                    image.lazyload = null;
                    me.fire('loadError', newImg)
                }, false)

                newImg.src = src;
            });
        };

        var amend = function (num, len) {
            if (num < 0) {
                return 0;
            }

            else if (num >= len) {
                return len - 1;
            }

            return num;
        };

        loadImage(imgs[amend(cur, total)]);

        for (var i = 1; i <= options.preload; i++) {
            loadImage(imgs[amend(cur - i, total)])
            loadImage(imgs[amend(cur + i, total)])
        }
    }

    _fadeInOut(index, opacity, time) {
        const slide = this.slides[index]
        const style = slide && slide.style

        if (!style) {
            return
        }

        style.webkitTransitionDuration = style.transitionDuration = time + 'ms'
        style.opacity = opacity
    }

    circle(num) {
        const len = this.slides.length
        return (len + (num % len)) % len
    }

    go(cur, aniTime) {
        const options = this.options

        aniTime = typeof aniTime === 'undefined' ? options.aniTime : aniTime

        var old = this.oldCur = this.cur

        if (cur === old) {
            return
        }

        // -1前进 1后退
        var dir =  Math.abs(old - cur) / (old - cur)

        // get the actual position of the slide
        if (options.loop) {
            var naturalDir = dir

            dir = -this.slidePos[this.circle(cur)] / this.width

            // if going forward but to < index, use to = slides.length + to
            // if going backward but to > index, use to = -slides.length + to
            if (dir !== naturalDir) {
                cur = -dir * this.slides.length + cur
            }
        }

        var diff = Math.abs(old - cur) - 1;

        if (typeof options.direction === 'boolean' && options.direction === false) {
            this._fadeInOut(old, 0, aniTime)
            this._fadeInOut(cur % this.realLen, 1, aniTime)
        }
        else {
            // move all the slides between index and to in the right direction
            while (diff--) {
                this._translate(this.circle((cur > old ? cur : old) - diff - 1), dir * this.width, 0);
            }

            cur = this.circle(cur);

            this._translate(old, dir * this.width, aniTime);

            this._translate(cur, 0, aniTime);

            if (options.loop) {
                this._translate(this.circle(cur - dir), -dir * this.width, 0)
            }
        }

        this.toggleNav(cur)

        this.cur = cur
    }

    prev() {
        if (this.options.loop || this.cur > 0) {
            this.go(this.cur - 1)
        }
    }

    next() {
        if (this.options.loop || this.cur < this.slides.length - 1) {
            this.go(this.cur + 1)
        }
    }

    _translate(cur, dist, duration) {
        this.slidePos[cur] = dist
        this._move(cur, dist, duration)
    }

    _move(cur, dist, duration) {
        const slide = this.slides[cur]
        const style = slide && slide.style

        if (!style) {
            return
        }

        style.webkitTransitionDuration = style.transitionDuration = duration + 'ms'
        style.webkitTransitionProperty = style.transitionProperty = 'transform, -webkit-transform'
        style.webkitTransform = 'translate(' + dist + 'px, 0) translateZ(0)'
        style.transform = 'translate(' + dist + 'px, 0) translateZ(0)'
    }

    transitionEndCallback(e) {
        const cur = this.cur

        if (
            parseInt(e.target.getAttribute('data-index'), 10) === cur % this.realLen
            && this.oldCur !== this.cur
        ) {
            this.start()

            this.fire('pagechange', cur, this.slides.length, this.slides[cur])

            this.oldCur = this.cur
        }
    }

    dispose() {

    }
}
