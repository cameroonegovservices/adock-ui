import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { storeOptions } from '@/store/options'
import Detail from '@/views/Detail.vue'
import { addElementWithDataAppToBody } from '../utils'

const transporteur = {
  raison_sociale: 'DUBOIS',
  deleted_at: null,
  in_sirene: true,
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

describe('Detail.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Vuetify)
  addElementWithDataAppToBody()

  let store
  let clonedStoreOptions
  let wrapper

  beforeEach(() => {
    clonedStoreOptions = deepClone(storeOptions)
    store = new Vuex.Store(clonedStoreOptions)
    wrapper = mount(Detail, {
      localVue,
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
    expect(wrapper.text()).toMatch('DUBOIS')
    const siretDiv = wrapper.find('div.container.grid-list-lg > div.layout > div.flex.adock-align-right')
    expect(siretDiv.text()).toMatch('12345678912345')
  })

  it('renders departement numbers', () => {
    const asDepartements = wrapper.vm.$options.filters.asDepartements
    expect(asDepartements(['2'])).toBe('02')
    expect(asDepartements(['2A'])).toBe('2A')
    expect(asDepartements(['44'])).toBe('44')
    expect(asDepartements(['44', '49'])).toBe('44, 49')
    expect(asDepartements(['976'])).toBe('976')
    expect(asDepartements(['976', '49'])).toBe('976, 49')
  })
})
