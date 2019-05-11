import Vue from "vue";
import VueRouter from "vue-router";

import { getTracker } from "./tracker";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "search",
    component: require("@/views/Search.vue").default,
    props: true
  },
  {
    path: "/apropos",
    name: "about",
    component: require("@/views/About.vue").default
  },
  {
    path: "/cgu",
    name: "cgu",
    component: require("@/views/CGU.vue").default
  },
  {
    path: "/erreur",
    name: "error",
    component: require("@/views/ViewError.vue").default,
    props: true
  },
  {
    path: "/fc/callback",
    name: "franceconnect_callback",
    component: require("@/views/FranceConnectCallback.vue").default
  },
  {
    path: "/fc/postlogout",
    name: "franceconnect_postlogout",
    component: require("@/views/FranceConnectPostLogout.vue").default
  },
  {
    path: "/selftest/",
    name: "self_test",
    component: () => import("@/views/SelfTest.vue")
  },
  {
    path: "/stats/",
    name: "stats",
    component: require("@/views/Stats.vue").default
  },
  {
    path: "/transporteur/:carrierSiret",
    name: "carrier_detail",
    component: require("@/views/CarrierDetail.vue").default,
    props: true
  },
  {
    path: "/transporteur/:carrierSiret/edit",
    name: "carrier_edit",
    component: require("@/views/CarrierEdit.vue").default,
    props: true
  },
  {
    path: "/transporteur/:frRelationType/:relationId/confirmer/:token",
    name: "carrier_relation_confirm",
    component: require("@/views/CarrierRelationConfirm.vue").default,
    props: true
  },
  {
    path: "/transporteur/:carrierSiret/attestation",
    name: "carrier_certificate",
    component: require("@/views/CarrierCertificate.vue").default,
    props: true
  },
  {
    path: "/utilisateur",
    name: "account_profile",
    component: require("@/views/AccountProfile.vue").default
  },
  {
    path: "/utilisateur/connecter",
    name: "account_login",
    component: require("@/views/AccountLogin.vue").default
  },
  {
    path: "/utilisateur/creer",
    name: "account_create",
    component: require("@/views/AccountCreate.vue").default
  },
  {
    path: "/utilisateur/:userId/activer/:token",
    name: "account_activate",
    component: () => import("@/views/AccountActivate.vue"),
    props: true
  },
  {
    path: "/utilisateur/motdepasse/recuperer",
    name: "account_password_recover",
    component: () => import("@/views/AccountPasswordRecover.vue"),
    props: true
  },
  {
    path: "/utilisateur/:email/reinitialiser/:token",
    component: () => import("@/views/AccountPasswordReset.vue"),
    props: true
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

// Enable Matomo tracker only for production
if (process.env.NODE_ENV === "production") {
  router.beforeEach((to, from, next) => {
    const tracker = getTracker();
    if (tracker) {
      tracker.trackPageView(to.path);
    }
    next();
  });
}

export function getRouterLocationWhenLogged(user, nextUrl) {
  const location = {};
  if (user.has_accepted_cgu) {
    if (nextUrl) {
      location.path = nextUrl;
    } else {
      location.name = "search";
    }
  } else {
    location.name = "cgu";
    if (nextUrl) {
      location.query = {
        next: nextUrl
      };
    }
  }
  return location;
}

export function getNextUrlFromRoute(route) {
  if (route.query && route.query.next) {
    return route.query.next;
  }
  return "";
}

export default router;
