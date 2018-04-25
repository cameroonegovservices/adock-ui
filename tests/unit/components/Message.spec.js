import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, shallow } from '@vue/test-utils'
import deepClone from 'lodash.clonedeep'

import { storeOptions } from '@/store/options'
import Message from '@/components/Message.vue'

describe('Message.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Vuetify)

  it('has nothing to show', () => {
    const clonedStoreOptions = deepClone(storeOptions)
    const store = new Vuex.Store(clonedStoreOptions)
    const wrapper = shallow(Message, {
      localVue,
      store
    })
    expect(wrapper.text()).toBe('')
  })

  it('displays an added message', () => {
    const clonedStoreOptions = deepClone(storeOptions)
    const store = new Vuex.Store(clonedStoreOptions)
    const wrapper = shallow(Message, {
      localVue,
      store
    })
    store.commit('ADD_MESSAGE', {
      message: {
        color: 'success',
        text: 'Hi!'
      }
    })
    expect(wrapper.text()).toBe('Hi!Fermer')
  })

  it('closes after the timeout', () => {
    jest.useFakeTimers()
    const mutations = {
      REMOVE_MESSAGE: jest.fn()
    }
    const store = new Vuex.Store({
      state: {
        messages: [{
          color: '',
          text: 'Hello!'
        }]
      },
      mutations
    })
    const wrapper = shallow(Message, {
      localVue,
      store
    })
    expect(wrapper.text()).toBe('Hello!Fermer')
    expect(mutations.REMOVE_MESSAGE).not.toHaveBeenCalled()

    // 6s later
    // Still visible because the mutation is mocked
    jest.runTimersToTime(6000)
    expect(mutations.REMOVE_MESSAGE).toHaveBeenCalled()

    jest.useRealTimers()
  })
})