
export function showSnackbar(message) {
  return {
    type: 'SNACKBAR_SHOW',
    payload: new Promise(resolve => resolve(message))
  }
}

export function closeSnackbar(ackAction) {
  return {
    type: 'SNACKBAR_CLOSE'
  }
}
