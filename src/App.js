import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3003/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    if (typeof newName !== "string" || newName.length < 1) {
      window.alert("Please provide a name");
      return;
    }

    if (typeof newNumber !== "string" || newNumber.length < 1) {
      window.alert("Please provide a number");
      return;
    }

    const newNameObject = {
      name: newName,
      number: newNumber,
    };

    const foundPerson = persons.find((p) => p.name === newName);
    if (foundPerson) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newNameObject));
    setNewName("");
    setNewNumber("");
  };

  const personsToDisplay = persons.filter((p) =>
    p.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleChange={handleFilterChange} />

      <h3>Add new contact</h3>
      <Form
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsList={personsToDisplay} />
    </div>
  );
}

export default App;
