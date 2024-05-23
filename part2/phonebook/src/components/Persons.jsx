const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number} {"  "}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Persons;
