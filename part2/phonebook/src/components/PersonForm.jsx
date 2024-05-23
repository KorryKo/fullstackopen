const PersonForm = ({
  handleAddPerson,
  newName,
  handleSetNewName,
  newNumber,
  handleSetNewNumber,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={handleSetNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleSetNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
