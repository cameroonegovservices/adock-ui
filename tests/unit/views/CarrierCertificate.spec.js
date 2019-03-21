import deepClone from "lodash.clonedeep";
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";

import CarrierCertificate from "@/views/CarrierCertificate.vue";
import { storeOptions } from "@/store/options";
import { carrier } from "../testData";

Vue.use(Vuex);
Vue.use(Vuetify);

describe("CarrierCertificate.vue", () => {
  let wrapper;

  beforeEach(() => {
    const clonedStoreOptions = deepClone(storeOptions);
    const store = new Vuex.Store(clonedStoreOptions);
    wrapper = shallowMount(CarrierCertificate, {
      propsData: {
        carrier
      },
      store,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
  });

  it("adds worker to the list", () => {
    expect(wrapper.vm.workers).toHaveLength(1);
    expect(wrapper.vm.workers[0].id).toBe(1);
    expect(wrapper.vm.workerIsEmptyError).toBe(false);
    wrapper.vm.addWorker();
    expect(wrapper.vm.workerIsEmptyError).toBe(true);
    expect(wrapper.vm.workers).toHaveLength(1);

    const worker = wrapper.vm.workers[0];
    worker.name = worker.date = worker.nationality = worker.work_permit = "a";
    wrapper.vm.addWorker();
    expect(wrapper.vm.workerIsEmptyError).toBe(false);
    expect(wrapper.vm.workers[1].id).toBe(2);
  });

  it("removes worker from the list", () => {
    let worker = wrapper.vm.workers[0];
    wrapper.vm.removeWorker(worker);
    expect(wrapper.vm.workers).toHaveLength(0);
  });
});
