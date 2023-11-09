import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export const selectScheduleForm = createSelector(
    (state: RootState) => state.schedule.form,
    (state) => state
)

export const selectScheduleList = createSelector(
    (state: RootState) => state.schedule.list,
    (state) => state
)

export const selectScheduleDetail = createSelector(
    (state: RootState) => state.schedule.detail,
    (state) => state
)