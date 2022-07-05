import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
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

  const displayNotification = (type, message) => {
    switch (type) {
      case "error":
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 5000);
        break;
      case "success":
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 5000);
        break;
      default:
        setErrorMessage(null);
        setSuccessMessage(null);
    }
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

    const foundPerson = persons.find((p) => p.name === newName);
    let confirmUpdate;
    if (foundPerson) {
      confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Do you want to replace the old number?`
      );

      if (!confirmUpdate) return;

      const newPersoObject = {
        name: newName,
        number: newNumber,
      };

      personsService
        .update(foundPerson.id, newPersoObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id === foundPerson.id ? returnedPerson : p))
          );
          displayNotification("success", `Updated ${returnedPerson.name}`);
        })
        .catch((err) => displayNotification("error", err.message));
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      };

      personsService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          displayNotification("success", `Added ${returnedPerson.name}`);
        })
        .catch((err) => {
          displayNotification("error", err.message);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);

    if (!confirmDelete) return;

    personsService
      .remove(id)
      .then((status) => {
        if (status === 200) {
          setPersons(persons.filter((p) => p.id !== id));
          displayNotification("success", `Deleted ${person.name}`);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          displayNotification(
            "error",
            `Person "${person.name}" does not exist on the database`
          );
        } else {
          displayNotification("error", err.message);
        }
      });
  };

  const personsToDisplay = persons.filter((p) =>
    p.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
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
      <Persons
        personsList={personsToDisplay}
        handleDeletePerson={deletePerson}
      />
    </div>
  );
}

export default App;
