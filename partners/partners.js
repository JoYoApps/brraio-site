/* Brands that support our health workers.
   - SUPPORTERS: every brand backing Brraio. Logos go in partners/logos/.
   - SPONSORS: the prize sponsor for each month (YYYY-MM, Perth time). To swap the
     monthly sponsor, add a line for the new month. The id must match a supporter.
     The monthly comp is a game of skill (best-judged ECG Challenge entries win), never a random draw.
   The same lists live in the app (SUPPORTERS and PRIZE_SPONSORS in index.html). */
window.BRRAIO_PARTNERS = {
  supporters: [
    {id: "nurse-life", name: "Nurse Life", logo: "nurse-life.png", url: "https://www.instagram.com/nurselifeaustralia/",
     socials: {Instagram: "https://www.instagram.com/nurselifeaustralia/", Facebook: "https://www.facebook.com/nurselifeaustralia", TikTok: "https://www.tiktok.com/@nurselifeausofficial"},
     blurb: "Nurse Life is backing Brraio's monthly competitions with mystery compression socks.",
     deal: "Mystery compression socks for Brraio competition winners, starting December"}
  ],
  sponsors: {
    "2026-12": {id: "nurse-life", prize: "Mystery compression socks",
                detail: "A game of skill: the top-scoring weekly ECG Challenge interpretations in December win, judged by the Brraio team. Free to enter. Winners get an exclusive code to claim their socks at Nurse Life checkout."}
  }
};

(function(){
  var D = window.BRRAIO_PARTNERS, MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var APP = "https://brraio.netlify.app/";
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function ym(){ var p = new Intl.DateTimeFormat("en-CA", {timeZone: "Australia/Perth", year: "numeric", month: "2-digit"}).format(new Date()).split("-"); return [+p[0], +p[1]]; }
  function key(y, m){ return y + "-" + (m < 10 ? "0" : "") + m; }
  function who(id){ for (var i = 0; i < D.supporters.length; i++) if (D.supporters[i].id === id) return D.supporters[i]; return null; }
  function sponsor(){
    var n = ym(), y = n[0], m = n[1], ny = m === 12 ? y + 1 : y, nm = m === 12 ? 1 : m + 1;
    function pick(k, yy, mm, now){ var s = D.sponsors[k], w = s && who(s.id); return w ? {s: s, w: w, label: MONTHS[mm-1] + " " + yy, month: MONTHS[mm-1], now: now} : null; }
    return pick(key(y, m), y, m, true) || pick(key(ny, nm), ny, nm, false) || {none: true, month: MONTHS[m-1]};
  }
  function logo(w, base, cls){ return w.logo ? '<img class="' + cls + '" src="' + esc(base + "partners/logos/" + w.logo) + '" alt="' + esc(w.name) + '" loading="lazy">' : ""; }
  function socials(w){ var k = w.socials ? Object.keys(w.socials) : []; return k.length ? '<p class="socl">Follow: ' + k.map(function(n){ return '<a href="' + esc(w.socials[n]) + '" target="_blank" rel="noopener">' + esc(n) + '</a>'; }).join(" · ") + '</p>' : ""; }
  var R = {
    sponsor: function(el, base){
      var sp = sponsor();
      if (sp.none) { el.innerHTML = '<div class="spon none"><div><span class="eyebrow">Prize sponsor wanted</span><h3>Sponsor ' + esc(sp.month) + "'s prize</h3><p>Put your brand in front of medicos who are putting in the work. Your prize, your name on it.</p></div>" +
        '<a class="btn" href="' + base + 'partners/join/">Become a prize sponsor</a></div>'; return; }
      el.innerHTML = '<div class="spon">' + logo(sp.w, base, "slogo") + '<div><span class="eyebrow">' + (sp.now ? "This month's prize sponsor · " : "Coming up · ") + esc(sp.label) + '</span>' +
        '<h3>' + esc(sp.w.name) + '</h3><p class="prize">' + esc(sp.s.prize) + (sp.now ? "" : ", from " + esc(sp.month)) + '</p><p>' + esc(sp.s.detail || "") + '</p>' + socials(sp.w) +
        '<p class="acts"><a class="btn" href="' + APP + '">Enter in the Brraio app</a>' + (sp.w.url ? ' <a class="btn ghost2" href="' + esc(sp.w.url) + '" target="_blank" rel="noopener sponsored">Visit ' + esc(sp.w.name) + '</a>' : "") + '</p></div></div>';
    },
    banner: function(el, base){
      var sp = sponsor();
      if (sp.none) { el.innerHTML = ""; return; }
      el.innerHTML = '<aside class="compbar" aria-label="Free entry prize competition"><div class="cb-in">' +
        (sp.w.logo ? '<img class="cb-logo" src="' + esc(base + "partners/logos/" + sp.w.logo) + '" alt="' + esc(sp.w.name) + '">' : "") +
        '<div class="cb-txt"><span class="cb-tag">Free entry prize competition' + (sp.now ? "" : " · opens 1 " + esc(sp.month)) + '</span>' +
        '<strong>' + esc(sp.month) + ': win ' + esc(sp.s.prize.charAt(0).toLowerCase() + sp.s.prize.slice(1)) + ' from ' + esc(sp.w.name) + '</strong>' +
        '<span class="cb-how">Do the weekly ECG Challenge. The best interpretations win. New prize every month.</span></div>' +
        '<div class="cb-acts"><a class="cb-go" href="' + APP + '">' + (sp.now ? "Enter free" : "Join free now") + '</a><a class="cb-more" href="' + base + '#supporters">How it works</a></div>' +
        '</div></aside>';
    },
    supporters: function(el, base){
      el.innerHTML = D.supporters.map(function(w){
        return '<li class="pcard">' + logo(w, base, "plogo") + '<h3>' + esc(w.name) + '</h3><p>' + esc(w.blurb || "") + '</p>' + (w.deal ? '<p class="deal">' + esc(w.deal) + '</p>' : "") +
          (w.url ? '<a class="btn" href="' + esc(w.url) + '" target="_blank" rel="noopener sponsored">Visit ' + esc(w.name) + '</a>' : "") + socials(w) + '</li>';
      }).join("") + '<li class="pcard more"><h3>Your brand here</h3><p>Got a deal, a prize or a giveaway for health workers? We\'d love to hear from you.</p><a class="btn" href="' + base + 'partners/join/">Become a supporter</a></li>';
    },
    logos: function(el, base){
      el.innerHTML = D.supporters.filter(function(w){ return w.logo; }).map(function(w){ return '<a href="' + base + 'partners/" title="' + esc(w.name) + '">' + logo(w, base, "") + '</a>'; }).join("");
    }
  };
  function run(){ var els = document.querySelectorAll("[data-brraio]"); for (var i = 0; i < els.length; i++){ var f = R[els[i].getAttribute("data-brraio")]; if (f) f(els[i], els[i].getAttribute("data-base") || ""); } }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
