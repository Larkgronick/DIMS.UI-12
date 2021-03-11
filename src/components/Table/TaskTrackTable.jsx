import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function TaskTrackTable() {
  return (
    <MainContext>
      {({ userTasks, userIndex, track, editTrack, deleteTrackHistory }) => {
        const taskNames = userTasks[track].trackName[userIndex].items;
        const taskNotes = userTasks[track].note[userIndex].items;
        const taskDates = userTasks[track].date[userIndex].items;
        return (
          <tbody className='table-body'>
            {taskNames.map((item, i) => (
              <tr key={item} className='row'>
                <td>{item}</td>
                <td>{taskNotes[i]}</td>
                <td>{taskDates[i]}</td>
                <td>
                  <Button onClick={editTrack} className='button edit'>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button onClick={deleteTrackHistory} className='button danger'>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        );
      }}
    </MainContext>
  );
}
