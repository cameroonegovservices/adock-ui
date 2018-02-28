import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

Vue.use(Vuetify)

describe('Home.vue', () => {
  it('renders subscribe button', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toMatch('Inscrivez vous')
  })
})
