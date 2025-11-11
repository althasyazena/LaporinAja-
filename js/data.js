// Kategori
const CATEGORY_TEXT = {
    jalan: "Jalan & Infrastrukstur",
    kebersihan: "Kebersihan",
    lampu: "Lampu Jalan",
    drainase: "Drainase",
    fasilitas: "Fasilitas Umum",
    lainnya: "Lainnya",
};

const STATUS_TEXT = {
    pending: "Menunggu",
    progress: "Diproses",
    resolved: "Selesai",
};

let reports = JSON.parse(localStorage.getItem("reports")) || [];