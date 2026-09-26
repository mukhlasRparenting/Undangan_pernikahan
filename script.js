// 1. ANIMASI GUGURAN KELOPAK BUNGA
function createPetals() {
    const container = document.getElementById('petalContainer');
    const petalCount = 15; // Jumlah kelopak di layar

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Ukuran acak
        const size = Math.random() * 12 + 8;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        // Posisi horizontal acak
        petal.style.left = `${Math.random() * 100}%`;
        
        // Durasi & delay animasi acak
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(petal);
    }
}

// 2. TOMBOL BUKA UNDANGAN & AUDIO
function bukaUndangan() {
    document.getElementById('coverPage').style.display = 'none';
    document.getElementById('isiUndangan').style.display = 'block';
    
    // Tampilkan & putar audio
    const audioControl = document.getElementById('audioControl');
    const bgMusic = document.getElementById('bgMusic');
    
    audioControl.style.display = 'flex';
    bgMusic.play();
    document.getElementById('audioIcon').className = 'fas fa-music';

    // Scroll otomatis ke paling atas isi undangan
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAudio() {
    const bgMusic = document.getElementById('bgMusic');
    const audioIcon = document.getElementById('audioIcon');

    if (bgMusic.paused) {
        bgMusic.play();
        audioIcon.className = 'fas fa-music';
    } else {
        bgMusic.pause();
        audioIcon.className = 'fas fa-volume-mute';
    }
}

// 3. COUNTDOWN TIMER PERNIKAHAN
const targetDate = new Date("October 24, 2026 08:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("cd-days").innerText = "00";
        document.getElementById("cd-hours").innerText = "00";
        document.getElementById("cd-minutes").innerText = "00";
        document.getElementById("cd-seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("cd-days").innerText = days < 10 ? `0${days}` : days;
    document.getElementById("cd-hours").innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById("cd-minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("cd-seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
}
setInterval(updateCountdown, 1000);

// 4. LIGHTBOX GALERI FOTO
function openModal(element) {
    const modal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("imgModal");
    const captionText = document.getElementById("captionModal");

    modal.style.display = "block";
    modalImg.src = element.src;
    captionText.innerHTML = element.alt;
}

function closeModal() {
    document.getElementById("galleryModal").style.display = "none";
}

// 5. UCAPAN TAMU (LOCALSTORAGE)
function muatUcapan() {
    const list = document.getElementById('ucapanList');
    if (!list) return;

    const ucapanTersimpan = JSON.parse(localStorage.getItem('ucapanUndangan')) || [];
    list.innerHTML = '';

    ucapanTersimpan.forEach(item => {
        const ucapanCard = document.createElement('div');
        ucapanCard.classList.add('ucapan-card');
        ucapanCard.innerHTML = `<strong>${escapeHtml(item.nama)}</strong><p>${escapeHtml(item.pesan)}</p>`;
        list.appendChild(ucapanCard);
    });
}

function tambahUcapan(event) {
    event.preventDefault();
    const namaInput = document.getElementById('namaPengirim');
    const pesanInput = document.getElementById('pesanUcapan');

    const nama = namaInput.value.trim();
    const pesan = pesanInput.value.trim();

    if (!nama || !pesan) return;

    const ucapanTersimpan = JSON.parse(localStorage.getItem('ucapanUndangan')) || [];
    ucapanTersimpan.unshift({ nama, pesan });

    localStorage.setItem('ucapanUndangan', JSON.stringify(ucapanTersimpan));

    namaInput.value = '';
    pesanInput.value = '';
    muatUcapan();
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

// 6. FUNGSI SALIN NO REKENING
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor berhasil disalin!");
    });
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    createPetals();
    updateCountdown();
    muatUcapan();
});