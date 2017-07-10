import Vue from 'vue'
import checkbox from '@/ui/checkbox'

const createComponentInstance = (component, propsData) => {
    const Ctor = Vue.extend(component) 
    return new Ctor({
        propsData
    }).$mount()
}

describe('checkbox', () => {
    it('disabled class', () => {
        const vm = createComponentInstance(checkbox, {
            disabled: true
        })
        expect(Array.prototype.slice.call(vm.$el.classList)).to.include('u-checkbox-disabled')
    })
})
