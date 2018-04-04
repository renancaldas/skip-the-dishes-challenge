
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

export function openDrawer(ackAction) {
  return {
    type: 'DRAWER_OPEN'
  }
}

export function closeDrawer(ackAction) {
  return {
    type: 'DRAWER_CLOSE'
  }
}
