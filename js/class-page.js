/* Class page — sidebar scrollspy + smooth scroll */
(function () {
    var nav = document.querySelector('.cp-sidebar .cp-nav');
    if (!nav) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('.cp-nav-link'));
    if (!links.length) return;

    var sections = links
        .map(function (l) {
            var id = l.getAttribute('href');
            if (!id || id.charAt(0) !== '#') return null;
            var el = document.querySelector(id);
            return el ? { id: id, link: l, el: el } : null;
        })
        .filter(Boolean);

    function setActive(id) {
        links.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('href') === id);
        });
    }

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(
            function (entries) {
                var visible = entries
                    .filter(function (e) { return e.isIntersecting; })
                    .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
                if (visible.length) setActive('#' + visible[0].target.id);
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        sections.forEach(function (s) { io.observe(s.el); });
    }

    links.forEach(function (l) {
        l.addEventListener('click', function (e) {
            var target = document.querySelector(l.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', l.getAttribute('href'));
            setActive(l.getAttribute('href'));
        });
    });
})();
