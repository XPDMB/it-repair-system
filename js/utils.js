// Utility Functions

/**
 * Status related functions
 */
const statusMap = {
    'pending': { th: 'รอดำเนินการ', color: 'yellow' },
    'in_progress': { th: 'กำลังซ่อม', color: 'blue' },
    'completed': { th: 'ซ่อมเสร็จ', color: 'green' },
    'cancelled': { th: 'ยกเลิก', color: 'red' }
};

function getStatusLabel(status) {
    return statusMap[status]?.th || status;
}

function getStatusColor(status) {
    return statusMap[status]?.color || 'gray';
}

function getStatusBadgeClass(status) {
    const colors = {
        'yellow': 'bg-yellow-100 text-yellow-800',
        'blue': 'bg-blue-100 text-blue-800',
        'green': 'bg-green-100 text-green-800',
        'red': 'bg-red-100 text-red-800',
        'gray': 'bg-gray-100 text-gray-800'
    };
    const color = getStatusColor(status);
    return colors[color] || colors.gray;
}

/**
 * Priority related functions
 */
const priorityMap = {
    'low': { th: 'ปกติ', color: 'green', level: 1 },
    'medium': { th: 'ปานกลาง', color: 'yellow', level: 2 },
    'high': { th: 'เร่งด่วน', color: 'red', level: 3 }
};

function getPriorityLabel(priority) {
    return priorityMap[priority]?.th || priority;
}

function getPriorityColor(priority) {
    return priorityMap[priority]?.color || 'gray';
}

function getPriorityBadgeClass(priority) {
    const colors = {
        'green': 'bg-green-100 text-green-800',
        'yellow': 'bg-yellow-100 text-yellow-800',
        'red': 'bg-red-100 text-red-800',
        'gray': 'bg-gray-100 text-gray-800'
    };
    const color = getPriorityColor(priority);
    return colors[color] || colors.gray;
}

function getPriorityLevel(priority) {
    return priorityMap[priority]?.level || 0;
}

/**
 * Device type functions
 */
const deviceTypeMap = {
    'pc': 'คอมพิวเตอร์',
    'notebook': 'แล็ปท็อป',
    'printer': 'เครื่องพิมพ์',
    'scanner': 'เครื่องสแกน',
    'monitor': 'จอแสดงผล',
    'keyboard': 'คีย์บอร์ด',
    'mouse': 'เมาส์',
    'network': 'อุปกรณ์เครือข่าย',
    'phone': 'โทรศัพท์',
    'other': 'อื่นๆ'
};

function getDeviceTypeLabel(type) {
    return deviceTypeMap[type] || type;
}

/**
 * Date/Time functions
 */
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Intl.DateTimeFormat('th-TH', options).format(date);
}

function formatDateShort(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
    };
    return new Intl.DateTimeFormat('th-TH', options).format(date);
}

function formatDateOnly(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    return new Intl.DateTimeFormat('th-TH', options).format(date);
}

function formatTimeOnly(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Intl.DateTimeFormat('th-TH', options).format(date);
}

