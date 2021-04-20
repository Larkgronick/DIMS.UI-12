import { useSelector } from 'react-redux';
import { convertDate, generateID } from '../../services/helpers';

export function ProgressTable() {
  const { userTasks, userTracks } = useSelector((state) => state.user);
  return (
    <tbody className='table-body'>
      {userTasks.map((item, i) => {
        const { trackName, note, date } = userTracks[i];
        return (
          <tr key={item.name} className='row'>
            <td className='progress-adapt progress'>
              <p className='adapt'>Task:</p>
              {item.name}
            </td>
            <td className='progress-adapt'>
              <p className='adapt'>Tracks:</p>
              {trackName.map((el) => (
                <p key={el}>{el}</p>
              ))}
            </td>
            <td className='progress-adapt'>
              <p className='adapt'>Notes:</p>
              {note.map((el) => (
                <p key={generateID()}>{el}</p>
              ))}
            </td>
            <td className='progress-adapt'>
              <p className='adapt'>Dates:</p>
              {date.map((el) => (
                <p key={generateID()}>{convertDate(el)}</p>
              ))}
            </td>
            <td className='progress-adapt'>
              <span className={userTracks[i].status}>{userTracks[i].status}</span>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
