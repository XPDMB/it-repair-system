# ระบบแจ้งซ่อม IT

ระบบจัดการแจ้งซ่อมอุปกรณ์ IT สำหรับองค์กร พัฒนาด้วย HTML, CSS (Tailwind), JavaScript และ Supabase

## 📋 ฟีเจอร์หลัก

### 📊 Dashboard
- ✅ สถิติรวม: รอดำเนินการ, กำลังซ่อม, ซ่อมเสร็จ, ยกเลิก
- ✅ การ์ดแสดงจำนวนแต่ละสถานะพร้อมไอคอน
- ✅ แสดงแจ้งซ่อมล่าสุด
- ✅ ปุ่มการดำเนินการอย่างรวดเร็ว

### 📝 ฟอร์มแจ้งซ่อม
- ✅ ข้อมูลผู้แจ้ง (ชื่อ, แผนก, เบอร์ติดต่อ, อีเมล)
- ✅ ข้อมูลอุปกรณ์ (ประเภท, ชื่อ, หมายเลขครุภัณฑ์, สถานที่)
- ✅ รายละเอียดปัญหา (อาการเสีย)
- ✅ ระดับความเร่งด่วน (ปกติ, ปานกลาง, เร่งด่วน)
- ✅ Validation form
- ✅ สร้างหมายเลขแจ้งซ่อมอัตโนมัติ

### 📋 รายการแจ้งซ่อม
- ✅ ค้นหาตามชื่อ, หมายเลขครุภัณฑ์, ผู้แจ้ง
- ✅ Filter ตามประเภทอุปกรณ์, สถานะ, ความเร่งด่วน
- ✅ แสดงเป็น Card Layout
- ✅ Export เป็น JSON และ CSV
- ✅ Responsive รองรับมือถือ

### 📄 รายละเอียดแจ้งซ่อม
- ✅ ดูข้อมูลเต็ม
- ✅ อัปเดตสถานะ
- ✅ บันทึกผู้ดำเนินการและหมายเหตุ
- ✅ ประวัติการอัปเดต (Timeline)
- ✅ ลบแจ้งซ่อม
- ✅ พิมพ์รายการ

## 🛠️ Tech Stack

- **Frontend**: 
  - HTML5
  - CSS3 + Tailwind CSS
  - Vanilla JavaScript (ES6+)

- **Database**: 
  - Supabase (PostgreSQL)

- **Hosting**: 
  - GitHub Pages (หรือ Netlify, Vercel)

- **Font**: 
  - Sarabun (Google Fonts)

## 📁 โครงสร้าง Project

```
it-repair-system/
├── index.html              # หน้า Dashboard
├── request.html            # ฟอร์มแจ้งซ่อม
├── list.html               # รายการแจ้งซ่อมทั้งหมด
├── detail.html             # รายละเอียดใบแจ้งซ่อม
├── css/
│   └── style.css           # Custom CSS
├── js/
│   ├── app.js              # Logic หลัก
│   ├── supabase.js         # เชื่อมต่อ Database
│   └── utils.js            # Utility functions (50+ functions)
└── README.md               # Documentation
```

## 🚀 วิธีติดตั้ง

