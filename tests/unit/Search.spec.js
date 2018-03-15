import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'

import Search from '@/views/Search.vue'

Vue.use(Vuetify)

describe('Search.vue', () => {
  it('renders search', () => {
    const wrapper = mount(Search)
    expect(wrapper.text()).toMatch('Chercher')
  })
})
