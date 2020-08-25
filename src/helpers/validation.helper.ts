import validate from 'validate.js';

const defaultRules: any = {
  presence: { presence: { allowEmpty: false } },
  select: { presence: { allowEmpty: false, message: 'Please select at least one item!' } },
  url: { url: { message: 'Please provide valid url!' } },
  email: { email: { message: 'Please provide valid email!' } },
  password: { length: { minimum: 6, message: 'Password must be at least 6 characters!' } }
};

const Validate = (data: {}, rules: any) => {
  const validationRules: any = {};
  const options = {
    fullMessages: false
  };

  // create validation rules based on keys from store
  Object.keys(rules).forEach(key => {
    const value = rules[key];
    validationRules[key] = defaultRules[value] ? defaultRules[value] : value;
  });

  const errors = validate(data, validationRules, options);
  
  if (errors) {
    Object.keys(errors).forEach(key => {
      errors[key] = errors[key].toString();
      errors[key]= errors[key].replace(', ', '\n ');
    });
  }

  return { isValid: !errors, errors };
};

export default Validate;
