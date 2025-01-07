import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([2020, 2024]);
  const [revenueRange, setRevenueRange] = useState([0, 500000000000]);
  const [netIncomeRange, setNetIncomeRange] = useState([0, 100000000000]);
  const [sortBy, setSortBy] = useState("calendarYear");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:5000/get_financial_data",
      {
        params: {
          start_year: dateRange[0],
          end_year: dateRange[1],
          min_revenue: revenueRange[0],
          max_revenue: revenueRange[1],
          min_net_income: netIncomeRange[0],
          max_net_income: netIncomeRange[1],
        },
      }
    );
    setData(response.data);
    setFilteredData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = data.filter(
      (item) =>
        item.calendarYear >= dateRange[0] &&
        item.calendarYear <= dateRange[1] &&
        item.revenue >= revenueRange[0] &&
        item.revenue <= revenueRange[1] &&
        item.netIncome >= netIncomeRange[0] &&
        item.netIncome <= netIncomeRange[1]
    );
    setFilteredData(filtered);
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sorted = [...filteredData].sort((a, b) => {
      if (field === "calendarYear") {
        const dateA = new Date(a.calendarYear);
        const dateB = new Date(b.calendarYear);
        return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return newSortOrder === "asc" ? a[field] - b[field] : b[field] - a[field];
    });

    setFilteredData(sorted);
    setSortBy(field);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Apple Financial Data</h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <div>
            <label className="block">Date Range</label>
            <input
              type="number"
              value={dateRange[0]}
              onChange={(e) =>
                setDateRange([parseInt(e.target.value), dateRange[1]])
              }
              className="border p-2"
              placeholder="Start Year"
            />
            <input
              type="number"
              value={dateRange[1]}
              onChange={(e) =>
                setDateRange([dateRange[0], parseInt(e.target.value)])
              }
              className="border p-2"
              placeholder="End Year"
            />
          </div>

          <div>
            <label className="block">Revenue Range</label>
            <input
              type="number"
              value={revenueRange[0]}
              onChange={(e) =>
                setRevenueRange([parseInt(e.target.value), revenueRange[1]])
              }
              className="border p-2"
              placeholder="Min Revenue"
            />
            <input
              type="number"
              value={revenueRange[1]}
              onChange={(e) =>
                setRevenueRange([revenueRange[0], parseInt(e.target.value)])
              }
              className="border p-2"
              placeholder="Max Revenue"
            />
          </div>

          <div>
            <label className="block">Net Income Range</label>
            <input
              type="number"
              value={netIncomeRange[0]}
              onChange={(e) =>
                setNetIncomeRange([parseInt(e.target.value), netIncomeRange[1]])
              }
              className="border p-2"
              placeholder="Min Net Income"
            />
            <input
              type="number"
              value={netIncomeRange[1]}
              onChange={(e) =>
                setNetIncomeRange([netIncomeRange[0], parseInt(e.target.value)])
              }
              className="border p-2"
              placeholder="Max Net Income"
            />
          </div>
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Filter Data
        </button>
      </div>

      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("calendarYear")}
            >
              Date{" "}
              {sortBy === "calendarYear"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("revenue")}
            >
              Revenue{" "}
              {sortBy === "revenue" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("netIncome")}
            >
              Net Income{" "}
              {sortBy === "netIncome" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th>Gross Profit</th>
            <th>EPS</th>
            <th>Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.calendarYear}</td>
              <td>{item.revenue.toLocaleString()}</td>
              <td>{item.netIncome.toLocaleString()}</td>
              <td>{item.grossProfit.toLocaleString()}</td>
              <td>{item.eps}</td>
              <td>{item.operatingIncome.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
