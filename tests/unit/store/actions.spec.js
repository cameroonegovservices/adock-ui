import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";

import { storeOptions } from "@/store/options";
import api from "@/api";

jest.spyOn(api, "getMeta");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("actions", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(storeOptions);
  });

  it("loadMeta", async () => {
    expect(store.state.meta.version).toBe("");

    const response = {
      error: null,
      data: {
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
      }
    };
    api.getMeta.mockResolvedValue(response);

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
      response.data.choices.WORKING_AREA_CHOICES
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
      response.data.choices.SPECIALITY_CHOICES
    );
    expect(store.state.choices.objectifCO2).toEqual(
      response.data.choices.OBJECTIF_CO2_CHOICES
    );
    expect(store.state.meta.carrier.date).toEqual(
      new Date(response.data.carrier.date)
    );
    expect(store.state.meta.carrier.localeCount).toEqual(
      response.data.carrier.count.toLocaleString()
    );
  });
});
