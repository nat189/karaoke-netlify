# 🎤 Napat Karaoke (Serverless)

เว็บแอปร้องคาราโอเกะสไตล์ Serverless 100% ใช้งานฟรี ไม่ต้องเปิดเซิร์ฟเวอร์หรือคอมพิวเตอร์ทิ้งไว้ พร้อมรองรับทั้งการใช้งานแบบจอเดี่ยวและแยก 2 จอ (Controller + Display)

---

## ✨ ฟีเจอร์หลัก (Features)
- 🔍 **ค้นหาเพลงคาราโอเกะสดๆ:** ค้นหาได้ 20 เพลงต่อครั้ง ผ่าน Netlify Functions + `yt-search`
- 🖥️ **โหมดจอเดี่ยว (`/` หรือ `index.html`):** รวมจอเล่น YouTube, ช่องค้นหา, ปุ่มควบคุม และคิวเพลงไว้ในหน้าเดียว
- 📱 **โหมดแยก 2 จอ (`display.html` & `controller.html`):**
  - **Display (จอใหญ่/ทีวี):** มี QR Code สร้างห้องอัตโนมัติ พร้อมระบบซ่อน QR Code หลังเล่น 15 วินาที และโชว์คืนก่อนจบเพลง 15 วินาที
  - **Controller (มือถือ):** สแกนเชื่อมต่อผ่าน PeerJS P2P สำหรับจองเพลง, ข้ามเพลง, หยุดชั่วคราว/เล่นต่อ
- 📋 **จัดการคิวเพลง:** แสดงรายการคิว และกดค้าง 2 วินาทีเพื่อลบเพลงออกจากคิว

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)
```text
├── netlify/
│   └── functions/
│       └── search.js       # Backend Function สำหรับค้นหาเพลงด้วย yt-search
├── public/
│   ├── index.html          # โหมดเล่นจอเดี่ยว (All-in-one)
│   ├── display.html        # โหมดจอแสดงผลใหญ่ + QR Code
│   └── controller.html     # โหมดรีโมทมือถือสำหรับจองเพลง
├── package.json            # Node.js dependencies
└── netlify.toml            # คอนฟิกการ Build และ Publish ของ Netlify
