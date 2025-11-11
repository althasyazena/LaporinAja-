// Menyimpan Seluruh Data Report ke Local Storage
function saveReports() {
    localStorage.setItem("reports", JSON.stringify(reports));
}

function addReport() {
    // Variable UNtuk Menyimpan Data Report
    const report = {
        id: Date.now().toString(),
        title: document.getElementById("judul").value,
        category: document.getElementById("kategori").value,
        description: document.getElementById("deskripsi").value,
        kecamatan: document.getElementById("kecamatan").value,
        kelurahan: document.getElementById("kelurahan").value,
        name: document.getElementById("nama").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("telepon").value,

        status: "pending",
        createdAt: new Date().toISOString(),
        coordinates: null,
    }

    // Meminta Izin Lokasi ke Device
    if(navigator.geolocation) {
        // Apabila Device Support Untuk Fitur GPS
        navigator.geolocation.getCurrentPosition(
            // pos : Jika Berhasil Mendapatkan Lokasi
            (pos) => {
                report.coordinates = { //Nested Object
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                report.location = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
                // Menyimpan ke Array dan Local Storage

                reports.unshift(report);
                saveReports();
                closeModal();
                renderReports();
                updateStatus();
                initMap();
                
                alert("Laporan Berhasil Ditambahkan")
            },
            // err : Jika Gagal Mendapatkan Lokasi
            (err) => {
                console.warn("Gagal ambil lokasi", err.message)
            }
        )
    } else {
        // Apabila Device Tidak Support Untuk Fitur GPS
        alert("Browse Kamu Tidak Mendukung Geolocation");
    }
}

// Menghapus Data Report Berdasarkan ID
function deleteReport(id) {
    const yakin = confirm("Yakin ingin hapus laporan ini?");
    if(yakin) {
        reports = reports.filter(report => report.id !== id);

        saveReports(); //Bertugas untuk menyimpan di local storage
        renderReports(); //Untuk me-render ulang tampilannya
    }
}