import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response));
  }, []);

  const handleSetNewName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleSetNewNumber = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleSetFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .deletePerson(id)
        .then(() =>
          personsService.getAll().then((response) => setPersons(response))
        )
        .catch((error) => {
          setNotificationMessage({
            message: `Information of ${name} has already been removed from the server`,
            state: "error",
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const isAlreadyExist = persons.some((person) => person.name === newName);
    if (isAlreadyExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToChange = persons.find(
          (person) => person.name === newName
        );
        personsService
          .update(personToChange.id, {
            name: newName,
            number: newNumber,
          })
          .then(() => {
            setNewName("");
            setNewNumber("");
            personsService.getAll().then((response) => setPersons(response));
          });
      }
    } else {
      personsService.create({ name: newName, number: newNumber }).then(() => {
        setNotificationMessage({
          message: `Added ${newName}`,
          state: "notification",
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
        personsService.getAll().then((response) => setPersons(response));
      });
    }
  };

  useEffect(() => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} handleSetFilter={handleSetFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleSetNewName={handleSetNewName}
        newNumber={newNumber}
        handleSetNewNumber={handleSetNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
