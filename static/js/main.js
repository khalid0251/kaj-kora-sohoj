// কাজ করা সহজ (Kaj Kora Sohoj) - Main JS
document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  // মোবাইল স্ক্রিনে সাইডবার টগল করা
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // মেনু আইটেমে ক্লিক করলে অ্যাক্টিভ ক্লাস পরিবর্তন করা (স্টেপ ১ ডেমো)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // বর্তমানে লিংকগুলো খালি (#), তাই ক্লিক করলে পেজ উপরে জাম্প করবে না
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
      }

      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');

      // মোবাইলে মেনু ক্লিক করলে সাইডবার স্বয়ংক্রিয়ভাবে বন্ধ হবে
      if (window.innerWidth < 992 && sidebar && sidebarOverlay) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
      }
    });
  });
});
