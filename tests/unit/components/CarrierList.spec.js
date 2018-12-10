import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { mount, shallowMount, RouterLinkStub } from "@vue/test-utils";
import deepClone from "lodash.clonedeep";

import { storeOptions } from "@/store/options";
import CarrierList from "@/components/CarrierList.vue";

Vue.use(Vuex);
Vue.use(Vuetify);

describe("CarrierList.vue", () => {
  let store;
  let clonedStoreOptions;

  beforeEach(() => {
    clonedStoreOptions = deepClone(storeOptions);
    store = new Vuex.Store(clonedStoreOptions);
  });

  it("renders a list of carriers", () => {
    const wrapper = mount(CarrierList, {
      store,
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: {
        searchResponseIsEmpty: false,
        carriers: [
          {
            enseigne: "BARBARE",
            code_postal: "44117",
            ville: "SAINT ANDRE DES EAUX",
            completeness: 100
          },
          {
            enseigne: "BAROQUE",
            code_postal: "44600",
            ville: "SAINT NAZAIRE",
            completeness: 85
          }
        ],
        limit: 0
      }
    });
    expect(wrapper.vm.searchParamsForDisplay).toBe("");
    expect(
      wrapper.find(".v-list__tile__title.adock-carrier-list-tile").text()
    ).toBe("BARBARE");
    expect(
      wrapper.findAll(".v-list__tile__title.adock-carrier-list-tile")
    ).toHaveLength(2);
  });

  it("display search params", () => {
    const wrapper = shallowMount(CarrierList, {
      propsData: {
        searchParams: {
          q: "BAR",
          licenseTypes: [
            {
              text: "Léger (< 3,5 t)"
            }
          ],
          departementFrom: "53",
          departementTo: "44",
          specialities: [
            {
              text: "Moulins"
            },
            {
              text: "À vent"
            }
          ]
        },
        searchResponseIsEmpty: false,
        carriers: []
      }
    });
    expect(wrapper.vm.searchParamsForDisplay).toBe(
      "« BAR », poids « Léger (< 3,5 t) », enlèvement « 53 », livraison « 44 », spécialités « Moulins, À vent »"
    );
  });
});
