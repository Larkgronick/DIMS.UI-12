import PropTypes from 'prop-types';

export function List({ children, inputRef, items, elements, className, listId, onChange }) {
  return (
    <label htmlFor={listId}>
      {children}
      <ul ref={inputRef} id={listId}>
        {items.map(({ name: firstName, id, lastName }) => {
          const checked = elements.includes(id);
          return (
            <li key={id} className={className}>
              <input checked={checked} type='checkbox' value='true' name={id} onChange={onChange} />
              {`${firstName} ${lastName}`}
            </li>
          );
        })}
      </ul>
    </label>
  );
}

List.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  inputRef: PropTypes.func.isRequired,
  elements: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
