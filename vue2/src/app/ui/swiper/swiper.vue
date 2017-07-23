<template>
<div :class="prefix">
    <div :class="swiperClass" ref="container">
        <slot></slot>
    </div>

    <slot name="pagination"></slot>
    <slot name="prev"></slot>
    <slot name="next"></slot>
</div>
</template>

<script>
import iSwiper from './iswiper'

export default {
    name: 'u-swiper',

    data() {
        return {
            prefix: 'u-swiper',
            iswiper: null
        }
    },

    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        }
    },

    computed: {
        swiperClass() {
            return [`${this.prefix}-list`].concat(this.swiperClassName)
        }
    },

    mounted() {
        if (!this.iswiper) {
            this.iswiper = new iSwiper(Object.assign({}, this.options, {
                container: this.$refs.container,
                pagination: this.$el.querySelector(this.options.pagination)
            }))
        }
    },

    updated() {
        this.iswiper && this.iswiper.update()
    },

    beforeDestroy() {

    }
}
</script>
