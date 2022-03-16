export function createControl(config, validation) {
  return {
    ...config,
    validation,
    type: 'text',
    value: '',
    valid: !validation,
    touched: false,
  };
}


export function controlValidate(value, validation) {
  if (!validation) true

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }
  
  return isValid
}

export function formValidate(controls) {
  let isFormValid = true
  
  for (let controlName in controls) {
    if (controls.hasOwnProperty(controlName)) {
      isFormValid = controls[controlName].valid && isFormValid
    }
  }

  return isFormValid
}