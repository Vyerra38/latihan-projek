// ═══════ STATE & DATA ═══════
let isLoginMode = true; 
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let toastTimer;

function closeModal() {
  document.getElementById('login-modal').classList.remove('flex');
  document.getElementById('login-modal').classList.add('hidden');
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  const title = document.getElementById('modal-title');
  const btn = document.getElementById('auth-main-btn');
  const text = document.getElementById('auth-text');
  const emailContainer = document.getElementById('auth-email-container');
  
  if (isLoginMode) {
    title.innerHTML = 'Admin <span style="color:var(--orange)">Login</span>';
    btn.textContent = 'LOG-IN';
    text.innerHTML = 'Belum punya akun? <span onclick="toggleAuthMode()" class="cursor-pointer font-bold text-orange-500">Daftar di sini</span>';
    emailContainer.classList.add('hidden');
  } else {
    title.innerHTML = 'Admin <span style="color:var(--orange)">Register</span>';
    btn.textContent = 'DAFTAR SEKARANG';
    text.innerHTML = 'Sudah punya akun? <span onclick="toggleAuthMode()" class="cursor-pointer font-bold text-orange-500">Login</span>';
    emailContainer.classList.remove('hidden');
  }
}

function processAuth() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value.trim();
  const email = document.getElementById('auth-email').value.trim();
  let users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

  if (isLoginMode) {
    if (users[u] && users[u].password === p) {
      localStorage.setItem('isLoggedIn', 'true');
      showToast('✅ Login Berhasil!');
      closeModal();
      location.reload();
    } else {
      showToast('⚠️ Username/Password salah!');
    }
  } else {
    if (!u || !p || !email.includes('@')) return showToast('⚠️ Lengkapi form!');
    if (users[u]) return showToast('⚠️ User sudah ada!');
    
    users[u] = { password: p, email: email };
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    showToast('✅ Akun dibuat! Silakan Login.');
    toggleAuthMode();
  }
}

