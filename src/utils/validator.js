export const emailValidator = [{
  func: 'isEmail',
  errorMessage: 'Please enter a valid email address.'
}]

export const passwordValidator = [{
  func: 'isLength',
  options: {
    min: 6,
    max: 20
  },
  errorMessage: 'Password\'s length is between 6 and 20'
}]
