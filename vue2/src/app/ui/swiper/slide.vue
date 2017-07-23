<template>
    <div :class="prefix">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'u-swiper-slide',

    data() {
        return {
            prefix: 'u-swiper-slide'
        }
    }
}
</script>
