import MockAdapter from 'axios-mock-adapter'
import {
  api,
  axiosInstance,
  getConfirmEmailUrl,
  getEditCodeUrl,
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
    expect(response.data.version).toBe('1.0')
    expect(response.error).toBe(null)
  })

  it('fails to get meta information', async () => {
    mockAdapter.onGet(metaUrl).reply(500)
    const response = await api.getMeta()
    expect(response.error.status).toBe(500)
    expect(response.error.message).toBeDefined()
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
    expect(response.error.status).toBe(400)
    expect(response.error.message).toBe('Invalid request')
  })

  it('fails to search transporteurs w/o message', async () => {
    mockAdapter.onGet(searchTransporteursUrl).networkError()
    process.env.VUE_APP_API_URL = 'https://example.com'
    const response = await api.searchTransporteurs()
    expect(response.error.status).toBe(503)
    expect(response.error.message).toBe(
      'Le serveur https://example.com est inaccessible.'
    )
  })

  it('fails to search transporteurs on server error', async () => {
    mockAdapter.onGet(searchTransporteursUrl).reply(500)
    const response = await api.searchTransporteurs()
    expect(response.error.status).toBe(500)
    expect(response.error.message).toBe(
      'Le service a retourné une erreur. Les administrateurs ont été informés du problème.'
    )
  })

  it('fetch a transporteur', async () => {
    const url = getTransporteurUrl('123')
    mockAdapter.onGet(url).reply(200, {
      transporteur: {
        raison_sociale: 'FOO'
      }
    })
    const response = await api.fetchTransporteur('123')
    expect(response.transporteur.raison_sociale).toBe('FOO')
    expect(response.error).toBe(null)
  })

  it('fails to fetch a transporteur', async () => {
    const url = getTransporteurUrl('123')
    mockAdapter.onGet(url).reply(404)
    const response = await api.fetchTransporteur('123')
    expect(response.error.status).toBe(404)
    expect(response.error.message).toBe("La ressource demandée n'existe pas.")
  })

  it('update a transporteur', async () => {
    const url = getTransporteurUrl('123')
    mockAdapter.onPatch(url).reply(204, {
      transporteur: {
        raison_sociale: 'FOO'
      }
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
    mockAdapter.onPatch(url).reply(400, {
      'foo': 'Le champ est requis'
    })
    const response = await api.updateTransporteur('123')
    expect(response.transporteur).toBe(null)
    expect(response.errors.fields.foo).toBeDefined()
  })

  it('getConfirmEmailUrl', () => {
    const url = getConfirmEmailUrl('123', '456')
    expect(url).toBe('/transporteurs/123/confirmer_adresse/456/')
  })

  it('getEditCodeUrl', () => {
    const url = getEditCodeUrl('123')
    expect(url).toBe('/transporteurs/123/envoyer_code/')
  })
})
