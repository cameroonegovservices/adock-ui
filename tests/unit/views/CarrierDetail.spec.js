import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { mount, RouterLinkStub } from "@vue/test-utils";
import deepClone from "lodash.clonedeep";

import router from "@/router";
import { storeOptions } from "@/store/options";
import CarrierDetail from "@/views/CarrierDetail.vue";
import { addElementWithDataAppToBody } from "../utils";
import { carrier } from "../testData";

Vue.use(Vuex);
Vue.use(Vuetify);

describe("CarrierDetail.vue", () => {
  addElementWithDataAppToBody();

  let store;
  let clonedStoreOptions;
  let wrapper;

  beforeEach(() => {
    clonedStoreOptions = deepClone(storeOptions);
    store = new Vuex.Store(clonedStoreOptions);
    wrapper = mount(CarrierDetail, {
      router,
      store,
      propsData: {
        carrier
      },
      stubs: {
        RouterLink: RouterLinkStub,
        CarrierCardHeader: '<div class="stubbed"/>'
      }
    });
  });

  it("renders detail", () => {
    const wrapperText = wrapper.text();
    expect(wrapperText).toMatch("DUBOIS");
    expect(wrapperText).toMatch("12345678912345");
  });

  it("display list of strings as joined string", () => {
    const asJoinedString = wrapper.vm.$options.filters.asJoinedString;
    expect(asJoinedString(null)).toBe("");
    expect(asJoinedString(["2A", "34"])).toBe("2A, 34");
  });
});
