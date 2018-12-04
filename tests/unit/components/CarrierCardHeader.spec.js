import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import CarrierCardHeader from '@/components/CarrierCardHeader.vue'
import { carrier } from '../testData'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('CarrierCardHeader', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(CarrierCardHeader, {
      localVue,
      propsData: {
        carrier
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is a subsidiary', () => {
    const wrapper = shallowMount(CarrierCardHeader, {
      localVue,
      propsData: {
        carrier
      }
    })
    expect(wrapper.vm.headquarters['is_siege']).toBe(true)
    expect(wrapper.vm.isSubsidiary).toBe(true)
  })

  it('is a headquarters', () => {
    const carrierHeadquarters = carrier
    carrierHeadquarters.other_facilities = []
    const wrapper = shallowMount(CarrierCardHeader, {
      localVue,
      propsData: {
        carrier
      }
    })
    expect(wrapper.vm.headquarters).toBe(null)
    expect(wrapper.vm.isSubsidiary).toBe(false)
  })

  it('is a headquarters with subsidiaries', () => {
    const carrierHeadquarters = carrier
    carrierHeadquarters.other_facilities = [
      {
        siret: '48153924500022', code_postal: '74300', ville: 'CLUSES', debut_activite: null, is_siege: false
      }
    ]
    const wrapper = shallowMount(CarrierCardHeader, {
      localVue,
      propsData: {
        carrier
      }
    })
    expect(wrapper.vm.headquarters).toBe(null)
    expect(wrapper.vm.isSubsidiary).toBe(false)
  })
})
