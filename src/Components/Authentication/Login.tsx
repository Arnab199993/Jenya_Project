import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await dispatch(fetchUsers(userDetails));
      console.log("Login Successful!", result);

      if (result?.payload?.accessToken) {
        localStorage.setItem("authToken", result.payload.accessToken);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate("/home");
    }
  }, [authToken, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="User Name"
        name="username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userDetails.username}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={userDetails.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={authToken ? true : false}
      >
        Login
      </Button>
    </form>
  );
}

export default Login;
