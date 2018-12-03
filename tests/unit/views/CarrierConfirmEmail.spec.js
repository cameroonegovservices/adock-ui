import Vue from 'vue'
import Vuetify from 'vuetify'

import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import MockAdapter from 'axios-mock-adapter'

import { axiosInstance, getConfirmEmailUrl } from '@/api'
import CarrierConfirmEmail from '@/views/CarrierConfirmEmail.vue'

const mockAdapter = new MockAdapter(axiosInstance)

Vue.use(Vuetify)

describe('CarrierConfirmEmail.vue', () => {
  afterEach(() => {
    mockAdapter.reset()
  })

  it('renders the view', async () => {
    const carrierSiret = '123'
    const token = '456'
    const message = "L'adresse électronique est confirmée."
    const url = getConfirmEmailUrl(carrierSiret, token)
    mockAdapter.onGet(url).reply(200, {
      message
    })

    const wrapper = shallowMount(CarrierConfirmEmail, {
      propsData: {
        carrierSiret,
        token
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.text()).toBe("Confirmation de l'adresse électronique en cours...")

    await flushPromises()

    // Message + icon done
    expect(wrapper.find('h3').text()).toBe(message + 'done')
  })
})
