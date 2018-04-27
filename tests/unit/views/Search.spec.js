import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { storeOptions } from '@/store/options'
import Search from '@/views/Search.vue'
import { addElementWithDataAppToBody } from '../test'

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

  it('renders search', () => {
    const wrapper = mount(Search, {
      localVue,
      store
    })
    expect(wrapper.text()).toMatch('Chercher')
  })
})
