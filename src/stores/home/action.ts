import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeService } from "services/home";
import { serviceWrapper } from "utils/index";

const service = new HomeService()

export const getHomeContent: any = createAsyncThunk(
    'home/content',
    serviceWrapper(service.content)
)