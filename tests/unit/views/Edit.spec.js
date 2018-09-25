import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { storeOptions } from '@/store/options'
import Edit from '@/views/Edit.vue'

Vue.use(Vuex)
Vue.use(Vuetify)

const TRANSPORTEUR_DATA = {
  email: null,
  // No telephone
  working_area: 'FRANCE',
  working_area_departements: ['44'],
  specialities: ['FOO'],
  website: 'www.example.com',
  description: 'Description',
  edit_code: 'SHOULD NO BE SET'
}

function mountEdit (store, transporteur) {
  return shallowMount(Edit, {
    store,
    propsData: {
      transporteur
    },
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
}

describe('Edit.vue', () => {
  let store

  beforeEach(() => {
    let clonedStoreOptions = deepClone(storeOptions)
    store = new Vuex.Store(clonedStoreOptions)
  })

  it('load the form with server data', () => {
    const wrapper = mountEdit(store, TRANSPORTEUR_DATA)

    // The function loadForm is called by 'created' hook

    expect(wrapper.vm.form.email).toBe('')
    expect(wrapper.vm.form.phone).toBe('')
    expect(wrapper.vm.form.workingArea).toBe('FRANCE')
    expect(wrapper.vm.form.workingAreaDepartementsAndRegions).toEqual(['44'])
    expect(wrapper.vm.form.specialities).toEqual(['FOO'])
    expect(wrapper.vm.form.website).toBe('www.example.com')
    expect(wrapper.vm.form.description).toBe('Description')
    expect(wrapper.vm.form.editCode).toBe('')
  })

  it('get the payload from the form', () => {
    const wrapper = mountEdit(store, TRANSPORTEUR_DATA)
    wrapper.vm.form.editCode = '1234'
    wrapper.vm.form.workingAreaDepartementsAndRegions.push(
      'Bretagne'
    )
    const payload = wrapper.vm.getPayloadFromForm()
    expect(payload.email).toBe('')
    expect(payload.telephone).toBe('')
    expect(payload.working_area).toBe('FRANCE')
    expect(payload.working_area_departements).toEqual(
      expect.arrayContaining(['44', '22', '29', '35', '56'])
    )
    expect(payload.working_area_departements.length).toBe(5)
    expect(payload.specialities).toEqual(['FOO'])
    expect(payload.website).toBe('www.example.com')
    expect(payload.edit_code).toBe('1234')
  })
})