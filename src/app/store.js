import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../feature/employees.slice"

export default configureStore({
    reducer: {
        employees: employeesReducer,
    },
})