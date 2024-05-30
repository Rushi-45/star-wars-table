import React, { useState } from "react";
import {
  Container,
  Paper,
  Text,
  TextInput,
  Button,
  Checkbox,
} from "@mantine/core";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import starWarsLogo from "../../styles/images/logo.png";
import styles from "./Login.module.css";
import authService from "../../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authService.login(username, password)) {
      navigate("/list");
    } else {
      setPassword("");
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Container size="lg" className={styles.container}>
        <Paper className={styles.paper}>
          <div className={styles.logo}>
            <img
              src={starWarsLogo}
              alt="Star Wars Logo"
              className={styles.logoImage}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formField}>
              <Text className={styles.formLabel}>Username</Text>
              <TextInput
                placeholder="Username"
                className={styles.textInput}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <Text className={styles.formLabel}>Password</Text>
              <div className={styles.passwordField}>
                <TextInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={styles.textInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  onClick={() => setShowPassword((prev) => !prev)}
                  variant="transparent"
                  className={styles.showPasswordButton}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
            </div>
            <div className={styles.formField}>
              <div className={styles.rememberMeContainer}>
                <div className={styles.rememberMeLabel}>
                  <Checkbox color="dark" label="Remember me" />
                  <Text className={styles.rememberMeText}>Remember me</Text>
                </div>
                <Text className={styles.forgotPasswordText}>
                  Forgot password?
                </Text>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button variant="light" className={styles.registerButton}>
                Register
              </Button>
              <Button
                type="submit"
                variant="light"
                className={styles.loginButton}
              >
                Log In
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;
