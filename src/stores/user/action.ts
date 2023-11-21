import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "services/user";
import { serviceWrapper } from "utils/index";

const service = new UserService()

export const getUserCreate: any = createAsyncThunk(
    'user/create',
    serviceWrapper(service.create)
)

export const getUserUpdate: any = createAsyncThunk(
    'user/update',
    serviceWrapper(service.update)
)

export const getUserDelete: any = createAsyncThunk(
    'user/delete',
    serviceWrapper(service.delete)
)

export const getUserList: any = createAsyncThunk(
    'user/list',
    serviceWrapper(service.list)
)

export const getUserDetail: any = createAsyncThunk(
    'user/detail',
    serviceWrapper(service.detail)
)

export const getUserInfo: any = createAsyncThunk(
    'user/info',
    serviceWrapper(service.info)
)

export const getUserHistory: any = createAsyncThunk(
    'user/history',
    serviceWrapper(service.history)
)

export const getUserExport: any = createAsyncThunk(
    'user/export',
    serviceWrapper(service._export)
)

export const getUserValidate: any = createAsyncThunk(
    'user/validate',
    serviceWrapper(service._validate)
)

export const getUserImport: any = createAsyncThunk(
    'user/import',
    serviceWrapper(service._import)
)