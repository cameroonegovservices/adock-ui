import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallow } from '@vue/test-utils'

import CompletenessIndicator from '@/components/CompletenessIndicator.vue'

Vue.use(Vuetify)

describe('CompletenessIndicator.vue', () => {
  it('displays a orange counter below 100%', () => {
    const wrapper = shallow(CompletenessIndicator, {
      propsData: {
        percent: 50
      }
    })
    expect(wrapper.text()).toMatch('50 %')
    expect(wrapper.vm.completed).toBe(false)
    expect(wrapper.vm.statusColor).toBe('orange')
  })

  it('displays a orange counter below 100%', () => {
    const wrapper = shallow(CompletenessIndicator, {
      propsData: {
        percent: 100
      }
    })
    // Icon only
    expect(wrapper.text()).toMatch('')
    expect(wrapper.vm.completed).toBe(true)
    expect(wrapper.vm.statusColor).toBe('green')
  })
})
