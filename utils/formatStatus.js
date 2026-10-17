const formatStatus = (statusOutput) => {
  if (statusOutput === null || statusOutput === undefined) {
    return ''
  }
  return String(statusOutput)
}

module.exports = formatStatus
