import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { mount } from "@vue/test-utils";
import deepClone from "lodash.clonedeep";

import { storeOptions } from "@/store/options";
import Message from "@/components/Message.vue";

Vue.use(Vuex);
Vue.use(Vuetify);

describe("Message.vue", () => {
  it("has nothing to show", () => {
    const clonedStoreOptions = deepClone(storeOptions);
    const store = new Vuex.Store(clonedStoreOptions);
    const wrapper = mount(Message, {
      store
    });
    expect(wrapper.text()).toBe("");
  });

  it("displays an added message", () => {
    const clonedStoreOptions = deepClone(storeOptions);
    const store = new Vuex.Store(clonedStoreOptions);
    const wrapper = mount(Message, {
      store
    });
    store.commit("MESSAGE_ADD", {
      message: "Hi!"
    });
    expect(wrapper.text()).toBe("Hi!Fermer");
  });

  it("closes after the timeout", () => {
    jest.useFakeTimers();
    const mutations = {
      MESSAGES_REMOVE: jest.fn()
    };
    const store = new Vuex.Store({
      state: {
        messages: ["Hello!"]
      },
      mutations
    });
    const wrapper = mount(Message, {
      store
    });
    expect(wrapper.text()).toBe("Hello!Fermer");
    expect(mutations.MESSAGES_REMOVE).not.toHaveBeenCalled();

    // 8s later
    // Still visible because the mutation is mocked
    jest.runTimersToTime(8000);
    expect(mutations.MESSAGES_REMOVE).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
