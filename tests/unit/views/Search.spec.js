import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import MockAdapter from "axios-mock-adapter";
import { mount, RouterLinkStub } from "@vue/test-utils";
import deepClone from "lodash.clonedeep";

import { api, axiosInstance } from "@/api";
import { storeOptions } from "@/store/options";
import Search from "@/views/Search.vue";
import { addElementWithDataAppToBody } from "../utils";

const mockAdapter = new MockAdapter(axiosInstance);

// Bad practice but that's the only workaround I know (Vuetify and vue-test-unit
// issue).
Vue.use(Vuex);
Vue.use(Vuetify);
addElementWithDataAppToBody();

function mountSearch(store) {
  return mount(Search, {
    store,
    sync: false,
    stubs: {
      RouterLink: RouterLinkStub,
      CarrierList: '<div class="stubbed"/>',
      SearchHelp: '<div class="stubbed"/>',
      TestimonialCards: '<div class="stubbed"/>'
    }
  });
}

describe("Search.vue", () => {
  let store;
  let clonedStoreOptions;

  beforeEach(() => {
    clonedStoreOptions = deepClone(storeOptions);
    store = new Vuex.Store(clonedStoreOptions);
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  it("renders search", () => {
    const wrapper = mountSearch(store);
    expect(wrapper.text()).toMatch("Chercher");
  });

  it("search carriers", async () => {
    mockAdapter.onGet(api.searchCarriersUrl).reply(200, {
      carriers: [
        {
          raison_sociale: "FOO"
        }
      ]
    });

    const wrapper = mountSearch(store);
    expect(wrapper.vm.carriers).toBe(null);
    await wrapper.vm.search();
    expect(wrapper.vm.carriers[0].raison_sociale).toBe("FOO");
    expect(wrapper.vm.errorMessage).toBe(null);
    expect(wrapper.vm.limit).toBe(0);
  });

  it("fails to search carriers", async () => {
    mockAdapter.onGet(api.searchCarriersUrl).reply(500);
    const wrapper = mountSearch(store);
    await wrapper.vm.search();
    expect(wrapper.vm.errorMessage).toBeDefined();
    expect(wrapper.vm.carriers).toEqual(null);
    expect(wrapper.vm.limit).toBe(0);
  });
});
