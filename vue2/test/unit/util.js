import Vue from 'vue'

export const createComponentInstance = (component, propsData) => {
    const Ctor = Vue.extend(component) 
    
    return new Ctor({ propsData }).$mount()
}
