/**
 * Request and application logger
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: duration,
      timestamp: new Date().toISOString()
    };
    if (process.env.NODE_ENV !== "test") {
      console.log(`[${log.timestamp}] ${log.method} ${log.path} -> ${log.status} (${log.durationMs}ms)`);
    }
  });
  next();
}

function info(message, meta = {}) {
  console.log(JSON.stringify({ level: "info", message, ...meta, ts: new Date().toISOString() }));
}

function error(message, meta = {}) {
  console.error(JSON.stringify({ level: "error", message, ...meta, ts: new Date().toISOString() }));
}

function warn(message, meta = {}) {
  console.warn(JSON.stringify({ level: "warn", message, ...meta, ts: new Date().toISOString() }));
}

module.exports = { requestLogger, info, error, warn };
