export default function companyValidation(
  companyname,
  email,
  companypassword,
  companyconfirmpassword,
  employeecode,
  companyaddress
) {
  const errors = {};

  if (companyname === "") {
    errors.companyname = "Company name is required";
  }

  if (email === "") {
    errors.email = "Please enter registered email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "This is not a valid email format!";
  }

  if (companypassword === "") {
    errors.companypassword = "Password is required";
  } else if (companypassword.length < 4) {
    errors.companypassword = "Password must be more than 4 characters";
  } else if (companypassword.length > 10) {
    errors.companypassword = "Password cannot exceed more than 10 characters";
  }

  if (companyconfirmpassword === "") {
    errors.companyconfirmpassword = "Confirm Password Required";
  } else if (!(companypassword === companyconfirmpassword)) {
    errors.companyconfirmpassword =
      "New Password and Confirm Password Must be Same";
  }

  if (employeecode === "") {
    errors.employeecode = "Employee code is required";
  }

  if (companyaddress === "") {
    errors.companyaddress = "Company address is required";
  }
  return errors;
}
