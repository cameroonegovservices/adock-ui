import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
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
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        searchResponseIsEmpty: false,
        searchParams: {
          q: 'BAR'
        },
        transporteurs: [
          {
            enseigne: 'BARBARE',
            code_postal: '44117',
            ville: 'SAINT ANDRE DES EAUX',
            completeness: 100
          },
          {
            enseigne: 'BAROQUE',
            code_postal: '44600',
            ville: 'SAINT NAZAIRE',
            completeness: 85
          }
        ],
        limit: 0
      }
    })
    expect(wrapper.vm.searchParamsForDisplay).toBe('« BAR »')
    expect(wrapper.find('div.adock-transporteur-list-tile').text()).toBe('BARBARE')
  })
})
