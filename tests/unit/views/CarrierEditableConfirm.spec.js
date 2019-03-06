import Vue from "vue";
import Vuetify from "vuetify";

import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import flushPromises from "flush-promises";
import MockAdapter from "axios-mock-adapter";

import { api, axiosInstance } from "@/api";
import CarrierEditableConfirm from "@/views/CarrierEditableConfirm.vue";

const mockAdapter = new MockAdapter(axiosInstance);

Vue.use(Vuetify);

describe("CarrierEditableConfirm.vue", () => {
  afterEach(() => {
    mockAdapter.reset();
  });

  it("renders the view", async () => {
    const carrierEditableId = "123";
    const token = "456";
    const message = "Les modifications sont confirmées.";
    const url = api.getCarrierEditableConfirmUrl(carrierEditableId, token);
    mockAdapter.onGet(url).reply(200, { message });

    const wrapper = shallowMount(CarrierEditableConfirm, {
      propsData: {
        carrierEditableId,
        token
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.text()).toBe(
      "Confirmation des modifications de la fiche transporteur en cours..."
    );

    // Message + icon done
    await flushPromises();

    expect(wrapper.find("h3").text()).toBe(message + "done");
  });
});
