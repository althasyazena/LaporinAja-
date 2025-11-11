// Render Data
function renderReports(list = reports) {
    const container = document.getElementById("reportsList");
    container.innerHTML = "";

    list.forEach((report) => {
        const card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
        <div class="report-header">
            <h3 class="report-title">${report.title}</h3>
            <span class="report-status status">
            ${STATUS_TEXT[report.status]}
            </span>
        </div>

        <span class="report-category">${CATEGORY_TEXT[report.category]}</span>
        <p class="report-desc">${report.description}</p>

        <div class="report-meta">
            <div class="report-location">
                <i class="ri-map-pin-2-line"></i>
                <span>${report.location}</span>
            </div>
            <span>${new Date(report.createdAt).toLocaleDateString()}</span>
        </div>

        <div class="report-actions">
            <button class="btn-action btn-detail" onclick="openDetailModal('${report.id}')">Detail</button>
            <button class="btn-action btn-delete" onclick="deleteReport('${report.id}')">Hapus</button>
        </div>
        `;

        container.appendChild(card)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    renderReports();
    updateStatus();
})

function updateStatus() {
    document.getElementById("stat-total").textContent = reports.length;
    document.getElementById("stat-pending").textContent = reports.filter(report => report.status === "pending").length;
    document.getElementById("stat-progress").textContent = reports.filter(report => report.status === "progress").length;
    document.getElementById("stat-resolved").textContent = reports.filter(report => report.status === "resolved").length;
}

const modal = document.getElementById("modalTambah");
const form = document.getElementById("addForm");

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addReport();
    closeModal();
})

// --- Search Laporan ---
const btnSearch = document.getElementById("btnSearch");

if (btnSearch) {

    btnSearch.addEventListener("click", () => {
        const keyword = searchInput.value.toLowerCase();

        const filteredReports = reports.filter(report =>
            report.title.toLowerCase().includes(keyword) ||
            report.description.toLowerCase().includes(keyword) ||
            (report.location && report.location.toLowerCase().includes(keyword))
        );

        renderReports(filteredReports);
    });
}

const modalDetail = document.getElementById("modalDetail");

function openDetailModal(id) {
  const report = reports.find(r => r.id === id);
  if (!report) return alert("Laporan tidak ditemukan");

// Modal Detail
document.getElementById("detail-judul").textContent = report.title;
document.getElementById("detail-kategori").textContent = CATEGORY_TEXT[report.category] || report.category;
document.getElementById("detail-deskripsi").textContent = report.description;
document.getElementById("detail-lokasi").textContent = report.location || "-";
document.getElementById("detail-kecamatan").textContent = report.kecamatan || "-";
document.getElementById("detail-kelurahan").textContent = report.kelurahan || "-";

const statusElement = document.getElementById("detail-status");
statusElement.textContent = STATUS_TEXT[report.status] || report.status;
statusElement.className = "status-badge " + report.status.toLowerCase();

document.getElementById("detail-tanggal").textContent = new Date(report.createdAt).toLocaleString();
document.getElementById("detail-nama").textContent = report.name;
document.getElementById("detail-email").textContent = report.email;
document.getElementById("detail-telepon").textContent = report.phone;

modalDetail.style.display = "flex";
}

function closeDetailModal() {
  modalDetail.style.display = "none";
}

// Inisialisasi VanillaTilt pada elemen span
VanillaTilt.init(document.querySelectorAll(".logo-text"), {
  max: 15,
  speed: 400,
  scale: 1.1
});

// FAQ Toggle Logic
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});

// Navbar
const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon && navLinks) {
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
