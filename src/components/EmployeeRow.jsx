import React from 'react';

const EmployeeRow = ({ employee }) => {
// const EmployeeRow = ({ employee, index }) => {
  // const rowColor = index % 2 === 0 ? '#f2f2f2' : '#ffffff';

  return (
    // <tr className="no-border" style={{ backgroundColor: rowColor }}>
    //   <td className="no-border">{employee.firstName}</td>
    //   <td>{employee.lastName}</td>
    //   <td>{employee.birthDate}</td>
    //   <td>{employee.startDate}</td>
    //   <td>{employee.street}</td>
    //   <td>{employee.city}</td>
    //   <td>{employee.state}</td>
    //   <td>{employee.zipCode}</td>
    //   <td>{employee.department}</td>
    // </tr>

    <>
      <p>{employee.firstName}</p>
      <p>{employee.lastName}</p>
      <p>{employee.birthDate}</p>
      <p>{employee.startDate}</p>
      <p>{employee.street}</p>
      <p>{employee.city}</p>
      <p>{employee.state}</p>
      <p>{employee.zipCode}</p>
      <p>{employee.department}</p>
    </>
  );
};

export default EmployeeRow;