function calculateDaysAgo(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'วันนี้';
    if (diffDays === 1) return 'เมื่อวาน';
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
    return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`;
}

/**
 * Validation functions
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^(\+66|0)\d{8,9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

function isValidAssetNumber(assetNumber) {
    // Allow alphanumeric, hyphens, slashes
    const assetRegex = /^[A-Za-z0-9\-\/]+$/;
    return assetRegex.test(assetNumber);
}

function validateRepairForm(formData) {
    const errors = [];

    if (!formData.requester_name || formData.requester_name.trim() === '') {
        errors.push('กรุณากรอกชื่อผู้แจ้ง');
    }

    if (!formData.contact_number || formData.contact_number.trim() === '') {
        errors.push('กรุณากรอกเบอร์ติดต่อ');
    } else if (!isValidPhoneNumber(formData.contact_number)) {
        errors.push('เบอร์ติดต่อไม่ถูกต้อง');
    }

    if (!formData.department || formData.department.trim() === '') {
        errors.push('กรุณาระบุแผนก');
    }

    if (formData.email && !isValidEmail(formData.email)) {
        errors.push('อีเมลไม่ถูกต้อง');
    }

    if (!formData.device_type) {
        errors.push('กรุณาเลือกประเภทอุปกรณ์');
    }

    if (!formData.device_name || formData.device_name.trim() === '') {
        errors.push('กรุณากรอกชื่ออุปกรณ์');
    }

    if (!formData.location || formData.location.trim() === '') {
        errors.push('กรุณาระบุสถานที่');
    }

    if (!formData.problem_description || formData.problem_description.trim() === '') {
        errors.push('กรุณาระบุอาการเสีย');
    }

    if (!formData.priority) {
        errors.push('กรุณาระบุความเร่งด่วน');
    }

    return errors;
}

/**
 * Data filtering functions
 */
function searchRequests(requests, keyword) {
    if (!keyword || keyword.trim() === '') return requests;
    
    const lowerKeyword = keyword.toLowerCase();
    return requests.filter(req => 
        req.ticket_number.toLowerCase().includes(lowerKeyword) ||
        req.requester_name.toLowerCase().includes(lowerKeyword) ||
        req.device_name.toLowerCase().includes(lowerKeyword) ||
        (req.asset_number && req.asset_number.toLowerCase().includes(lowerKeyword)) ||
        req.department.toLowerCase().includes(lowerKeyword)
    );
}

function filterByStatus(requests, status) {
    if (!status) return requests;
    return requests.filter(req => req.status === status);
}

function filterByDeviceType(requests, deviceType) {
    if (!deviceType) return requests;
    return requests.filter(req => req.device_type === deviceType);
}

function filterByPriority(requests, priority) {
    if (!priority) return requests;
    return requests.filter(req => req.priority === priority);
}

function filterByDepartment(requests, department) {
    if (!department) return requests;
    return requests.filter(req => req.department === department);
}

function filterByDateRange(requests, startDate, endDate) {
    if (!startDate || !endDate) return requests;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return requests.filter(req => {
        const reqDate = new Date(req.created_at);
        return reqDate >= start && reqDate <= end;
    });
}

function sortRequests(requests, field = 'created_at', ascending = false) {
    const sorted = [...requests];
    
    sorted.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        // Handle date fields
        if (field.includes('date') || field.includes('at')) {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }
        
        // Handle priority
        if (field === 'priority') {
            aVal = getPriorityLevel(aVal);
            bVal = getPriorityLevel(bVal);
        }
        
        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
    });
    
    return sorted;
}

/**
 * Statistics functions
 */
function countStatuses(requests) {
    return {
        pending: requests.filter(r => r.status === 'pending').length,
        in_progress: requests.filter(r => r.status === 'in_progress').length,
        completed: requests.filter(r => r.status === 'completed').length,
        cancelled: requests.filter(r => r.status === 'cancelled').length,
        total: requests.length
    };
}

function countByDeviceType(requests) {
    const counts = {};
    requests.forEach(req => {
        counts[req.device_type] = (counts[req.device_type] || 0) + 1;
    });
    return counts;
}

function countByPriority(requests) {
    return {
        low: requests.filter(r => r.priority === 'low').length,
        medium: requests.filter(r => r.priority === 'medium').length,
        high: requests.filter(r => r.priority === 'high').length
    };
}

function countByDepartment(requests) {
    const counts = {};
    requests.forEach(req => {
        counts[req.department] = (counts[req.department] || 0) + 1;
    });
    return counts;
}

function getAverageResolutionTime(requests) {
    const completed = requests.filter(r => r.status === 'completed' && r.completed_at);
    if (completed.length === 0) return 0;
    
    const totalTime = completed.reduce((sum, req) => {
        const created = new Date(req.created_at);
        const completed = new Date(req.completed_at);
        const diffMs = completed - created;
        return sum + diffMs;
    }, 0);
    
    const avgMs = totalTime / completed.length;
    const avgDays = avgMs / (1000 * 60 * 60 * 24);
    
    return parseFloat(avgDays.toFixed(2));
}

/**
 * Toast notification function
 */
function showToast(message, type = 'info', duration = 3000) {
    const toastHTML = `
        <div class="toast toast-${type}" style="
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ${
                type === 'success' ? 'background-color: #10b981;' :
                type === 'error' ? 'background-color: #ef4444;' :
                type === 'warning' ? 'background-color: #f59e0b;' :
                'background-color: #3b82f6;'
            }
        ">
            ${message}
        </div>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = toastHTML;
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => div.remove(), 300);
    }, duration);
}

