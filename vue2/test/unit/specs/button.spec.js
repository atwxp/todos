import Vue from 'vue'
import button from '@/ui/button'

const createComponentInstance = (component, propsData) => {
    const Ctor = Vue.extend(component) 
    return new Ctor({
        propsData
    }).$mount()
}

describe('button', () => {
    it('type is u-button-primary', () => {
        const vm = createComponentInstance(button, {
            type: 'primary'
        })
        expect(Array.prototype.slice.call(vm.$el.classList)).to.include('u-button-primary')
    })


    it('disabled status', () => {
        const vm = createComponentInstance(button, {
            disabled: true
        })
        expect(vm.$el.hasAttribute('disabled')).to.be.true
    })
})
