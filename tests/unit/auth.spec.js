import auth from "@/auth";
import jwt from "jsonwebtoken";

describe("auth", () => {
  afterEach(() => {
    auth.deleteTokenData();
  });

  it("handles null token", () => {
    expect(auth.getToken()).toBeNull();

    const payload = {
      token: null,
      token_type: null
    };
    auth.setTokenData(payload);
    expect(auth.getToken()).toBeNull();
  });

  it("decodes valid token", () => {
    const payload = {
      token: jwt.sign(
        {
          user_id: 42,
          exp: new Date().getTime() / 1000 + 10
        },
        "secret"
      ),
      token_type: "Bearer",
      expires_in: 2
    };
    auth.setTokenData(payload);
    expect(auth.getTokenType()).toBe("Bearer");
    expect(auth.getUserId()).toEqual(42);
    expect(auth.tokenHasExpired()).toBeFalsy();
  });

  it("detects exprired token", () => {
    const payload = {
      token: jwt.sign(
        {
          user_id: 43,
          exp: new Date().getTime() / 1000 - 1
        },
        "secret"
      ),
      token_type: "Bearer",
      expires_in: 1
    };
    auth.setTokenData(payload);
    expect(auth.getTokenType()).toBe("Bearer");
    expect(auth.getUserId()).toEqual(43);
    expect(auth.tokenHasExpired()).toBeTruthy();
  });
});
