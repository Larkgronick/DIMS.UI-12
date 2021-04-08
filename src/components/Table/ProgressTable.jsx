import { useSelector } from 'react-redux';
import { convertDate, generateID } from '../../services/helpers';

export function ProgressTable() {
  const {
    user: { userTasks, userTracks },
  } = useSelector((state) => state);

  return (
    <tbody className='table-body'>
      {userTasks.map((item, i) => {
        const { trackName, note, date } = userTracks[i];
        return (
          <tr key={item.name} className='row'>
            <td className='progress'>{item.name}</td>
            <td>
              {trackName.map((el) => (
                <p key={el}>{el}</p>
              ))}
            </td>
            <td>
              {note.map((el) => (
                <p key={generateID()}>{el}</p>
              ))}
            </td>
            <td>
              {date.map((el) => (
                <p key={generateID()}>{convertDate(el)}</p>
              ))}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
