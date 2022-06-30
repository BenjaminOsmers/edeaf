import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import oauth from "axios-oauth-client";

// client_id, client_secret, scope, username, password, grant_type

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const getToken = oauth.client(axios.create(), {
        url: "https://edeaf-api-staging.azurewebsites.net/connect/token",
        grant_type: "password",
        client_id: "web-dashboard",
        client_secret: "SuperSecretPassword",
        username,
        password,
        scope: "openid profile role email offline_access adminApi mobileApi",
      });

      const { access_token } = await getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const { data } = await axios.get(
        "https://edeaf-api-staging.azurewebsites.net/v1/admin/Users/current",
        config
      );

      const user = {
        id: data.data.id,
        email: `${data.data.email}`,
        name: `${data.data.name}`,
        lastName: `${data.data.lastName}`,
        roles: data.data.roles,
        token: `${access_token}`,
      };

      localStorage.setItem("userInfo", JSON.stringify(user));
      return user;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");

  return null;
});
