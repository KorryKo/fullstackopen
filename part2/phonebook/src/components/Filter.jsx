const Filter = ({ filter, handleSetFilter }) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleSetFilter} />
    </div>
  );
};

export default Filter;
