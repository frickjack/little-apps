let analyticsEnabled = false;

declare function ga( a: string, b: string, c?: string );

// report in to Google Analytics if running under apps.frickjack.com domain
if (/apps.frickjack.com/.exec(window.location.href)) {
    analyticsEnabled = true;
    (function(i, s, o, g, r, a, m) {
        i.GoogleAnalyticsObject = r; i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = new Date().getTime(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");

    ga("create", "UA-15960292-3", "frickjack.com");
    ga("send", "pageview");
} else {
    window.ga = function() {};
}

export const LittleAnalytics = {
    get isEnabled(): boolean {
        return analyticsEnabled;
    },

    get ga(): any {
        return window.ga;
    },
};
