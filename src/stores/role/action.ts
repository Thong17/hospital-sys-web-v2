import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoleService } from "services/role";
import { serviceWrapper } from "utils/index";

const service = new RoleService()

export const getRolePermission: any = createAsyncThunk(
    'role/getPermission',
    serviceWrapper(service.getPermission)
)

export const getRolePermissionShape: any = createAsyncThunk(
    'role/getPermissionShape',
    serviceWrapper(service.getPermissionShape)
)

export const getRoleCreate: any = createAsyncThunk(
    'role/create',
    serviceWrapper(service.create)
)

export const getRoleUpdate: any = createAsyncThunk(
    'role/update',
    serviceWrapper(service.update)
)

export const getRoleDelete: any = createAsyncThunk(
    'role/delete',
    serviceWrapper(service.delete)
)

export const getRoleList: any = createAsyncThunk(
    'role/list',
    serviceWrapper(service.list)
)

export const getRoleDetail: any = createAsyncThunk(
    'role/detail',
    serviceWrapper(service.detail)
)

export const getRoleHistory: any = createAsyncThunk(
    'role/history',
    serviceWrapper(service.history)
)

export const getRoleExport: any = createAsyncThunk(
    'role/export',
    serviceWrapper(service._export)
)