import { useState, useEffect } from "react";

const SearchBar = ({ filterData }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    filterData(inputValue);
  }, [inputValue, filterData]);

  return (
    <>
      <h4>Search in Faq</h4>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </>
  );
};
export default SearchBar;
