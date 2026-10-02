(function () {
  if (window.self === window.top) return

  var logs = []
  var MAX_LOGS = 500

  var originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug,
  }

  function captureLog(level, args) {
    var timestamp = new Date().toISOString()
    var message = args
      .map(function (arg) {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(
              arg,
              function (key, value) {
                if (typeof value === 'function') return '[Function]'
                if (value instanceof Error) return value.toString()
                return value
              },
              2
            )
          } catch (e) {
            return '[Object]'
          }
        }
        return String(arg)
      })
      .join(' ')

    var logEntry = {
      timestamp: timestamp,
      level: level,
      message: message,
      url: window.location.href,
    }

    logs.push(logEntry)
    if (logs.length > MAX_LOGS) {
      logs.shift()
    }

    try {
      window.parent.postMessage(
        {
          type: 'console-log',
          log: logEntry,
        },
        '*'
      )
    } catch (e) {}
  }

  console.log = function () {
    var args = Array.prototype.slice.call(arguments)
    captureLog('log', args)
    originalConsole.log.apply(console, arguments)
  }
  console.warn = function () {
    var args = Array.prototype.slice.call(arguments)
    captureLog('warn', args)
    originalConsole.warn.apply(console, arguments)
  }
  console.error = function () {
    var args = Array.prototype.slice.call(arguments)
    captureLog('error', args)
    originalConsole.error.apply(console, arguments)
  }
  console.info = function () {
    var args = Array.prototype.slice.call(arguments)
    captureLog('info', args)
    originalConsole.info.apply(console, arguments)
  }
  console.debug = function () {
    var args = Array.prototype.slice.call(arguments)
    captureLog('debug', args)
    originalConsole.debug.apply(console, arguments)
  }

  window.addEventListener('error', function (event) {
    captureLog('error', [event.message + ' at ' + event.filename + ':' + event.lineno])
  })

  window.addEventListener('unhandledrejection', function (event) {
    captureLog('error', ['Unhandled promise rejection: ' + event.reason])
  })

  function sendReady() {
    try {
      window.parent.postMessage(
        {
          type: 'console-capture-ready',
          url: window.location.href,
          timestamp: new Date().toISOString(),
        },
        '*'
      )
    } catch (e) {}
  }

  function sendRouteChange() {
    try {
      window.parent.postMessage(
        {
          type: 'route-change',
          route: {
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            href: window.location.href,
          },
          timestamp: new Date().toISOString(),
        },
        '*'
      )
    } catch (e) {}
  }

  var originalPushState = history.pushState
  var originalReplaceState = history.replaceState

  history.pushState = function () {
    originalPushState.apply(history, arguments)
    sendRouteChange()
  }

  history.replaceState = function () {
    originalReplaceState.apply(history, arguments)
    sendRouteChange()
  }

  window.addEventListener('popstate', sendRouteChange)
  window.addEventListener('hashchange', sendRouteChange)

  if (document.readyState === 'complete') {
    sendReady()
    sendRouteChange()
  } else {
    window.addEventListener('load', function () {
      sendReady()
      sendRouteChange()
    })
  }
})()