# Budget Tracker - Aplikasi Penganggaran

## Deskripsi Proyek
Budget Tracker adalah aplikasi web interaktif untuk mengelola keuangan pribadi. Pengguna dapat mencatat pemasukan dan pengeluaran, melihat ringkasan saldo real-time, serta mengedit dan menghapus transaksi dengan mudah menggunakan localStorage browser (tanpa aplikasi PHP dan Database, jadinya local).

## Fitur Utama
Tambah transaksi (pemasukan/pengeluaran)
Kategorisasi transaksi (Gaji, Makanan, Transportasi, dll)
Edit dan hapus transaksi via modal
Ringkasan saldo (income, expense, balance)
Daftar transaksi terurut berdasarkan tanggal
Penyimpanan data dengan localStorage
Alert notifikasi untuk feedback pengguna
Responsive design (mobile-friendly)

## Screenshoot Aplikasi
![image alt]([temp_link_hehe](https://github.com/anggoroo02/uts-budget-tracker/blob/55ccdcd338a55e8dbda139c215334255e4728cce/images/temp-img.jpg))

## Implementasi Teknis

### HTML & CSS
- Struktur HTML semantik dengan form elements yang proper
- CSS Modern: Flexbox, Grid, CSS Variables untuk consistency
- Animasi smooth untuk UX yang lebih baik
- Color scheme profesional dengan gradient backgrounds
- Responsive layout dengan media queries

### JavaScript
- **Event Handling**: submit form, click buttons, modal interactions
- **DOM Manipulation**: render transaction list, update summary, add/remove elements
- **State Management**: array transactions dengan localStorage persistence
- **Validasi**: form validation sebelum submit
- **Utility Functions**: formatCurrency, formatDate, showAlert

### Tahapan Pengembangan
1. **Desain di Figma**: Wireframe halaman utama & modal edit
2. **Implementasi HTML**: Struktur markup dengan semantic elements
3. **Styling CSS**: Layout, color scheme, responsiveness
4. **Interaktivitas JS**: Form handling, CRUD operations, UI updates

## Cara Menggunakan
1. Isi form dengan deskripsi, jumlah, kategori, dan tipe transaksi
2. Klik "Tambah Transaksi" untuk menyimpan
3. Lihat ringkasan saldo real-time di atas
4. Edit atau hapus transaksi dengan tombol di setiap item
5. Data otomatis tersimpan di browser (localStorage)

## Link Figma
[Klik di sini untuk melihat desain Figma](https://www.figma.com/design/ejPWmkrCCmI19EvQVaU8gS/Budget-Tracker---Aplikasi-Penganggaran?node-id=1-902&t=vgG52ZR0wLcOWuYY-1)

## Technologies Used
- HTML5 (Semantic markup)
- CSS3 (Flexbox, Grid, Animations, Variables)
- Vanilla JavaScript (ES6+)
- localStorage API

## Testing
- Form validation bekerja
- Transaksi dapat ditambah/edit/hapus
- Summary terupdate otomatis
- Data persisten setelah refresh
- Responsive di mobile/tablet/desktop
- Alert notifikasi tampil dengan baik

**Dibuat untuk UTS Pemrograman Front-End**
