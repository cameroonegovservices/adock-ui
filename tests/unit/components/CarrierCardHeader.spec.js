import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import CarrierCardHeader from '@/components/CarrierCardHeader.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('CarrierCardHeader', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(CarrierCardHeader, {
      localVue,
      propsData: {
        carrier: {
          enseigne: 'La belle enseigne',
          libelle_ape: 'Fabrication de moulins à vent',
          completeness: 60,
          objectif_co2: 'ENLISTED',
          is_locked: true,
          deleted_at: null
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.vm.isSubsidiary).toBe(false)
  })
})
