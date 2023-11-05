import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "services/auth";
import { serviceWrapper } from "utils/index";

const service = new AuthService()

export const getProfile: any = createAsyncThunk(
    'session/profile',
    serviceWrapper(service.profile)
)