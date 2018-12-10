/* global Piwik */

// Piwik/Matomo tracker
window._paq = window._paq || [];
window._paq.push(["setDomains", ["*." + process.env.VUE_APP_HOSTNAME]]);
window._paq.push(["setDoNotTrack", true]);
window._paq.push(["trackPageView"]);
window._paq.push(["enableLinkTracking"]);

// Requires VUE_APP_TRACKER_URL and VUE_APP_TRACKER_SITE_ID
export function loadTracker() {
  var u = process.env.VUE_APP_TRACKER_URL;
  window._paq.push(["setTrackerUrl", u + "piwik.php"]);
  window._paq.push(["setSiteId", process.env.VUE_APP_TRACKER_SITE_ID]);
  var d = document;
  var g = d.createElement("script");
  var s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.async = true;
  g.defer = true;
  g.src = u + "piwik.js";
  s.parentNode.insertBefore(g, s);
}

export function getTracker() {
  let tracker = null;
  if (typeof Piwik !== "undefined") {
    tracker = Piwik.getAsyncTracker(
      process.env.VUE_APP_TRACKER_URL + "piwik.php",
      process.env.VUE_APP_TRACKER_SITE_ID
    );
  }
  return tracker;
}
