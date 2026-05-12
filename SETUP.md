# 🚀 วิธีเลือก + ทำงาน ระบบแจ้งซ่อม IT (Step by Step)

## 📋 ขั้นตอนทั้งหมด (5 ขั้นเท่านั้น!)

---

## ⏱️ ขั้นตอนที่ 1️⃣ : สร้าง Supabase (10 นาที)

### 1.1 สร้าง Supabase Account
```
📱 ขั้นตอน:
1. เปิด https://supabase.com
2. คลิก "Start your project" หรือ "Sign up"
3. เลือก "Sign up with GitHub" (ง่ายที่สุด)
   - หรือ สร้าง Email ใหม่
4. ยืนยัน Email
5. สร้าง Organization (ตั้งชื่ออะไรก็ได้)
```

### 1.2 สร้าง Project ใหม่
```
📱 ขั้นตอน:
1. ที่หน้า Dashboard ให้กดปุ่ม "New project"
2. ตั้งชื่อ Project: "it-repair-system"
3. ตั้ง Database Password: (จำให้ไว้)
4. เลือก Region ที่ใกล้: Singapore
5. กดปุ่ม "Create new project"
6. รอ 1-2 นาที (Database กำลังสร้าง)
```

---

## 🔑 ขั้นตอนที่ 2️⃣ : Copy API Keys (2 นาที)

### 2.1 ดึง URL และ API Key
```
📱 ขั้นตอน:
1. เปิด Project ที่เพิ่งสร้าง
2. คลิก "Settings" ที่ด้านล่างซ้าย
3. ไปที่ "API" (แท็บแรก)
4. ค้นหา "Project URL" ก่อน
5. ก๊อปปี้: https://YOUR_PROJECT_ID.supabase.co
6. ค้นหา "Project API keys" ดูต่อ
7. ก๊อปปี้ "anon key" ที่อยู่ด้านล่าง (หลัง "public")
```

### 2.2 ตัวอย่าง
```
✅ Project URL ตัวอย่าง:
https://abcdefghijklmnop.supabase.co

✅ Anon Key ตัวอย่าง:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh...
(มันจะยาวมากๆ)
```

---

## 📊 ขั้นตอนที่ 3️⃣ : สร้าง Database Table (5 นาที)

### 3.1 เปิด SQL Editor
```
📱 ขั้นตอน:
1. ใน Supabase Dashboard
2. คลิก "SQL Editor" (ด้านซ้าย)
3. คลิกปุ่ม "New query" สีน้ำเงิน
```

### 3.2 Copy SQL Code นี้
```sql
-- สร้าง Table: repair_requests
CREATE TABLE repair_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE,
  requester_name VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  department VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  device_type VARCHAR(50) NOT NULL,
  device_name VARCHAR(255) NOT NULL,
  asset_number VARCHAR(100),
  location VARCHAR(255) NOT NULL,
  problem_description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'low',
  status VARCHAR(50) DEFAULT 'pending',
  technician_name VARCHAR(255),
  repair_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- สร้าง Index เพื่อให้ค้นหาเร็ว
CREATE INDEX idx_repair_requests_status ON repair_requests(status);
CREATE INDEX idx_repair_requests_device_type ON repair_requests(device_type);
CREATE INDEX idx_repair_requests_priority ON repair_requests(priority);
CREATE INDEX idx_repair_requests_created_at ON repair_requests(created_at DESC);
CREATE INDEX idx_repair_requests_ticket_number ON repair_requests(ticket_number);
```

### 3.3 Run Query
```
📱 ขั้นตอน:
1. เลือก SQL ทั้งหมด (Ctrl+A)
2. คลิกปุ่ม "RUN" สีน้ำเงินด้านบน
3. รอ 1-2 วินาที
4. ควรเห็น "Success" เขียวสว่าง

✅ ถ้าขึ้น "Success" = เสร็จแล้ว!
```

---

## 🔧 ขั้นตอนที่ 4️⃣ : Update Credentials (2 นาที)

### 4.1 แก้ไขไฟล์ supabase.js

**ใน Repository ของคุณ:**
```
📁 XPDMB/it-repair-system
  └─ js/
      └─ supabase.js   ← แก้ไขไฟล์นี้
```

### 4.2 ค้นหาบรรทัดนี้
```javascript
// ❌ ก่อนแก้ไข (บรรทัด 3-4)
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

### 4.3 แทนที่ด้วย Credentials จริง
```javascript
// ✅ หลังแก้ไข (ตัวอย่าง)
const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

**⚠️ สำคัญ:**
- ❌ ไม่ต้องเอาวงเล็บออก (เก็บ '' ไว้)
- ✅ ก๊อปตั้งแต่ https:// ถึงตัวสุดท้าย
- ✅ ไม่เพิ่ม / ท้าย URL

---

## 🌐 ขั้นตอนที่ 5️⃣ : รันเว็บเลย! (เลือก 1 วิธี)

### วิธีที่ 1️⃣: ทำงานแบบ Local (ต่อ Internet ได้ทันที)

