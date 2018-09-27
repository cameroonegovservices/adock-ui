import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { mount, RouterLinkStub } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { storeOptions } from '@/store/options'
import Detail from '@/views/Detail.vue'
import { addElementWithDataAppToBody } from '../utils'

const transporteur = {
  raison_sociale: 'DUBOIS',
  deleted_at: null,
  sirene_deleted_at: null,
  siret: '12345678912345',
  numero_tva: 'FR32123456789',
  adresse: '90 ROUTE DE LA MER',
  code_postal: '44230',
  ville: 'SAINT MARCELIN',
  gestionnaire: 'RAYMOND MARTIN',
  lti_numero: '2018 28 0000292',
  lti_date_debut: '2018-03-12',
  lti_date_fin: '2021-03-11',
  lti_nombre: 6,
  telephone: '06 81 05 82 69',
  email: 'contact@example.com'
}

Vue.use(Vuex)
Vue.use(Vuetify)

describe('Detail.vue', () => {
  addElementWithDataAppToBody()

  let store
  let clonedStoreOptions
  let wrapper

  beforeEach(() => {
    clonedStoreOptions = deepClone(storeOptions)
    store = new Vuex.Store(clonedStoreOptions)
    wrapper = mount(Detail, {
      store,
      propsData: {
        transporteur
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  })

  it('renders detail', () => {
    const wrapperText = wrapper.text()
    expect(wrapperText).toMatch('DUBOIS')
    expect(wrapperText).toMatch('12345678912345')
  })

  it('display list of strings as joined string', () => {
    const asJoinedString = wrapper.vm.$options.filters.asJoinedString
    expect(asJoinedString(null)).toBe('')
    expect(asJoinedString(['2A', '34'])).toBe('2A, 34')
  })
})
