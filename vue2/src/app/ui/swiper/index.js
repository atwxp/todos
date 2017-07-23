import SwiperComponent from './swiper.vue'
import SlideComponent from './slide.vue'

// SwiperComponent.default || SwiperComponent

const install = Vue => {
    Vue.component(SwiperComponent.name, SwiperComponent)
    Vue.component(SlideComponent.name, SlideComponent)
}

module.exports = {
    install,
    uSwiper: SwiperComponent,
    uSwiperSlide: SlideComponent
}
