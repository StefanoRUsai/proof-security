import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  onLogin: (username: string, password: string) => void;
}

type FormValues = {
  username: string;
  password: string;
};

interface TokenPayload {
  token: string;
}

interface ICSRFTokenResponse {
  csrfToken: string;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [token, setToken] = useState();
  const isAuthenticated = useAuth();
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const navigate = useNavigate();

  function setCookie(name: string, value: string, expirationDays: any) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    debugger;
    document.cookie = cookieValue;
  }

  const fetchCSRFToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9500/api/V1/login/csrf-token"
      );
      console.log(
        "🚀 ~ file: index.tsx:27 ~ fetchCSRFToken ~ response:",
        response.data.csrfToken
      );
      axios.defaults.headers.post["CSRF-Token"] = response.data.csrfToken;
      setToken(response.data.csrfToken);
      return response.data.csrfToken;
    } catch (e) {
      console.log("XXXX error fetchCSRFToken", e);
    }
  };

  React.useEffect(() => {
    async function getCSRFToken() {
      const token = await fetchCSRFToken();
    }

    getCSRFToken();
  }, []);

  /* 
// Configurazione globale di axios

axios.defaults.withCredentials = true;
axios.interceptors.request.use(addCsrfHeader); */

  axios.defaults.withCredentials = true;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { username, password } = data;
    console.log(
      "🚀 ~ file: index.tsx:69 ~ constonSubmit:SubmitHandler<FormValues>= ~ token:",
      token
    );
    try {
      // esegue la chiamata Axios con le credenziali di login
      const response = await axios.post<TokenPayload>(
        "http://localhost:9500/api/V1/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": token,
          },
        }
      );
      // salva il token nel cookie
      setCookie("token", response.data.token, { path: "/" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
      sx={{ marginTop: 25 }}
    >
      <Grid item xs={12}>
        {!isAuthenticated ? (
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="Email"
              variant="outlined"
              {...register("username")}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              {...register("password")}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        ) : (
          <Button
            onClick={() => {
              Cookies.remove("token");
              navigate("/login");
            }}
            variant="contained"
            type="submit"
          >
            LogOut
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(Login);
