(function () {
  var menuBtn = document.getElementById('menuBtn');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('backdrop');
  var filter = document.getElementById('filter');

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('show');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
  }
  function toggleSidebar() {
    if (sidebar.classList.contains('open')) { closeSidebar(); } else { openSidebar(); }
  }

  if (menuBtn) { menuBtn.addEventListener('click', toggleSidebar); }
  if (backdrop) { backdrop.addEventListener('click', closeSidebar); }

  // Close the sidebar after tapping a link (mobile)
  sidebar.querySelectorAll('.nav-link').forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 900px)').matches) { closeSidebar(); }
    });
  });

  // Quick filter: hide non-matching links + empty groups
  if (filter) {
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      sidebar.querySelectorAll('.nav-group').forEach(function (group) {
        var visible = 0;
        group.querySelectorAll('.nav-link').forEach(function (link) {
          var match = link.textContent.toLowerCase().indexOf(q) !== -1;
          link.style.display = match ? '' : 'none';
          if (match) { visible++; }
        });
        group.style.display = visible ? '' : 'none';
      });
    });
  }

  // Scroll the active link into view in the sidebar
  var active = sidebar.querySelector('.nav-link.active');
  if (active && active.scrollIntoView) {
    active.scrollIntoView({ block: 'center' });
  }
})();
