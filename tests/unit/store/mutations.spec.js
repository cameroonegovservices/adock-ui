import { state, mutations } from "@/store/mutations";

describe("mutations", () => {
  it("MESSAGES_REMOVE", () => {
    const mockState = {
      messages: ["old", "new"]
    };
    mutations.MESSAGES_REMOVE(mockState);
    // Only recent messages are remaining
    expect(mockState.messages).toEqual([]);
  });

  it("MESSAGE_ADD", () => {
    const mockState = {
      messages: ["old"]
    };
    const message = "new";
    mutations.MESSAGE_ADD(mockState, { message });
    expect(mockState.messages).toEqual(["old", "new"]);
  });

  it("META_SET", () => {
    const payload = {
      choices: {
        WORKING_AREA_CHOICES: {
          FRANCE: "France"
        },
        SPECIALITY_CHOICES: {
          LOT: "Transport de lots"
        }
      },
      // Meta
      carrier: {
        date: "2018-04-25",
        count: "1000"
      },
      version: "1.0"
    };
    mutations.META_SET(state, payload);
    expect(state.options.workingAreas).toEqual([
      {
        value: "FRANCE",
        text: "France"
      }
    ]);
    expect(state.options.specialities).toEqual([
      {
        value: "LOT",
        text: "Transport de lots"
      }
    ]);
    // toLocaleDateString depends on the env
    expect(state.meta.carrier.localeDate).toBeTruthy();
    // toLocaleString is a noop on node
    expect(state.meta.carrier.localeCount).toBeTruthy();
    expect(state.meta.version).toBe("1.0");
  });
});
