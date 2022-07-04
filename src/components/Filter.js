function Filter(props) {
  return (
    <p>
      filter shown with{" "}
      <input
        type="text"
        value={props.filterValue}
        onChange={props.handleChange}
      />
    </p>
  );
}

export default Filter;
