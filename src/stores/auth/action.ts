import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "services/auth";
import { serviceWrapper } from "utils/index";

const service = new AuthService()

export const getAuthLogin: any = createAsyncThunk(
    'auth/login',
    serviceWrapper(service.login)
)