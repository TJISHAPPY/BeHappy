/* BeHappy — 공통 스크립트
   메뉴·연락처·주소는 아래 SITE에서만 고치면 모든 페이지에 반영된다. */
(function () {
  var SITE = {
    menu: [
      { id: 'belife',  label: 'Belife',  href: 'belife.html' },
      { id: 'work',    label: 'Work',    href: 'work.html' },
      { id: 'happiz',  label: 'Happiz',  href: 'happiz.html' },
      { id: 'contact', label: 'Contact', href: 'contact.html' }
    ],
    biz: 'letsbehappy@behappycreative.com',
    job: 'happiz@behappycreative.com',
    addr: '서울 성동구 아차산로 126, 더리브세종타워 606호'
  };
  /* 어느 메뉴로 들어오든 항상 페이지 맨 위(첫 단락)부터 보이게 한다.
     브라우저가 예전 스크롤 위치를 되살리거나, 뒤로 가기로 캐시된 페이지가 열려도 맨 위로 */
  try { if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; } } catch (e) {}
  function toTop() { if (!location.hash) { window.scrollTo(0, 0); } }
  toTop();
  window.addEventListener('pageshow', toTop);
  window.addEventListener('load', toTop);

  var NS = 'http://www.w3.org/2000/svg';
  var page = document.body.getAttribute('data-page') || 'home';

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) { e.setAttribute(k, attrs[k]); }
    if (parent) { parent.appendChild(e); }
    return e;
  }
  function h(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }

  /* 기본 스마일 마크 */
  function faceSVG() {
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#FFEA00" stroke="#1C1A10" stroke-width="3"/>' +
      '<circle cx="16.5" cy="19" r="3" fill="#1C1A10"/><circle cx="31.5" cy="19" r="3" fill="#1C1A10"/>' +
      '<path d="M12.5 28.5c3 6.6 20 6.6 23 0" fill="none" stroke="#1C1A10" stroke-width="3.4" stroke-linecap="round"/></svg>';
  }

  /* C-2 다이컷 로고. 글자 폭을 재서 캡슐 길이를 맞춘다 */
  function buildLockup(svg) {
    var t = { ink: '#1C1A10', face: '#FFEA00', edge: '#FFFFFF', shadow: '#1C1A10', y: '#FFEA00' };
    while (svg.firstChild) { svg.removeChild(svg.firstChild); }
    var font = '"Bricolage Grotesque","Helvetica Neue",Arial,sans-serif';
    function label(parent, x, y) {
      var n = el('text', { x: x, y: y, 'font-size': 100, 'font-weight': 800, 'letter-spacing': -3, fill: t.y }, parent);
      n.style.fontFamily = font; n.style.fontVariationSettings = '"wdth" 100';
      n.textContent = 'BeHappy';
      return n;
    }
    var m = label(svg, 0, 100), W = 0;
    try { W = m.getComputedTextLength(); } catch (e) {}
    svg.removeChild(m);
    if (!(W > 50)) { W = 440; }
    var ch = 130, cx = 72, cy = 65, r = 76, ed = 10, cw = Math.round(104 + W + 56);
    var g = el('g', { transform: 'rotate(-3 ' + (cx + cw / 2) + ' ' + cy + ')' }, svg);
    el('rect', { x: cx + 8, y: -ed + 10, width: cw + ed, height: ch + 2 * ed, rx: 65 + ed, fill: t.shadow }, g);
    el('circle', { cx: cx + 8, cy: cy + 10, r: r + ed, fill: t.shadow }, g);
    el('rect', { x: cx, y: -ed, width: cw + ed, height: ch + 2 * ed, rx: 65 + ed, fill: t.edge }, g);
    el('circle', { cx: cx, cy: cy, r: r + ed, fill: t.edge }, g);
    el('rect', { x: cx, y: 0, width: cw, height: ch, rx: 65, fill: t.ink }, g);
    label(g, cx + 104, 89);
    var fr = r - 3.5;
    el('circle', { cx: cx, cy: cy, r: fr, 'stroke-width': 7, fill: t.face, stroke: t.ink }, g);
    var f = el('g', { transform: 'translate(' + (cx - fr) + ' ' + (cy - fr) + ') scale(' + (2 * fr / 48) + ')' }, g);
    el('circle', { cx: 16.5, cy: 19, r: 3, fill: t.ink }, f);
    el('circle', { cx: 31.5, cy: 19, r: 3, fill: t.ink }, f);
    el('path', { d: 'M12.5 28.5c3 6.6 20 6.6 23 0', fill: 'none', 'stroke-width': 3.4, 'stroke-linecap': 'round', stroke: t.ink }, f);
    svg.setAttribute('viewBox', (cx - r - ed - 6) + ' ' + (-ed - 22) + ' ' + (cw + r + ed * 2 + 30) + ' ' + (ch + 2 * ed + 44));
  }
  function drawLockups() {
    var list = document.querySelectorAll('svg[data-lockup]');
    for (var i = 0; i < list.length; i++) { buildLockup(list[i]); }
  }

  /* 상단 메뉴 */
  var links = SITE.menu.map(function (m) {
    return '<li><a href="' + m.href + '"' + (m.id === page ? ' aria-current="page"' : '') + '>' + m.label + '</a></li>';
  }).join('');
  document.body.insertBefore(h(
    '<header class="nav"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="BeHappy 홈"><svg data-lockup role="img" aria-label="BeHappy"></svg></a>' +
      '<nav aria-label="주 메뉴"><ul class="menu">' + links + '</ul>' +
      '<button class="menu-btn" type="button" id="menuOpen" aria-haspopup="dialog" aria-label="메뉴 열기"><svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true"><path d="M1.5 2h27M9 11h19.5M15 20h13.5" stroke="currentColor" stroke-width="3" stroke-linecap="square" fill="none"/></svg></button></nav>' +
    '</div></header>'
  ), document.body.firstChild);

  var sheet = h(
    '<dialog class="sheet" aria-label="메뉴">' +
      '<div class="bar"><a class="brand" href="index.html" aria-label="BeHappy 홈"><svg data-lockup role="img" aria-label="BeHappy"></svg></a>' +
      '<button class="menu-btn" type="button" id="menuClose" style="display:block" aria-label="메뉴 닫기"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M21 3L3 21" stroke="currentColor" stroke-width="3" stroke-linecap="square" fill="none"/></svg></button></div>' +
      '<nav aria-label="모바일 메뉴">' + SITE.menu.map(function (m) {
        return '<a href="' + m.href + '"' + (m.id === page ? ' aria-current="page"' : '') + '>' + m.label + '</a>';
      }).join('') + '</nav>' +
    '</dialog>'
  );
  document.body.appendChild(sheet);
  document.getElementById('menuOpen').addEventListener('click', function () {
    if (sheet.showModal) { sheet.showModal(); } else { sheet.setAttribute('open', ''); }
    drawLockups();
  });
  document.getElementById('menuClose').addEventListener('click', function () {
    if (sheet.close) { sheet.close(); } else { sheet.removeAttribute('open'); }
  });

  /* 푸터 (홈은 한 화면이라 생략) */
  if (page !== 'home') {
    document.body.appendChild(h(
      '<footer class="foot"><div class="wrap grid">' +
        '<div class="f1">' + SITE.addr + '</div>' +
        '<div class="f4">© ' + new Date().getFullYear() + ' BeHappy</div>' +
      '</div></footer>'
    ));
  }

  /* 복사 버튼: <button data-copy="텍스트"> */
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-copy]') : null;
    if (!b) { return; }
    var text = b.getAttribute('data-copy'), label = b.getAttribute('data-label') || b.textContent;
    b.setAttribute('data-label', label);
    var done = function (t) { b.textContent = t; setTimeout(function () { b.textContent = label; }, 1600); };
    try { navigator.clipboard.writeText(text).then(function () { done('복사됨'); }, function () { done('직접 선택해 복사해 주세요'); }); }
    catch (err) { done('직접 선택해 복사해 주세요'); }
  });

  window.BEHAPPY = { site: SITE, faceSVG: faceSVG };
  drawLockups();
  try { document.fonts.ready.then(drawLockups); } catch (e) {}
})();
