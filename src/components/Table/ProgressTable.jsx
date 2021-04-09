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
            <td className='progress-adapt progress'>{item.name}</td>
            <td className='progress-adapt'>
              {trackName.map((el) => (
                <p key={el}>{el}</p>
              ))}
            </td>
            <td className='progress-adapt'>
              {note.map((el) => (
                <p key={generateID()}>{el}</p>
              ))}
            </td>
            <td className='progress-adapt'>
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
