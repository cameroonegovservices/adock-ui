import MockAdapter from "axios-mock-adapter";
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";

import { storeOptions } from "@/store/options";
import { api, axiosInstance } from "@/api";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockAdapter = new MockAdapter(axiosInstance);

describe("actions", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(storeOptions);
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  it("loadMeta", async () => {
    expect(store.state.meta.version).toBe("");

    const payload = {
      choices: {
        WORKING_AREA_CHOICES: {
          INTERNATIONAL: "Internationale",
          FRANCE: "France"
        },
        SPECIALITY_CHOICES: {
          LOT: "Transport de lots",
          PALETTE: "Palettes / Messagerie palettisée"
        },
        OBJECTIF_CO2_CHOICES: {
          ENLISTED: "Engagée",
          LABELLED: "Labellisé9"
        }
      },
      version: "1.4.3",
      carrier: {
        date: "2018-10-11",
        count: 48306
      }
    };
    mockAdapter.onGet(api.metaUrl).reply(200, payload);

    await store.dispatch("loadMeta");

    expect(store.state.meta.version).toBe("1.4.3");
    expect(store.state.options.workingAreas).toEqual([
      {
        value: "INTERNATIONAL",
        text: "Internationale"
      },
      {
        value: "FRANCE",
        text: "France"
      }
    ]);
    expect(store.state.choices.workingAreas).toEqual(
      payload.choices.WORKING_AREA_CHOICES
    );
    expect(store.state.options.specialities).toEqual([
      {
        value: "LOT",
        text: "Transport de lots"
      },
      {
        value: "PALETTE",
        text: "Palettes / Messagerie palettisée"
      }
    ]);
    expect(store.state.choices.specialities).toEqual(
      payload.choices.SPECIALITY_CHOICES
    );
    expect(store.state.choices.objectifCO2).toEqual(
      payload.choices.OBJECTIF_CO2_CHOICES
    );
    expect(store.state.meta.carrier.date).toEqual(
      new Date(payload.carrier.date)
    );
    expect(store.state.meta.carrier.localeCount).toEqual(
      payload.carrier.count.toLocaleString()
    );
  });
});
