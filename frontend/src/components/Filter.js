const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Styles
  const containerStyle = {
    backgroundColor: "rgb(72, 72, 72)", 
    border: "2px solid white", // Changed cyan to black
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.4)", // Removed cyan glow
    width: "40%",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  
  const inputStyle = {
    width: "90%",
    padding: "6px",
    fontSize: "14px",
    marginBottom: "8px",
    border: "1px solid black", // Changed cyan to black
    borderRadius: "5px",
    backgroundColor: "rgb(49, 51, 51)",
    color: "white", // Changed text color from black to white for better visibility
    textAlign: "center",
  };
  


  return (
    <div style={containerStyle}>
      <input type="text" name="role" placeholder="Role" onChange={handleChange} style={inputStyle} />
      <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} style={inputStyle} />
    </div>
  );
};

export default Filter;
