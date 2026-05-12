// Main Application JavaScript

// Application Configuration
const APP_CONFIG = {
    name: 'ระบบแจ้งซ่อม IT',
    version: '1.0.0',
    theme: 'light',
    language: 'th'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log(`${APP_CONFIG.name} v${APP_CONFIG.version} initialized`);
    
    // Set theme
    setTheme(APP_CONFIG.theme);
    
    // Add global event listeners
    setupGlobalListeners();
    
    // Check Supabase connection
    checkConnection();
}

/**
 * Set application theme
 */
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

/**
 * Setup global event listeners
 */
function setupGlobalListeners() {
    // Handle network status
    window.addEventListener('online', () => {
        console.log('Connection restored');
        showToast('เชื่อมต่อได้แล้ว', 'success', 2000);
    });

    window.addEventListener('offline', () => {
        console.log('Connection lost');
        showToast('ไม่มีเชื่อมต่อ', 'error', 2000);
    });

    // Prevent accidental page unload
    window.addEventListener('beforeunload', (e) => {
        const form = document.querySelector('form');
        if (form && form.querySelector('input:valid, textarea:valid')) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

/**
 * Check Supabase connection
 */
async function checkConnection() {
    try {
        const { data, error } = await supabaseClient
            .from('repair_requests')
            .select('count(*)', { count: 'exact' })
            .limit(1);

        if (error) {
            console.warn('Connection warning:', error);
        } else {
            console.log('✓ Database connection OK');
        }
    } catch (error) {
        console.error('Connection error:', error);
    }
}

/**
 * Format currency (if needed for future features)
 */
function formatCurrency(amount, currency = 'THB') {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Get device icon (for future UI enhancement)
 */
function getDeviceIcon(type) {
    const icons = {
        'pc': '🖥️',
        'notebook': '💻',
        'printer': '🖨️',
        'scanner': '📠',
        'monitor': '🖥️',
        'keyboard': '⌨️',
        'network': '🌐',
        'phone': '☎️',
        'other': '⚙️'
    };
    return icons[type] || '⚙️';
}

/**
 * Redirect with loading
 */
function redirectWithLoading(url, delay = 500) {
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

/**
 * Debounce function for search
 */
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get greeting based on time of day
 */
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'สวัสดีตอนเช้า';
    if (hour < 18) return 'สวัสดีตอนบ่าย';
    return 'สวัสดีตอนเย็น';
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Deep copy object
 */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Merge objects
 */
function mergeObjects(target, source) {
    return Object.assign({}, target, source);
}

/**
 * Wait for element to exist
 */
async function waitForElement(selector, timeout = 5000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const element = document.querySelector(selector);
        if (element) return element;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Element ${selector} not found`);
}

/**
 * Get query parameters
 */
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    
    return params;
}

/**
 * Build query string
 */
function buildQueryString(params) {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

/**
 * Local storage utilities
 */
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

/**
 * Session storage utilities
 */
const Session = {
    set(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Session error:', e);
            return false;
        }
    },
    get(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Session error:', e);
            return null;
        }
    }
};

// Export for use in other files
// window.App = { ... };
