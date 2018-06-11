import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { storeOptions } from '@/store/options'
import TransporteurList from '@/components/TransporteurList.vue'

describe('TransporteurList.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Vuetify)

  let store
  let clonedStoreOptions

  beforeEach(() => {
    clonedStoreOptions = deepClone(storeOptions)
    store = new Vuex.Store(clonedStoreOptions)
  })

  it('renders a list of transporteurs', () => {
    const wrapper = mount(TransporteurList, {
      localVue,
      store,
      propsData: {
        searchResponseIsEmpty: false,
        searchParams: {
          q: 'BAR'
        },
        transporteurs: [
          {
            raison_sociale: 'BARBARE',
            code_postal: '44117',
            ville: 'SAINT ANDRE DES EAUX',
            completeness: 100
          },
          {
            raison_sociale: 'BAROQUE',
            code_postal: '44600',
            ville: 'SAINT NAZAIRE',
            completeness: 85
          }
        ],
        limit: 0
      }
    })
    expect(wrapper.vm.searchParamsForDisplay).toBe('« BAR »')
  })
})