function togglePassword() {
  const passInput = document.getElementById('login-pass');
  const icon = document.getElementById('eye-icon');
  
  if (passInput.type === 'password') {
    // UBAH KE MODE TERLIHAT (Mata Terbuka)
    passInput.type = 'text';
    icon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `;
  } else {
    // UBAH KE MODE TERSEMBUNYI (Mata Tertutup/Dicoret)
    passInput.type = 'password';
    icon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
  }
}

// Fungsi untuk merubah tombol Login menjadi Logout jika user sudah masuk
function updateNavbarUI() {
  const authBtn = document.getElementById('auth-btn');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    authBtn.textContent = 'LOG-OUT';
    authBtn.onclick = logout; // Mengubah fungsi klik jadi logout
    authBtn.classList.remove('bg-orange-500'); // Optional: ganti warna tombol
    authBtn.classList.add('bg-red-500');      // Menandakan warna merah untuk logout
  } else {
    authBtn.textContent = 'LOGIN';
    authBtn.onclick = openModal; // Mengembalikan ke fungsi login
    authBtn.classList.remove('bg-red-500');
    authBtn.classList.add('bg-orange-500');
  }
}

// Fungsi Log Out
function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('currentUser'); // Hapus data user aktif
  showToast('👋 Berhasil Log-out!');
  location.reload(); // Refresh halaman agar navbar kembali ke mode login
}

// Jalankan saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', updateNavbarUI);

// Di dalam fungsi processAuth (bagian sukses Login)
if (users[u] && users[u].password === p) {
  localStorage.setItem('isLoggedIn', 'true');
  showToast('✅ Login Berhasil!');
  closeModal();
  updateNavbarUI(); // Tambahkan ini agar tombol langsung berubah
}

// ═══════ TOAST ═══════
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
}

// ═══════ NAVIGATION ═══════
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
}

// ═══════ INIT ═══════
document.getElementById('login-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

function handleAuth() {
    console.log("Auth diproses");
    // isi logika auth Anda
}

function filterVideos(kategori) {
    console.log("Filter: " + kategori);
    // isi logika filter Anda
}

// ═══════ STATE ═══════
let isAdmin = false;
let currentFilter = 'Semua';

// ═══════ DEFAULT DATA ═══════
const DEFAULT_VIDEOS = [
  { id: 1, title: "How to Answer 'Tell Me About Yourself'", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Interview Dasar" },
  { id: 2, title: "5 Common Interview Questions & Answers", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Interview Dasar" },
  { id: 3, title: "What Are Your Strengths & Weaknesses?", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Interview Dasar" },
  { id: 4, title: "Technical Interview: Data Structures Basics", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Interview Teknis" },
  { id: 5, title: "Behavioral Interview with STAR Method", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Interview Teknis" },
  { id: 6, title: "Professional Email Writing in English", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Bahasa Inggris Umum" },
  { id: 7, title: "Business Vocabulary: Meetings & Presentations", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Bahasa Inggris Umum" },
  { id: 8, title: "Salary Negotiation Phrases in English", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Interview Dasar" },
  { id: 9, title: "System Design Interview Basics", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "Interview Teknis" },
];

const INTERVIEW_QUESTIONS = [
  "Tell me about yourself.",
  "What are your greatest strengths?",
  "What are your weaknesses?",
  "Why should we hire you?",
  "Where do you see yourself in 5 years?",
  "Why do you want to work here?",
  "Describe a challenge you faced and how you overcame it.",
  "What is your greatest professional achievement?",
  "How do you handle stress and pressure?",
  "Tell me about a time you worked in a team.",
  "Why are you leaving your current job?",
  "What motivates you?",
  "Describe your ideal work environment.",
  "How do you prioritize your work?",
  "What are your salary expectations?",
  "Tell me about a time you made a mistake.",
  "What do you know about our company?",
  "How do you handle conflict with a coworker?",
  "What are your long-term career goals?",
  "Do you have any questions for us?"
];

const VOCAB_DATA = [
  { verb: "Developed", arti: "Mengembangkan", contoh: "I developed a new marketing strategy." },
  { verb: "Implemented", arti: "Mengimplementasikan", contoh: "I implemented a CI/CD pipeline." },
  { verb: "Managed", arti: "Mengelola", contoh: "I managed a team of 10 engineers." },
  { verb: "Achieved", arti: "Mencapai", contoh: "I achieved 150% of my sales target." },
  { verb: "Collaborated", arti: "Berkolaborasi", contoh: "I collaborated with cross-functional teams." },
  { verb: "Optimized", arti: "Mengoptimalkan", contoh: "I optimized database query performance." },
  { verb: "Streamlined", arti: "Menyederhanakan proses", contoh: "I streamlined the onboarding process." },
  { verb: "Spearheaded", arti: "Memimpin / Menginisiasi", contoh: "I spearheaded a digital transformation project." },
  { verb: "Increased", arti: "Meningkatkan", contoh: "I increased user retention by 30%." },
  { verb: "Reduced", arti: "Mengurangi", contoh: "I reduced operational costs by 20%." },
  { verb: "Coordinated", arti: "Mengoordinasikan", contoh: "I coordinated events with 500+ attendees." },
  { verb: "Facilitated", arti: "Memfasilitasi", contoh: "I facilitated weekly team stand-ups." },
  { verb: "Launched", arti: "Meluncurkan", contoh: "I launched a new product feature." },
  { verb: "Analyzed", arti: "Menganalisis", contoh: "I analyzed customer behavior data." },
  { verb: "Delivered", arti: "Menyelesaikan/Menyampaikan", contoh: "I delivered the project on time and within budget." },
];

// ═══════ localStorage HELPERS ═══════
function loadVideos() {
  const stored = localStorage.getItem('eel_videos');
  return stored ? JSON.parse(stored) : DEFAULT_VIDEOS;
}
function saveVideos(videos) {
  localStorage.setItem('eel_videos', JSON.stringify(videos));
}
function getNextId(videos) {
  return videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1;
}

// ═══════ NAVIGATION ═══════
const pages = ['home', 'lessons', 'practice', 'premium', 'contact'];
function navigate(page) {
  pages.forEach(p => {
    document.getElementById('page-' + p).classList.remove('active');
    document.getElementById('nav-' + p)?.classList.remove('active');
  });
  document.getElementById('page-' + page).classList.add('active');
  document.getElementById('nav-' + page)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'lessons') renderVideos();
}

function toggleMobile() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ═══════ AUTH ═══════
function handleAuth() {
  if (isAdmin) {
    doLogout();
  } else {
    openModal();
  }
}
function openModal() {
  document.getElementById('login-modal').classList.add('show');
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-error').classList.add('hidden');
  setTimeout(() => document.getElementById('login-user').focus(), 100);
}
function closeModal() {
  document.getElementById('login-modal').classList.remove('show');
}
function doLogin() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value.trim();
  const err = document.getElementById('login-error');
  if (u === 'admin' && p === 'admin123') {
    isAdmin = true;
    closeModal();
    updateAuthUI();
    showToast('✅ Login berhasil! Selamat datang, Admin.');
  } else {
    err.textContent = '⚠️ Username atau password salah. Coba: admin / admin123';
    err.classList.remove('hidden');
  }
}
function doLogout() {
  isAdmin = false;
  updateAuthUI();
  showToast('👋 Kamu telah logout.');
  renderVideos();
}
function updateAuthUI() {
  const btn = document.getElementById('auth-btn');
  const welcome = document.getElementById('welcome-text');
  const adminForm = document.getElementById('admin-form-section');
  if (isAdmin) {
    btn.textContent = 'Log Out';
    btn.className = 'btn-logout';
    welcome.classList.remove('hidden');
    adminForm?.classList.remove('hidden');
  } else {
    btn.textContent = 'Log In';
    btn.className = 'btn-login';
    welcome.classList.add('hidden');
    adminForm?.classList.add('hidden');
  }
}

// ═══════ VIDEOS ═══════
let activeFilter = 'Semua';

function filterVideos(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderVideos();
}

function renderVideos() {
  const videos = loadVideos();
  const filtered = activeFilter === 'Semua' ? videos : videos.filter(v => v.category === activeFilter);
  const grid = document.getElementById('video-grid');
  const empty = document.getElementById('no-videos');
  // Admin form visibility
  if (isAdmin) {
    document.getElementById('admin-form-section').classList.remove('hidden');
  }
  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  grid.innerHTML = filtered.map(v => `
    <div class="video-card" id="card-${v.id}">
      <div class="video-embed" style="background:#0A192F;">
        <iframe src="${v.embed}" title="${v.title}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
      <div class="p-4">
        <span class="tag-badge mb-2 inline-block">${v.category}</span>
        <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;color:var(--navy);margin-top:4px;margin-bottom:8px;line-height:1.4;">${v.title}</h3>
        <div class="flex items-center justify-between mt-2">
          <span style="color:#94A3B8;font-size:0.78rem;">⏱ 1 menit</span>
          ${isAdmin ? `<button onclick="deleteVideo(${v.id})" style="background:#FEF2F2;color:#EF4444;border:1.5px solid #FECACA;padding:4px 12px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;" onmouseover="this.style.background='#FEE2E2'" onmouseout="this.style.background='#FEF2F2'">🗑 Hapus</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function addVideo() {
  const title = document.getElementById('new-title').value.trim();
  const link = document.getElementById('new-link').value.trim();
  const category = document.getElementById('new-category').value;
  if (!title || !link) {
    showToast('⚠️ Judul dan link video wajib diisi!'); return;
  }
  const videos = loadVideos();
  const newVideo = { id: getNextId(videos), title, embed: link, category };
  videos.push(newVideo);
  saveVideos(videos);
  document.getElementById('new-title').value = '';
  document.getElementById('new-link').value = '';
  activeFilter = 'Semua';
  document.querySelectorAll('.filter-tab').forEach((t, i) => t.classList.toggle('active', i === 0));
  renderVideos();
  showToast('✅ Video berhasil ditambahkan!');
}

function deleteVideo(id) {
  if (!confirm('Yakin ingin menghapus video ini?')) return;
  const videos = loadVideos().filter(v => v.id !== id);
  saveVideos(videos);
  renderVideos();
  showToast('🗑 Video berhasil dihapus.');
}

// ═══════ PRACTICE: QUESTION GENERATOR ═══════
function generateQuestion() {
  const q = INTERVIEW_QUESTIONS[Math.floor(Math.random() * INTERVIEW_QUESTIONS.length)];
  const el = document.getElementById('question-display');
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  setTimeout(() => {
    el.innerHTML = `<span style="font-size:1.1rem;">"${q}"</span>`;
    el.style.opacity = '1';
    el.style.transform = 'none';
  }, 200);
}

// ═══════ PRACTICE: STAR METHOD ═══════
function downloadSTAR() {
  const s = document.getElementById('star-s').value.trim();
  const t = document.getElementById('star-t').value.trim();
  const a = document.getElementById('star-a').value.trim();
  const r = document.getElementById('star-r').value.trim();
  if (!s && !t && !a && !r) {
    showToast('⚠️ Isi minimal satu kolom STAR terlebih dahulu!'); return;
  }
  const content = `E-EL Easy English Learn — STAR Method Answer
${'='.repeat(50)}

SITUATION (S):
${s || '(belum diisi)'}

TASK (T):
${t || '(belum diisi)'}

ACTION (A):
${a || '(belum diisi)'}

RESULT (R):
${r || '(belum diisi)'}

${'='.repeat(50)}
Generated by E-EL Easy English Learn
Platform Micro-Learning Bahasa Inggris
www.eel-learn.id`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a2 = document.createElement('a');
  a2.href = url; a2.download = 'STAR_Answer_EEL.txt'; a2.click();
  URL.revokeObjectURL(url);
  showToast('✅ Jawaban STAR berhasil didownload!');
}

function clearSTAR() {
  ['star-s','star-t','star-a','star-r'].forEach(id => document.getElementById(id).value = '');
  showToast('🗑 Form STAR berhasil dikosongkan.');
}

// ═══════ VOCAB TABLE ═══════
function renderVocab() {
  const tbody = document.getElementById('vocab-tbody');
  tbody.innerHTML = VOCAB_DATA.map((v, i) => `
    <tr>
      <td><strong style="color:var(--navy);">${v.verb}</strong></td>
      <td style="color:#4B5563;">${v.arti}</td>
      <td style="color:#64748B;font-style:italic;font-size:0.82rem;">${v.contoh}</td>
    </tr>
  `).join('');
}

// ═══════ CONTACT ═══════
function submitContact() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg = document.getElementById('contact-msg').value.trim();
  if (!name || !email || !msg) { showToast('⚠️ Lengkapi semua field terlebih dahulu!'); return; }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) { showToast('⚠️ Format email tidak valid!'); return; }
  ['contact-name','contact-email','contact-msg'].forEach(id => document.getElementById(id).value = '');
  showToast('✅ Pesan terkirim! Kami akan membalas dalam 1×24 jam.');
}

// ═══════ CLOSE MODAL ON BACKDROP ═══════
document.getElementById('login-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ═══════ DAILY DATE ═══════
function setDailyDate() {
  const el = document.getElementById('daily-date');
  if (el) {
    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    el.textContent = new Date().toLocaleDateString('id-ID', opts);
  }
}

// ═══════ INIT ═══════
document.addEventListener('DOMContentLoaded', () => {
  setDailyDate();
  renderVocab();
  // Restore videos from localStorage (preserves admin changes across refreshes)
  if (!localStorage.getItem('eel_videos')) {
    saveVideos(DEFAULT_VIDEOS);
  }
});