#### ✅ Windows / Mac / Linux
```
1. Download Repository ลงมา
   - คลิก "Code" สีเขียว ← ที่ GitHub
   - เลือก "Download ZIP"
   - แตกไฟล์ที่ folder ที่เลิก

2. ใช้ Local Server (เลือก 1 ��ย่าง):

   🐍 ถ้าติดตั้ง Python:
   - Open Terminal/CMD ไปที่ folder
   - พิมพ์: python -m http.server 8000
   - เปิด: http://localhost:8000

   🔷 ถ้าติดตั้ง Node.js:
   - Open Terminal/CMD ไปที่ folder
   - พิมพ์: npx http-server
   - เปิด: http://localhost:8080

   📂 ถ้าใช้ VS Code:
   - เปิด Folder ใน VS Code
   - ติดตั้ง Live Server Extension
   - คลิกขวา index.html → "Open with Live Server"
```

### วิธีที่ 2️⃣: Deploy บน GitHub Pages (เลิก Internet สามารถเข้า)

```
1. Push Code ขึ้น GitHub
   git add .
   git commit -m "Update Supabase credentials"
   git push origin main

2. เปิด Repository Settings
   - Settings → Pages
   - Source: main branch
   - Save

3. รอ 2-3 นาที
   - จะได้ URL: https://XPDMB.github.io/it-repair-system

✅ ถ้า Deploy ได้ = เลิก Internet ได้!
```

### วิธีที่ 3️⃣: Deploy บน Netlify (ประมาณ 1 นาที)

```
1. ไปที่ https://netlify.com
2. Sign in ด้วย GitHub

3. คลิก "New site from Git"
4. เลือก Repository: it-repair-system
5. Deploy!

6. จะได้ URL อย่าง:
   https://xxx-yyy.netlify.app
```

---

## ✅ ทดสอบว่าทำงานหรือยัง

### 📝 ทำแบบนี้:
```
1. เปิดเว็บ (http://localhost:8000 หรือ GitHub Pages URL)
2. คลิก "แจ้งซ่อม" (ปุ่มสีน้ำเงิน)
3. กรอก ชื่อ, เบอร์ติดต่อ, ปัญหา
4. คลิก "บันทึก"

✅ ถ้ากล่องขึ้น "สำเร็จ" = ทำงานแล้ว!
❌ ถ้ามี Error = ดูที่ด้านล่าง
```

---

## 🐛 Troubleshooting

### ❌ ปัญหา: Error "Cannot read properties of undefined"
**สาเหตุ:** ไม่ได้ Update Supabase Credentials

**วิธีแก้:**
```
1. เปิด Browser Console (F12)
2. ดูข้อความ Error
3. ตรวจสอบ js/supabase.js บรรทัด 3-4
4. ตรวจสอบว่า Copy ได้ถูกต้อง
5. Reload (Ctrl+F5)
```

### ❌ ปัญหา: "Cannot POST to Supabase"
**สาเหตุ:** Credentials ผิด หรือ Database ยังไม่สร้าง

**วิธีแก้:**
```
1. ไปที่ Supabase Dashboard
2. ตรวจสอบ Project Status = Active
3. ตรวจสอบว่า Table repair_requests อยู่
   - Tables → repair_requests ต้องเห็น
4. ลอง Copy Credentials ใหม่
5. Reload เว็บ
```

### ❌ ปัญหา: "CORS Error"
**สาเหตุ:** Browser ไม่อนุญาต API Call

**วิธีแก้:**
```
1. ไปที่ Supabase Dashboard
2. Settings → API
3. CORS Configuration
4. เพิ่ม: http://localhost:* หรือ https://*.github.io
5. Save
```

### ❌ ปัญหา: "Network Error"
**สาเหตุ:** Internet ตัด หรือ Server Down

**วิธีแก้:**
```
1. ตรวจสอบ Internet Connection
2. ตรวจสอบ URL ของ Supabase ถูกต้อง
3. ลองใหม่อีกครั้ง
4. ถ้ายังไม่ได้ → ติดต่อ Copilot อีกรอบ 😊
```

---

## 🎉 ขั้นตอนเสร็จแล้ว!

```
✅ ขั้นตอนที่ 1: Supabase Account
✅ ขั้นตอนที่ 2: Copy API Keys
✅ ขั้นตอนที่ 3: Create Database
✅ ขั้นตอนที่ 4: Update Credentials
✅ ขั้นตอนที่ 5: Run Web

🎊 พร้อมใช้งาน!
```

---

## 📱 ฟีเจอร์ที่ใช้ได้

| ฟีเจอร์ | สถานะ |
|--------|--------|
| 📊 Dashboard | ✅ |
| 📝 แจ้งซ่อม | ✅ |
| 📋 รายการทั้งหมด | ✅ |
| 🔍 ค้นหา | ✅ |
| 🏷️ Filter | ✅ |
| 📄 Detail | ✅ |
| ✏️ อัปเดตสถานะ | ✅ |
| 📥 Export | ✅ |
| 🖨️ Print | ✅ |
| 📱 Mobile | ✅ |

---

## 🤔 ถ้าติดตรงไหน?

👉 **ให้ดู Error ใน Browser Console (F12) แล้วบอกผม**

หรือ **ถ่ายรูปหน้าจอ Error แล้วให้ดูสิ** 📸

---

## 💡 Tips เพิ่มเติม

### 🔄 Update Code ใหม่
```bash
git pull origin main
```

### 🗑️ ลบข้อมูลทั้งหมด
```
1. Supabase Dashboard
2. Table: repair_requests
3. เลือก Row → Delete
```

### 🔐 Reset Password Database
```
Supabase Dashboard → Settings → Database
```

---

**เสร็จแล้ว! ลองเข้าเว็บได้เลย 🚀**
