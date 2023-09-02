import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "services/auth";

const service = new AuthService()

export const getAuthLogin: any = createAsyncThunk(
    'auth/login',
    service.login
)