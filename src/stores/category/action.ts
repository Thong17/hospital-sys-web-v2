import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryService } from "services/category";
import { serviceWrapper } from "utils/index";

const service = new CategoryService()

export const getCategoryCreate: any = createAsyncThunk(
    'category/create',
    serviceWrapper(service.create)
)

export const getCategoryDelete: any = createAsyncThunk(
    'category/delete',
    serviceWrapper(service.delete)
)

export const getCategoryList: any = createAsyncThunk(
    'category/list',
    serviceWrapper(service.list)
)