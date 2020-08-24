import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: "", 
    token: "", 
    newPassword: "",
    buttonText: "Reset password",
  });

  useEffect(() => { 
    let token = match.params.token;
    let { fName } = jwt.decode(token);
    if (token) {
      setValues((v) => ({ ...v, fName, token }));
    }
  }, [match.params.token]);

  const { fName, token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios
      .post("/api/user/reset-password", { newPassword, resetPasswordLink: token })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Reset password" });
      });
  };

  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">New Password</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type="password"
          className="form-control"
          placeholder="Type new password"
          required
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">Hey {fName} Type your new password</h1>
        {passwordResetForm()}
      </div>
  );
};

export default Reset;