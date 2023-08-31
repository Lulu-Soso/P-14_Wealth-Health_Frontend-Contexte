import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmployeesData,
  setError,
  setSearch,
} from "../feature/employees.slice";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

const EmployeesListPage = () => {
  const employeesData = useSelector((state) => state.employees.employees);
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedData = employeesData.slice().sort((a, b) => {
    if (sortBy === null) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleColumnClick = (columnName) => {
    if (sortBy === columnName) {
      toggleSortOrder();
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        dispatch(setEmployeesData(response.data));
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        dispatch(setError(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const totalEntries = sortedData.length;
  const totalPages = Math.ceil(totalEntries / entriesToShow);

  const paginatedData = sortedData
    .filter((employee) => {
      if (!searchValue) return true;
      return (
        employee.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.birthDate.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.startDate.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.street.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.city.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.state.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.zipCode.toLowerCase().includes(searchValue.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchValue.toLowerCase())
      );
    })
    .slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
    dispatch(setSearch(e.target.value));
  };

  const handleEntriesChange = (e) => {
    setEntriesToShow(+e.target.value);
    setCurrentPage(1); // Reset to page 1 on entries change
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  function getPageNumbers(totalPages, currentPage, pagesToShow = 5) {
    const halfWay = Math.ceil(pagesToShow / 2);

    // Déterminer les limites de départ et de fin pour la pagination
    let startPage = currentPage - halfWay + 1;
    let endPage = currentPage + halfWay - 1;

    // Si startPage est négatif ou zéro
    if (startPage <= 0) {
      endPage -= startPage - 1;
      startPage = 1;
    }

    // Si endPage dépasse totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    // Si après avoir fixé endPage, startPage est toujours négatif ou zéro
    if (endPage - pagesToShow + 1 > 0) {
      startPage = endPage - pagesToShow + 1;
    }

    // Générer les numéros de page
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ajouter la première et la dernière page si elles ne sont pas déjà présentes
    if (startPage !== 1) pages.unshift(1);
    if (endPage !== totalPages && totalPages !== 1) pages.push(totalPages);

    return pages;
  }

  return (
    <div className="app-container">
      <div className="employees-header">
        <h2>Current Employees</h2>
        <div className="show-search">
          <div className="filter">
            <label htmlFor="show">Show</label>
            <select
              name="state"
              id="show"
              value={entriesToShow}
              onChange={handleEntriesChange}
            >
              <option value="10">10</option> {/* Corrected values */}
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <p>entries</p>
          </div>
          <div className="search">
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <table className="employees-table">
        <thead>
          <tr>
            <th
              onClick={() => handleColumnClick("firstName")}
              className={`${sortBy === "firstName" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                First Name
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "firstName" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "firstName" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("lastName")}
              className={`${sortBy === "lastName" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                Last Name
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "lastName" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "lastName" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("birthDate")}
              className={`${sortBy === "birthDate" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                Date of Birth
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "birthDate" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "birthDate" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("startDate")}
              className={`${sortBy === "startDate" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                Start Date
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "startDate" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "startDate" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("street")}
              className={`${sortBy === "street" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                Street
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "street" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "street" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("city")}
              className={`${sortBy === "city" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                City
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "city" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "city" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("state")}
              className={`${sortBy === "state" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                State
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "state" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "state" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("zipCode")}
              className={`${sortBy === "zipCode" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                Zip Code
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "zipCode" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "zipCode" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
            <th
              onClick={() => handleColumnClick("department")}
              className={`${sortBy === "department" ? "sorted-column" : ""}`}
            >
              <p className="flex-jcc-aic">
                Department
                <span className="up-down">
                  <FaCaretUp
                    className={
                      sortBy === "department" && sortOrder === "asc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                  <FaCaretDown
                    className={
                      sortBy === "department" && sortOrder === "desc"
                        ? "sorted-icon"
                        : ""
                    }
                  />
                </span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((employee, index) => (
            <tr
              key={employee.id}
              className={index % 2 === 0 ? "table-row-even" : "table-row-odd"}
            >
              <td className={sortBy === "firstName" ? "sorted-column" : ""}>
                {employee.firstName}
              </td>
              <td className={sortBy === "lastName" ? "sorted-column" : ""}>
                {employee.lastName}
              </td>
              <td className={sortBy === "birthDate" ? "sorted-column" : ""}>
                {employee.birthDate}
              </td>
              <td className={sortBy === "startDate" ? "sorted-column" : ""}>
                {employee.startDate}
              </td>
              <td className={sortBy === "street" ? "sorted-column" : ""}>
                {employee.street}
              </td>
              <td className={sortBy === "city" ? "sorted-column" : ""}>
                {employee.city}
              </td>
              <td className={sortBy === "state" ? "sorted-column" : ""}>
                {employee.state}
              </td>
              <td className={sortBy === "zipCode" ? "sorted-column" : ""}>
                {employee.zipCode}
              </td>
              <td className={sortBy === "department" ? "sorted-column" : ""}>
                {employee.department}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex-pagination">
        <div>
          Showing {(currentPage - 1) * entriesToShow + 1} to{" "}
          {Math.min(currentPage * entriesToShow, totalEntries)} of{" "}
          {totalEntries} entries
        </div>

        <div className="pagination">
          <button className="previous-next" onClick={handlePreviousPage}>
            Previous
          </button>

          {pageNumbers.map((number, index) => (
            <React.Fragment key={number}>
              {index > 0 && pageNumbers[index - 1] !== number - 1 && (
                <span>...</span>
              )}
              <button
                className={number === currentPage ? "current-page" : ""}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </button>
            </React.Fragment>
          ))}

          <button className="previous-next" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
      <div className="link-employee">
        <Link to="/employees/create">Create Employee</Link>
      </div>
    </div>
  );
};

export default EmployeesListPage;
