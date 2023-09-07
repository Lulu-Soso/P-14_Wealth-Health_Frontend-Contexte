import React, { createContext, useContext, useReducer } from "react";

const EmployeeContext = createContext();

const initialState = {
  // employeesData: [],
  // formData: {},
  // error: null,
  employeesData: JSON.parse(localStorage.getItem("employeesData")) || [],
  formData: JSON.parse(localStorage.getItem("formData")) || {},
  error: null,
};

const employeeReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES_DATA":
      try {
        localStorage.setItem("employeesData", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save employeesData to localStorage:", error);
      }
      return { ...state, employeesData: action.payload };

    case "SET_FORM_DATA":
      try {
        localStorage.setItem("formData", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save formData to localStorage:", error);
      }
      return { ...state, formData: action.payload };

    // case "SET_FORM_DATA":
    //   const updatedFormData = action.payload;
    //   try {
    //     localStorage.setItem("formData", JSON.stringify(updatedFormData));
    //   } catch (error) {
    //     console.error("Failed to save formData to localStorage:", error);
    //   }
    //   return { ...state, formData: updatedFormData };

    case "ADD_EMPLOYEE":
      const newEmployeeData = [...state.employeesData, action.payload];
      try {
        localStorage.setItem("employeesData", JSON.stringify(newEmployeeData));
      } catch (error) {
        console.error(
          "Failed to save updated employeesData to localStorage:",
          error
        );
      }
      return { ...state, employeesData: newEmployeeData };

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
