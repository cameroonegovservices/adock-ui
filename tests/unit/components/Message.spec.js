import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { storeOptions } from '@/store/options'
import Message from '@/components/Message.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

describe('Message.vue', () => {
  it('has nothing to show', () => {
    const clonedStoreOptions = deepClone(storeOptions)
    const store = new Vuex.Store(clonedStoreOptions)
    const wrapper = mount(Message, {
      localVue,
      store
    })
    expect(wrapper.text()).toBe('')
  })

  it('displays an added message', () => {
    const clonedStoreOptions = deepClone(storeOptions)
    const store = new Vuex.Store(clonedStoreOptions)
    const wrapper = mount(Message, {
      localVue,
      store
    })
    store.commit('ADD_MESSAGE', {
      message: 'Hi!'
    })
    expect(wrapper.text()).toBe('Hi!Fermer')
  })

  it('closes after the timeout', () => {
    jest.useFakeTimers()
    const mutations = {
      REMOVE_MESSAGES: jest.fn()
    }
    const store = new Vuex.Store({
      state: {
        messages: [ 'Hello!' ]
      },
      mutations
    })
    const wrapper = mount(Message, {
      localVue,
      store
    })
    expect(wrapper.text()).toBe('Hello!Fermer')
    expect(mutations.REMOVE_MESSAGES).not.toHaveBeenCalled()

    // 8s later
    // Still visible because the mutation is mocked
    jest.runTimersToTime(8000)
    expect(mutations.REMOVE_MESSAGES).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