### ข้อกำหนด
- Supabase Account (สร้างฟรีที่ [supabase.com](https://supabase.com))
- GitHub Account (สำหรับ GitHub Pages)
- Text Editor (VS Code แนะนำ)

### ขั้นตอนการติดตั้ง

#### 1. สร้าง Supabase Project
```
1. ไปที่ https://supabase.com
2. สร้าง Account ใหม่
3. สร้าง Project ใหม่
4. รอให้ Database พร้อม
```

#### 2. สร้าง Table ใน Supabase
ไปที่ SQL Editor แล้ว Run query นี้:

```sql
-- Table: repair_requests
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

-- Create indexes
CREATE INDEX idx_repair_requests_status ON repair_requests(status);
CREATE INDEX idx_repair_requests_device_type ON repair_requests(device_type);
CREATE INDEX idx_repair_requests_priority ON repair_requests(priority);
CREATE INDEX idx_repair_requests_created_at ON repair_requests(created_at DESC);
CREATE INDEX idx_repair_requests_ticket_number ON repair_requests(ticket_number);
```

#### 3. ตั้งค่า Authentication
```
ใน Supabase Dashboard:
1. ไปที่ Settings > API
2. Copy Project URL และ anon key
```

#### 4. Update Supabase Credentials
แก้ไข `js/supabase.js` บรรทัด 1-2:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

#### 5. Deploy ใน GitHub Pages
```bash
# 1. สร้าง Repository ใหม่ชื่อ "it-repair-system"
# 2. Clone repository
git clone https://github.com/YOUR_USERNAME/it-repair-system.git
cd it-repair-system

# 3. Copy files ทั้งหมด
# 4. Commit and Push
git add .
git commit -m "Initial commit: IT Repair System"
git push origin main

# 5. ไปที่ Settings > Pages
# 6. เลือก Source = main branch
# 7. Save
```

## 📊 Database Schema

### repair_requests Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary Key |
| ticket_number | VARCHAR(50) | เลขที่แจ้ง (Unique) |
| requester_name | VARCHAR(255) | ชื่อผู้แจ้ง |
| contact_number | VARCHAR(20) | เบอร์ติดต่อ |
| department | VARCHAR(255) | แผนก |
| email | VARCHAR(255) | อีเมล |
| device_type | VARCHAR(50) | ประเภทอุปกรณ์ |
| device_name | VARCHAR(255) | ชื่ออุปกรณ์ |
| asset_number | VARCHAR(100) | หมายเลขครุภัณฑ์ |
| location | VARCHAR(255) | สถานที่ติดตั้ง |
| problem_description | TEXT | อาการเสีย |
| priority | VARCHAR(20) | ความเร่งด่วน (low/medium/high) |
| status | VARCHAR(50) | สถานะ (pending/in_progress/completed/cancelled) |
| technician_name | VARCHAR(255) | ผู้ดำเนินการ |
| repair_notes | TEXT | หมายเหตุการซ่อม |
| created_at | TIMESTAMP | วันสร้าง |
| updated_at | TIMESTAMP | วันอัปเดต |
| completed_at | TIMESTAMP | วันเสร็จสิ้น |

## 🎨 UI/UX Design

### สีหลัก
- **Primary Blue**: `#0066CC`
- **Light Gray**: `#F3F4F6`
- **Border Gray**: `#E5E7EB`
- **Text Dark**: `#1F2937`
- **Text Gray**: `#6B7280`

### Status Colors
- **Pending (รอ)**: Yellow - `#FBBF24`
- **In Progress (กำลังซ่อม)**: Blue - `#60A5FA`
- **Completed (เสร็จ)**: Green - `#34D399`
- **Cancelled (ยกเลิก)**: Red - `#F87171`

### Priority Colors
- **Low (ปกติ)**: Green - `#10B981`
- **Medium (ปานกลาง)**: Yellow - `#F59E0B`
- **High (เร่งด่วน)**: Red - `#EF4444`

## 🔧 API Functions

### Supabase Functions (15+ functions)

```javascript
// สร้างแจ้งซ่อมใหม่
createRepairRequest(data)

// ดึงรายการแจ้งซ่อม
getRepairRequests(filters)

// ดึงรายการแจ้งซ่อมตัวเดียว
getRepairRequestById(id)

// ค้นหาแจ้งซ่อม
searchRepairRequests(keyword)

// อัปเดตแจ้งซ่อม
updateRepairRequest(id, data)

// อัปเดตสถานะ
updateRepairStatus(id, status, notes, technicianName)

// ลบแจ้งซ่อม
deleteRepairRequest(id)

// ดึงสถิติรวม
getStatsSummary()

// ดึงสถิติตามประเภทอุปกรณ์
getDeviceTypeStats()

// ดึงสถิติตามความเร่งด่วน
getPriorityStats()

// Export เป็น JSON
exportToJSON()

// Export เป็น CSV
exportToCSV()

// Subscribe to real-time updates
subscribeToRepairRequests(callback)
```

### Utility Functions (50+ functions)

**Status Functions:**
- `getStatusLabel()` - แปลง status เป็นไทย
- `getStatusColor()` - ได้สีตาม status
- `getStatusBadgeClass()` - CSS class for badges

**Priority Functions:**
- `getPriorityLabel()` - แปลง priority เป็นไทย
- `getPriorityColor()` - ได้สีตาม priority
- `getPriorityBadgeClass()` - CSS class for badges
- `getPriorityLevel()` - ได้เลขความเร่งด่วน

**Device Type Functions:**
- `getDeviceTypeLabel()` - แปลง device type เป็นไทย

**Date/Time Functions:**
- `formatDate()` - วันที่เต็มพร้อมเวลา
- `formatDateShort()` - วันที่สั้น
- `formatDateOnly()` - เฉพาะวันที่
- `formatTimeOnly()` - เฉพาะเวลา
- `calculateDaysAgo()` - วันที่ผ่านไป

**Validation Functions:**
- `isValidEmail()` - ตรวจสอบ email
- `isValidPhoneNumber()` - ตรวจสอบเบอร์โทร
- `isValidAssetNumber()` - ตรวจสอบหมายเลขครุภัณฑ์
- `validateRepairForm()` - ตรวจสอบฟอร์มทั้งหมด

**Filter Functions:**
- `searchRequests()` - ค้นหา
- `filterByStatus()` - Filter ตามสถานะ
- `filterByDeviceType()` - Filter ตามประเภท
- `filterByPriority()` - Filter ตามความเร่งด่วน
- `filterByDepartment()` - Filter ตามแผนก
- `filterByDateRange()` - Filter ตามช่วงวันที่

**Statistics Functions:**
- `countStatuses()` - นับแต่ละสถานะ
- `countByDeviceType()` - นับตามประเภท
- `countByPriority()` - นับตามความเร่งด่วน
- `countByDepartment()` - นับตามแผนก
- `getAverageResolutionTime()` - เวลาเฉลี่ยในการซ่อม

**UI Functions:**
- `showToast()` - แสดง notification
- `showConfirm()` - แสดง confirm dialog
- `printRepairRequest()` - พิมพ์รายการ

**Utility Functions:**
- `debounce()` - ล่าช้า function calls
- `throttle()` - จำกัด frequency ของ function
- `deepCopy()` - สำเนาลึก object
- `isEmpty()` - ตรวจสอบ object ว่าง
- `getQueryParams()` - ดึง URL parameters
- `buildQueryString()` - สร้าง query string

## 🔐 Security

### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE repair_requests ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Enable read for all users"
ON repair_requests FOR SELECT
USING (true);

-- Allow anyone to insert
CREATE POLICY "Enable insert for all users"
ON repair_requests FOR INSERT
WITH CHECK (true);

-- Allow update
CREATE POLICY "Enable update for all users"
ON repair_requests FOR UPDATE
USING (true);
```

## 🌐 Deploy Options

### GitHub Pages
```bash
git push origin main
# ไปที่ Settings > Pages > Source = main branch
```

### Netlify
```bash
# 1. Connect GitHub repository
# 2. Build settings: Leave blank (no build needed)
# 3. Publish directory: .
```

### Vercel
```bash
# 1. Import project
# 2. Framework: Other
# 3. Deploy
```

## 🐛 Troubleshooting

### ปัญหา: Database connection failed
**วิธีแก้**:
- ตรวจสอบ URL และ API Key ใน `js/supabase.js`
- ตรวจสอบว่า Project Status เป็น "Active" ใน Supabase

### ปัญหา: Form ไม่ submit
**วิธีแก้**:
- เปิด Browser Console (F12) เพื่อดู error
- ตรวจสอบว่ากรอก required fields ครบ

### ปัญหา: Styling ไม่ถูกต้อง
**วิธีแก้**:
- ล้าง cache: Ctrl+Shift+Delete
- Reload page: Ctrl+F5

### ปัญหา: CORS Error
**วิธีแก้**:
- ตรวจสอบ CORS settings ใน Supabase Dashboard
- Settings > API > CORS Configuration

## 📞 Support

สำหรับความช่วยเหลือ:
- 📧 Email: support@example.com
- 💬 Line: @example-line
- 🐛 Bug Report: GitHub Issues

## 📝 License

MIT License - สามารถใช้งาน แก้ไข และแจกจ่ายได้อย่างอิสระ

## 🙏 Credits

- **Tailwind CSS**: https://tailwindcss.com
- **Supabase**: https://supabase.com
- **Google Fonts**: https://fonts.google.com

## 🎯 Roadmap (Future Features)

- [ ] ระบบ Authentication (Login/Register)
- [ ] Integration กับ Email (ส่ง notification)
- [ ] Statistics Dashboard ขั้นสูง (Charts & Graphs)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile App (React Native)
- [ ] Automated backup
- [ ] Advanced search filters
- [ ] Report generation
- [ ] API Gateway

---

**Version**: 1.0.0  
**Last Updated**: 2026-05-12  
**Created by**: IT Department  
**Status**: ✅ Ready to Use
