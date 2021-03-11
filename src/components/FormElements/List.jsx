import PropTypes from 'prop-types';

export function List({ children, members, assigners, styles, listId, onChange }) {
  return (
    <label htmlFor={listId}>
      {children}
      <ul id={listId}>
        {members.map(({ name: firstName, id, lastName }) => (
          <li key={id} className={styles}>
            <input checked={assigners.includes(id)} type='checkbox' value='true' name={id} onChange={onChange} />
            {`${firstName} ${lastName}`}
          </li>
        ))}
      </ul>
    </label>
  );
}

List.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  assigners: PropTypes.instanceOf(Array).isRequired,
  styles: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
