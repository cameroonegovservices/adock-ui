import MockAdapter from "axios-mock-adapter";
import { api, axiosInstance } from "@/api";

const mockAdapter = new MockAdapter(axiosInstance);

describe("api", () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  it("tests simple get", async () => {
    mockAdapter.onGet(api.metaUrl).reply(200, {
      version: "1.0"
    });

    const response = await api.get(api.metaUrl);
    expect(response.data.version).toBe("1.0");
  });

  it("fails on get", async () => {
    mockAdapter.onGet(api.metaUrl).reply(500);
    const response = await api.get(api.metaUrl);
    expect(response.status).toBe(500);
    expect(response.data.message).toBeDefined();
  });

  it("passes params", async () => {
    const searchParams = {
      q: "FOO"
    };
    mockAdapter.onGet(api.searchCarriersUrl, searchParams).reply(200, {
      carriers: ["foo"]
    });
    const response = await api.get(api.searchCarriersUrl, searchParams);
    expect(response.data.carriers).toEqual(["foo"]);
    expect(response.data.limit).toBe(undefined);
  });

  it("handles 400 responses", async () => {
    mockAdapter.onGet(api.searchCarriersUrl).reply(400, {
      message: "Invalid request"
    });
    const response = await api.get(api.searchCarriersUrl);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe("Invalid request");
  });

  it("handles 404", async () => {
    const url = api.getCarrierUrl("123");
    mockAdapter.onGet(url).reply(404);
    const response = await api.get(url);
    expect(response.status).toBe(404);
    expect(response.data.message).toBe("La ressource demandée n'existe pas.");
  });

  it("handles network errors", async () => {
    mockAdapter.onGet(api.searchCarriersUrl).networkError();
    process.env.VUE_APP_API_URL = "https://example.com";
    const response = await api.get(api.searchCarriersUrl);
    expect(response.status).toBe(503);
    expect(response.data.message).toBe(
      "Le serveur https://example.com est inaccessible ou erreur d'exécution Javascript."
    );
  });

  it("fails to search carriers on server error", async () => {
    mockAdapter.onGet(api.searchCarriersUrl).reply(500);
    const response = await api.get(api.searchCarriersUrl);
    expect(response.status).toBe(500);
    expect(response.data.message).toBe(
      "Le service a retourné une erreur. Les administrateurs ont été informés du problème."
    );
  });

  it("patches ressources", async () => {
    const url = api.getCarrierUrl("123");
    mockAdapter.onPatch(url).reply(204, {
      carrier: {
        raison_sociale: "FOO"
      }
    });
    const form = {
      email: "foo@example.com"
    };
    const response = await api.patch(url, form);
    expect(response.data.carrier.raison_sociale).toBe("FOO");
    expect(response.data.errors).toBe(undefined);
  });

  it("fails to update a carrier", async () => {
    const url = api.getCarrierUrl("123");
    mockAdapter.onPatch(url).reply(400, {
      errors: {
        foo: ["Le champ est requis"]
      }
    });
    const response = await api.patch(url);
    expect(response.data.carrier).toBe(undefined);
    expect(response.data.errors.foo).toBeDefined();
  });

  it("getConfirmEmailUrl", () => {
    const url = api.getConfirmEmailUrl("123", "456");
    expect(url).toBe("/carriers/123/confirm_email/456/");
  });
});
