import Vuex from 'vuex'
import Vuetify from 'vuetify'
import MockAdapter from 'axios-mock-adapter'
import { mount, shallow, createLocalVue } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { axiosInstance, searchTransporteursUrl } from '@/api'
import { storeOptions } from '@/store/options'
import Search from '@/views/Search.vue'
import { addElementWithDataAppToBody } from '../utils'

const mockAdapter = new MockAdapter(axiosInstance)

describe('Search.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Vuetify)
  addElementWithDataAppToBody()

  let store
  let clonedStoreOptions

  beforeEach(() => {
    clonedStoreOptions = deepClone(storeOptions)
    store = new Vuex.Store(clonedStoreOptions)
  })

  afterEach(() => {
    mockAdapter.reset()
  })

  it('renders search', () => {
    const wrapper = mount(Search, {
      localVue,
      store
    })
    expect(wrapper.text()).toMatch('Chercher')
  })

  it('search transporteurs', async () => {
    mockAdapter.onGet(searchTransporteursUrl)
      .reply(200, {
        results: [
          {
            raison_sociale: 'FOO'
          }
        ]
      })

    const wrapper = shallow(Search, {
      localVue,
      store
    })
    await wrapper.vm.search()
    expect(wrapper.vm.transporteurs[0].raison_sociale).toBe('FOO')
    expect(wrapper.vm.errors).toBe(null)
    expect(wrapper.vm.limit).toBe(0)
    expect(wrapper.vm.isSearchDone).toBe(true)
  })

  it('fails to search transporteurs', async () => {
    mockAdapter.onGet(searchTransporteursUrl)
      .reply(500)
    const wrapper = shallow(Search, {
      localVue,
      store
    })
    await wrapper.vm.search()
    expect(wrapper.vm.errors).toHaveLength(1)
    expect(wrapper.vm.transporteurs).toEqual([])
    expect(wrapper.vm.limit).toBe(0)
    expect(wrapper.vm.isSearchDone).toBe(false)
  })
})
