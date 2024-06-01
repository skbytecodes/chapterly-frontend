import React from "react";
import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true; // Token is considered expired if not present
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now();

    return expirationTime < currentTime;
  } catch (error) {
    // Token decoding failed
    return true;
  }
};
