import Vuetify from 'vuetify'
import { createLocalVue, shallow } from '@vue/test-utils'

import TransporteurList from '@/components/TransporteurList.vue'

describe('TransporteurList.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)

  it('renders a list of transporteurs', () => {
    const wrapper = shallow(TransporteurList, {
      localVue,
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
