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