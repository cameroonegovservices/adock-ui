import MockAdapter from 'axios-mock-adapter'
import {
  api,
  axiosInstance,
  getTransporteurUrl,
  metaUrl,
  searchTransporteursUrl
} from '@/api'

const mockAdapter = new MockAdapter(axiosInstance)

describe('api', () => {
  afterEach(() => {
    mockAdapter.reset()
  })

  it('gets meta information', async () => {
    mockAdapter.onGet(metaUrl).reply(200, {
      version: '1.0'
    })

    const response = await api.getMeta()
    expect(response.version).toBe('1.0')
  })

  it('fails to get meta information', async () => {
    mockAdapter.onGet(metaUrl).reply(500)
    const response = await api.getMeta()
    expect(response).toBe(null)
  })

  it('search transporteurs', async () => {
    const searchParams = {
      q: 'FOO'
    }
    mockAdapter.onGet(searchTransporteursUrl, searchParams)
      .reply(200, {
        results: ['foo']
      })
    const response = await api.searchTransporteurs(searchParams)
    expect(response.limit).toBe(0)
    expect(response.transporteurs).toEqual(['foo'])
  })

  it('fails to search transporteurs with a message', async () => {
    mockAdapter.onGet(searchTransporteursUrl).reply(400, {
      message: 'Invalid request'
    })
    const response = await api.searchTransporteurs()
    expect(response.error).toBe('Invalid request')
  })

  it('fails to search transporteurs w/o message', async () => {
    mockAdapter.onGet(searchTransporteursUrl).reply(500)
    process.env.VUE_APP_API_URL = 'https://example.com'
    const response = await api.searchTransporteurs()
    expect(response.error).toBe('Impossible de contacter le serveur https://example.com')
  })

  it('fetch a transporteur', async () => {
    const url = getTransporteurUrl('123')
    mockAdapter.onGet(url).reply(200, {
      raison_sociale: 'FOO'
    })
    const transporteur = await api.fetchTransporteur('123')
    expect(transporteur.raison_sociale).toBe('FOO')
  })

  it('fails to fetch a transporteur', async () => {
    const url = getTransporteurUrl('123')
    mockAdapter.onGet(url).reply(404)
    const transporteur = await api.fetchTransporteur('123')
    expect(transporteur).toBe(null)
  })

  it('update a transporteur', async () => {
    const url = getTransporteurUrl('123')
    mockAdapter.onPatch(url).reply(204, {
      raison_sociale: 'FOO'
    })
    const form = {
      email: 'foo@example.com'
    }
    const response = await api.updateTransporteur('123', form)
    expect(response.transporteur.raison_sociale).toBe('FOO')
    expect(response.errors).toBe(null)
  })

  it('fails to update a transporteur', async () => {
    const url = getTransporteurUrl('123')
    mockAdapter.onPatch(url).reply(400, [
      'Le champ foo est requis'
    ])
    const response = await api.updateTransporteur('123')
    expect(response.transporteur).toBe(null)
    expect(response.errors).toHaveLength(1)
    expect(response.errors[0]).toBe('Le champ foo est requis')
  })
})
