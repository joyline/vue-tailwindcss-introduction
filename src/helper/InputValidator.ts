export function validateEmailAddress(value: string) {
  const rgxEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^-<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,24}))$/

  if (!rgxEmail.test(value)) {
    return true
  }

  return false
}
