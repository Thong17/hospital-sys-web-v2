import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReportService } from "services/report";
import { serviceWrapper } from "utils/index";

const service = new ReportService()

export const getReportSale: any = createAsyncThunk(
    'report/sale',
    serviceWrapper(service.sale)
)

export const getReportProduct: any = createAsyncThunk(
    'report/product',
    serviceWrapper(service.product)
)