import "./App.css";
import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("Chester");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${search},GB&appid=${API_KEY}&units=metric`
      );
      if (response.code !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      // console.log(err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    handleFetch();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("");
  };

  if (loading) return <h1>Loading...</h1>;
  if (error)
    return (
      <>
        <h1>Error.</h1>
        <p>{error}</p>
      </>
    );
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {data.main && (
        <>
          <h2>Name: {data.name}</h2>
          <p>Temp: {data.main.temp}</p>
          <p>Humidity: {data.main.humidity}%</p>
        </>
      )}
    </div>
  );
};

export default App;
