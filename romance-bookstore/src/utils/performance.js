// Performance monitoring utilities
export const measurePerformance = {
  // Measure component render time
  measureRender: (componentName, renderFn) => {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  },

  // Measure async operations
  measureAsync: async (operationName, asyncFn) => {
    const start = performance.now();
    const result = await asyncFn();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${operationName} time: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  },

  // Track Web Vitals
  trackWebVitals: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Image loading performance
  trackImageLoad: (src, onLoad, onError) => {
    const start = performance.now();
    
    return {
      onLoad: () => {
        const end = performance.now();
        console.log(`Image load time for ${src}: ${(end - start).toFixed(2)}ms`);
        onLoad?.();
      },
      onError: () => {
        const end = performance.now();
        console.log(`Image failed to load ${src} after: ${(end - start).toFixed(2)}ms`);
        onError?.();
      }
    };
  }
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    import('webpack-bundle-analyzer').then(({ BundleAnalyzerPlugin }) => {
      console.log('Bundle analysis available at http://localhost:8888');
    }).catch(() => {
      console.log('webpack-bundle-analyzer not available');
    });
  }
};

// Memory usage tracking
export const trackMemoryUsage = () => {
  if (typeof window !== 'undefined' && 'performance' in window && 'memory' in performance) {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center&auto=format&q=75&fm=webp'
  ];

  criticalResources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = url.includes('fonts') ? 'style' : 'image';
    document.head.appendChild(link);
  });
};

// Debounce utility for performance
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle utility for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Performance-optimized scroll handler
export const optimizedScrollHandler = (callback) => {
  let ticking = false;

  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};