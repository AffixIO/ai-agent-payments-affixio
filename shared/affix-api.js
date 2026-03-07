/**
 * AffixIO API client for demos — api.affix-io.com
 * Use from browser or Node. No build step required.
 */
(function (global) {
  const BASE = 'https://api.affix-io.com';

  function getDemoKey() {
    return fetch(BASE + '/api/demo-key', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      .then((r) => {
        if (!r.ok) return r.json().then((j) => Promise.reject(new Error(j.error || j.message || 'Failed to get demo key'))).catch(() => Promise.reject(new Error('Failed to get demo key (' + r.status + ')')));
        return r.json();
      })
      .then((data) => data.key)
      .catch((err) => {
        var hint = '';
        if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
          hint = ' Run "node server.js" in the demo folder and open http://localhost:3000 (do not open as a file).';
        } else if (err && (err.message === 'Failed to fetch' || err.name === 'TypeError')) {
          hint = ' CORS/network: run "node server.js" and open http://localhost:3000. API is always https://api.affix-io.com.';
        }
        throw new Error((err && err.message) + hint);
      });
  }

  function api(method, path, body, apiKey) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (apiKey) opts.headers['Authorization'] = 'Bearer ' + apiKey;
    if (body && method !== 'GET') opts.body = JSON.stringify(body);
    return fetch(BASE + path, opts).then((r) => {
      const ct = r.headers.get('Content-Type') || '';
      const isJson = ct.indexOf('application/json') !== -1;
      if (!r.ok) {
        return isJson ? r.json().then((j) => Promise.reject(new Error(j.error || j.message || 'Request failed'))) : r.text().then((t) => Promise.reject(new Error(t || 'Request failed')));
      }
      return isJson ? r.json() : r.text();
    });
  }

  global.AffixAPI = {
    BASE,
    getDemoKey,
    api,
    get: (path, key) => api('GET', path, null, key),
    post: (path, body, key) => api('POST', path, body, key),
    // Use /api/health (proxied by Apache); GET /health is not proxied on production
    health: () => fetch(BASE + '/api/health').then((r) => (r.ok ? r.json() : Promise.reject(new Error('Health check failed (' + r.status + ')')))),
  };
})(typeof window !== 'undefined' ? window : globalThis);
