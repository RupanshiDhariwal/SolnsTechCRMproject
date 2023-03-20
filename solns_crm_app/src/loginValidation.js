export default function loginValidation(type, email, password) {
  const errors = {};

  if (!type) {
    errors.type = "Please select type ";
  }

  if (!email) {
    errors.email = "Please enter registered email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "This is not a valid email format!";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }

  return errors;
}
