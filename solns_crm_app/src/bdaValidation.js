export default function bdaValidation(
  companyname,
  bdaname,
  email,
  bdapassword,
  bdaconfirmpassword,
  companycode
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

  if (bdaname === "") {
    errors.bdaname = "Company name is required";
  }

  if (bdapassword === "") {
    errors.bdapassword = "Password is required";
  } else if (bdapassword.length < 4) {
    errors.bdapassword = "Password must be more than 4 characters";
  } else if (bdapassword.length > 10) {
    errors.bdapassword = "Password cannot exceed more than 10 characters";
  }

  if (bdaconfirmpassword === "") {
    errors.bdaconfirmpassword = "Confirm Password Required";
  } else if (!(bdapassword === bdaconfirmpassword)) {
    errors.bdaconfirmpassword =
      "New Password and Confirm Password Must be Same";
  }

  if (companycode === "") {
    errors.companycode = "Company code is required";
  }

  return errors;
}
