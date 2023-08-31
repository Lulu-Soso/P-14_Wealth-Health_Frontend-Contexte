import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: localStorage.getItem("employees")
    ? JSON.parse(localStorage.getItem("employees"))
    : [],
  employeeInfo: localStorage.getItem("employeeInfo")
    ? JSON.parse(localStorage.getItem("employeeInfo"))
    : null,
  error: null,
  filteredResults: [],
  searchValue: "",
  pagination: {
    currentPage: 1,
    entriesToShow: 10,
  },
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // setEmployeesData: (state, action) => {
    setEmployeesData: (state, { payload }) => {
      // state.employees = action.payload;
      state.employees = payload;
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
    addEmployee: (state, { payload }) => {
      state.employees.push(payload);
      localStorage.setItem("employeeInfo", JSON.stringify(payload));
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setEntriesToShow: (state, { payload }) => {
      state.pagination.entriesToShow = payload;
    },
    setSearch: (state, { payload }) => {
      state.searchValue = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.pagination.currentPage = payload;
    },
  },
});

export const {
  setEmployeesData,
  addEmployee,
  setError,
  setCurrentPage,
  setEntriesToShow,
  setSearch,
} = employeesSlice.actions;
export default employeesSlice.reducer;
