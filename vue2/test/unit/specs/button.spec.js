import button from '@/ui/button'
import { createComponentInstance } from '../util'

describe('Button', () => {
    let vm

    afterEach(() => {
        console.log('afterEach called')
    })

    it('create', () => {
        vm = createComponentInstance(button, {
            type: 'primary'
        })
        expect(vm.$el.classList.contains('u-button-primary')).to.be.true
    })

    it('kind', () => {
        const vm = createComponentInstance(button, {
            kind: 'button'
        })
        expect(vm.$el.getAttribute('type')).to.equal('button')
    })

    it('size', () => {
        const vm = createComponentInstance(button, {
            size: 'large'
        })
        expect(vm.$el.classList.contains('u-button-large')).to.be.true
    })

    it('disabled', () => {
        const vm = createComponentInstance(button, {
            disabled: true
        })
        expect(vm.$el.hasAttribute('disabled')).to.be.true
    })

    it('clicked', () => {

    })
})
