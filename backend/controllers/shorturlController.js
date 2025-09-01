const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const store = require('../utils/memoryStore');

function generateShortcode() {
  return uuidv4().slice(0, 6);
}

exports.createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  if (!url || !/^https?:\/\/.+/i.test(url)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let finalCode = shortcode || generateShortcode();
  if (store.urls[finalCode]) {
    return res.status(409).json({ error: 'Shortcode already exists' });
  }

  const expiry = dayjs().add(validity, 'minute').toISOString();
  store.urls[finalCode] = { 
    url, 
    expiry, 
    createdAt: new Date().toISOString(),
    clicks: [] 
  };

  res.status(201).json({
    shortLink: `http://localhost:5000/${finalCode}`,
    expiry
  });
};

exports.getStats = (req, res) => {
  const code = req.params.code;
  const entry = store.urls[code];
  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }
  res.json({
    originalUrl: entry.url,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: entry.clicks.length,
    clickData: entry.clicks
  });
};

exports.redirectUrl = (req, res) => {
  const code = req.params.code;
  const entry = store.urls[code];
  if (!entry) {
    return res.status(404).json({ error: 'Shortcode not found' });
  }
  if (dayjs().isAfter(dayjs(entry.expiry))) {
    return res.status(410).json({ error: 'Link expired' });
  }
  entry.clicks.push({
    timestamp: new Date().toISOString(),
    source: req.get('Referrer') || 'direct',
    geo: 'unknown'
  });
  res.redirect(entry.url);
};
