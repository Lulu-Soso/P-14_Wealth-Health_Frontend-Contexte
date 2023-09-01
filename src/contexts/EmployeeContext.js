import React, { createContext, useContext, useReducer } from "react";

const EmployeeContext = createContext();

const initialState = {
  employeesData: [],
  formData: {},
  error: null,
  // ... autres états si nécessaire
};

const employeeReducer = (state, action) => {
    switch (action.type) {
      case "SET_EMPLOYEES_DATA":
        return { ...state, employeesData: action.payload };
      case "ADD_EMPLOYEE":
        return {
          ...state,
          employeesData: [...state.employeesData, action.payload],
        };
      case "SET_FORM_DATA":
        return { ...state, formData: action.payload };
      case "SET_ERROR":
        return { ...state, error: action.payload };
      // ... autres actions
      default:
        return state;
    }
  };

const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};

export { EmployeeProvider, useEmployeeContext };
