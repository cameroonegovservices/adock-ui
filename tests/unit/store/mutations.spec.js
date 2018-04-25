import { mutations } from '@/store/mutations'

describe('mutations', () => {
  it('REMOVE_MESSAGE', () => {
    const state = {
      messages: ['old', 'new']
    }
    mutations.REMOVE_MESSAGE(state)
    // Only recent messages are remaining
    expect(state.messages).toEqual(['new'])
  })

  it('ADD_MESSAGE', () => {
    const state = {
      messages: ['old']
    }
    const message = 'new'
    mutations.ADD_MESSAGE(state, message)
    expect(state.messages).toEqual(['old', 'new'])
  })

  it('SET_META', () => {
    const state = {
      choices: {
        workingAreas: {},
        specialities: {}
      },
      options: {
        workingAreas: [],
        specialities: []
      },
      meta: {
        transporteur: {},
        version: ''
      }
    }
    const payload = {
      choices: {
        WORKING_AREA_CHOICES: {
          FRANCE: 'France'
        },
        SPECIALITY_CHOICES: {
          LOT: 'Transport de lots'
        }
      },
      // Meta
      transporteur: {
        date: '2018-04-25',
        count: '1000'
      },
      version: '1.0'
    }
    mutations.SET_META(state, payload)
    expect(state.options.workingAreas).toEqual([
      {
        value: 'FRANCE',
        text: 'France'
      }
    ])
    expect(state.options.specialities).toEqual([
      {
        value: 'LOT',
        text: 'Transport de lots'
      }
    ])
    // toLocaleDateString depends on the env
    expect(state.meta.transporteur.localeDate).toBeTruthy()
    // toLocaleString is a noop on node
    expect(state.meta.transporteur.localeCount).toBeTruthy()
    expect(state.meta.version).toEqual('1.0')
  })
})
