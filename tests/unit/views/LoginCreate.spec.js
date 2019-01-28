import Vue from "vue";
import Vuetify from "vuetify";

import { shallowMount } from "@vue/test-utils";

import LoginCreate from "@/views/LoginCreate.vue";

Vue.use(Vuetify);

describe("LoginCreate.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoginCreate);
  });

  it("renders the form", () => {
    expect(wrapper.vm.isValid).toBe(false);
  });
});
