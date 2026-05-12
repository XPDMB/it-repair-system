// ========================================
// Supabase Configuration
// ========================================
// 🔑 คุณจะต้อง Update ข้อมูลนี้ด้วย Credentials จากตัวเอง
// โปรดไปที่ https://supabase.com สร้าง Account ก่อน

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// ========================================
// Initialize Supabase
// ========================================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ========================================
// Repair Request Functions
// ========================================

/**
 * สร้างแจ้งซ่อมใหม่
 */
async function createRepairRequest(data) {
  try {
    const ticketNumber = generateTicketNumber();
    
    const { data: result, error } = await supabaseClient
      .from('repair_requests')
      .insert([{
        ticket_number: ticketNumber,
        requester_name: data.requester_name,
        contact_number: data.contact_number,
        department: data.department,
        email: data.email || null,
        device_type: data.device_type,
        device_name: data.device_name,
        asset_number: data.asset_number || null,
        location: data.location,
        problem_description: data.problem_description,
        priority: data.priority || 'low',
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    
    return { success: true, data: result, ticketNumber };
  } catch (error) {
    console.error('Create error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ดึงรายการแจ้งซ่อมทั้งหมด
 */
async function getRepairRequests(filters = {}) {
  try {
    let query = supabaseClient
      .from('repair_requests')
      .select('*');

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    // Filter by device type
    if (filters.device_type && filters.device_type !== 'all') {
      query = query.eq('device_type', filters.device_type);
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'all') {
      query = query.eq('priority', filters.priority);
    }

    // Filter by department
    if (filters.department && filters.department !== 'all') {
      query = query.eq('department', filters.department);
    }

    // Sort by created_at (newest first)
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ดึงรายการแจ้งซ่อมตัวเดียว
 */
async function getRepairRequestById(id) {
  try {
    const { data, error } = await supabaseClient
      .from('repair_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get single error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ค้นหาแจ้งซ่อม
 */
async function searchRepairRequests(keyword) {
  try {
    const { data, error } = await supabaseClient
      .from('repair_requests')
      .select('*')
      .or(`ticket_number.ilike.%${keyword}%,requester_name.ilike.%${keyword}%,asset_number.ilike.%${keyword}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Search error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * อัปเดตแจ้งซ่อม
 */
async function updateRepairRequest(id, data) {
  try {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString()
    };

    const { data: result, error } = await supabaseClient
      .from('repair_requests')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data: result };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * อัปเดตสถานะแจ้งซ่อม
 */
async function updateRepairStatus(id, status, notes = '', technicianName = '') {
  try {
    const updateData = {
      status,
      repair_notes: notes,
      technician_name: technicianName,
      updated_at: new Date().toISOString()
    };

    if (status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabaseClient
      .from('repair_requests')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Update status error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ลบแจ้งซ่อม
 */
async function deleteRepairRequest(id) {
  try {
    const { error } = await supabaseClient
      .from('repair_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ดึงสถิติรวม
 */
async function getStatsSummary() {
  try {
    const { data, error } = await supabaseClient
      .from('repair_requests')
      .select('status');

    if (error) throw error;

    const stats = {
      pending: data.filter(r => r.status === 'pending').length,
      in_progress: data.filter(r => r.status === 'in_progress').length,
      completed: data.filter(r => r.status === 'completed').length,
      cancelled: data.filter(r => r.status === 'cancelled').length,
      total: data.length
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Stats error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ดึงสถิติตามประเภทอุปกรณ์
 */
async function getDeviceTypeStats() {
  try {
    const { data, error } = await supabaseClient
      .from('repair_requests')
      .select('device_type');

    if (error) throw error;

    const stats = {};
    data.forEach(r => {
      stats[r.device_type] = (stats[r.device_type] || 0) + 1;
    });

    return { success: true, data: stats };
  } catch (error) {
    console.error('Device type stats error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ดึงสถิติตามความเร่งด่วน
 */
async function getPriorityStats() {
  try {
    const { data, error } = await supabaseClient
      .from('repair_requests')
      .select('priority');

    if (error) throw error;

    const stats = {
      low: data.filter(r => r.priority === 'low').length,
      medium: data.filter(r => r.priority === 'medium').length,
      high: data.filter(r => r.priority === 'high').length
    };

    return { success: true, data: stats };
  } catch (error) {
    console.error('Priority stats error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Export เป็น JSON
 */
function exportToJSON() {
  return supabaseClient
    .from('repair_requests')
    .select('*')
    .then(({ data }) => {
      const json = JSON.stringify(data, null, 2);
      downloadFile(json, 'repair-requests.json', 'application/json');
    });
}

/**
 * Export เป็น CSV
 */
async function exportToCSV() {
  try {
    const { data } = await supabaseClient
      .from('repair_requests')
      .select('*');

    if (!data || data.length === 0) {
      alert('ไม่มีข้อมูล');
      return;
    }

    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
      csv += values.join(',') + '\n';
    });

    downloadFile(csv, 'repair-requests.csv', 'text/csv');
  } catch (error) {
    console.error('Export error:', error);
  }
}

/**
 * Subscribe to real-time updates
 */
function subscribeToRepairRequests(callback) {
  return supabaseClient
    .channel('repair_requests')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'repair_requests'
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
}

// ========================================
// Helper Functions
// ========================================

/**
 * สร้างหมายเลขแจ้งซ่อมอัตโนมัติ
 */
function generateTicketNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
  
  return `TKT-${year}${month}${day}-${random}`;
}

/**
 * Download file
 */
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
