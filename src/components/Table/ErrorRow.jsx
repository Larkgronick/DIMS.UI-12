import PropTypes from 'prop-types';

export function ErrorRow({ page }) {
  return (
    <tbody>
      <tr>
        <td className='error-caption attention' colSpan='100%'>
          {`You have no ${page} yet...`}
        </td>
      </tr>
    </tbody>
  );
}

ErrorRow.propTypes = {
  page: PropTypes.string.isRequired,
};