import Vue from "vue";
import VueRouter from "vue-router";

import { getTracker } from "./tracker";

import About from "@/views/About.vue";
import AccountActivate from "@/views/AccountActivate.vue";
import AccountCreate from "@/views/AccountCreate.vue";
import AccountLogin from "@/views/AccountLogin.vue";
import CarrierCertificate from "@/views/CarrierCertificate.vue";
import CarrierConfirmEmail from "@/views/CarrierConfirmEmail.vue";
import CarrierDetail from "@/views/CarrierDetail.vue";
import CarrierEdit from "@/views/CarrierEdit.vue";
import CGU from "@/views/CGU.vue";
import FranceConnectCallback from "@/views/FranceConnectCallback.vue";
import Search from "@/views/Search.vue";
import Stats from "@/views/Stats.vue";
import ViewError from "@/views/ViewError.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "search",
    component: Search,
    props: true
  },
  {
    path: "/apropos",
    name: "about",
    component: About
  },
  {
    path: "/cgu",
    name: "cgu",
    component: CGU
  },
  {
    path: "/erreur",
    name: "error",
    component: ViewError,
    props: true
  },
  {
    path: "/fc/callback",
    name: "franceconnect_callback",
    component: FranceConnectCallback
  },
  {
    path: "/stats",
    name: "stats",
    component: Stats
  },
  {
    path: "/transporteur/:carrierSiret",
    name: "carrier_detail",
    component: CarrierDetail,
    props: true
  },
  {
    path: "/transporteur/:carrierSiret/edit",
    name: "carrier_edit",
    component: CarrierEdit,
    props: true
  },
  {
    path: "/transporteur/:carrierSiret/confirm/:token",
    name: "carrier_confirm_email",
    component: CarrierConfirmEmail,
    props: true
  },
  {
    path: "/transporteur/:carrierSiret/certificate",
    name: "carrier_certificate",
    component: CarrierCertificate,
    props: true
  },
  {
    path: "/utilisateur/connecter/",
    name: "account_login",
    component: AccountLogin
  },
  {
    path: "/utilisateur/creer",
    name: "account_create",
    component: AccountCreate
  },
  {
    path: "/utilisateur/activate",
    name: "account_activate",
    component: AccountActivate
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

export default router;