/**
 * Confirm dialog function
 */
async function showConfirm(message, title = 'ยืนยัน') {
    return new Promise((resolve) => {
        const dialogHTML = `
            <div id="confirm-dialog" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            ">
                <div style="
                    background-color: white;
                    border-radius: 12px;
                    padding: 24px;
                    max-width: 400px;
                    box-shadow: 0 20px 25px rgba(0,0,0,0.15);
                ">
                    <h3 style="
                        font-size: 18px;
                        font-weight: 700;
                        margin-bottom: 12px;
                        color: #1f2937;
                    ">${title}</h3>
                    <p style="
                        color: #6b7280;
                        margin-bottom: 24px;
                        line-height: 1.5;
                    ">${message}</p>
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button class="btn-cancel" style="
                            padding: 8px 16px;
                            border-radius: 6px;
                            border: 1px solid #e5e7eb;
                            background-color: white;
                            color: #6b7280;
                            font-weight: 500;
                            cursor: pointer;
                        ">ยกเลิก</button>
                        <button class="btn-confirm" style="
                            padding: 8px 16px;
                            border-radius: 6px;
                            background-color: #0066cc;
                            color: white;
                            font-weight: 500;
                            border: none;
                            cursor: pointer;
                        ">ยืนยัน</button>
                    </div>
                </div>
            </div>
        `;
        
        const div = document.createElement('div');
        div.innerHTML = dialogHTML;
        document.body.appendChild(div);
        
        div.querySelector('.btn-cancel').addEventListener('click', () => {
            div.remove();
            resolve(false);
        });
        
        div.querySelector('.btn-confirm').addEventListener('click', () => {
            div.remove();
            resolve(true);
        });
    });
}

/**
 * Print function
 */
function printRepairRequest(requestData) {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ใบแจ้งซ่อม #${requestData.ticket_number}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                h1 { text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                td { padding: 10px; border: 1px solid #ddd; }
                .label { font-weight: bold; width: 30%; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
            <h1>ใบแจ้งซ่อมอุปกรณ์ IT</h1>
            <table>
                <tr>
                    <td class="label">หมายเลขแจ้ง:</td>
                    <td>${requestData.ticket_number}</td>
                </tr>
                <tr>
                    <td class="label">สถานะ:</td>
                    <td>${getStatusLabel(requestData.status)}</td>
                </tr>
                <tr>
                    <td class="label">ชื่อผู้แจ้ง:</td>
                    <td>${requestData.requester_name}</td>
                </tr>
                <tr>
                    <td class="label">แผนก:</td>
                    <td>${requestData.department}</td>
                </tr>
                <tr>
                    <td class="label">เบอร์ติดต่อ:</td>
                    <td>${requestData.contact_number}</td>
                </tr>
                <tr>
                    <td class="label">ประเภทอุปกรณ์:</td>
                    <td>${getDeviceTypeLabel(requestData.device_type)}</td>
                </tr>
                <tr>
                    <td class="label">ชื่ออุปกรณ์:</td>
                    <td>${requestData.device_name}</td>
                </tr>
                <tr>
                    <td class="label">หมายเลขครุภัณฑ์:</td>
                    <td>${requestData.asset_number || '-'}</td>
                </tr>
                <tr>
                    <td class="label">สถานที่:</td>
                    <td>${requestData.location}</td>
                </tr>
                <tr>
                    <td class="label">อาการเสีย:</td>
                    <td>${requestData.problem_description}</td>
                </tr>
                <tr>
                    <td class="label">ความเร่งด่วน:</td>
                    <td>${getPriorityLabel(requestData.priority)}</td>
                </tr>
                <tr>
                    <td class="label">วันที่แจ้ง:</td>
                    <td>${formatDate(requestData.created_at)}</td>
                </tr>
            </table>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

/**
 * Add CSS animations
 */
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', addAnimations);
