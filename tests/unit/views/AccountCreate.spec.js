import Vue from "vue";
import Vuetify from "vuetify";

import { shallowMount } from "@vue/test-utils";

import AccountCreate from "@/views/AccountCreate.vue";

Vue.use(Vuetify);

describe("AccountCreate.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AccountCreate);
  });

  it("renders the form", () => {
    expect(wrapper.vm.isValid).toBe(false);
  });
});
