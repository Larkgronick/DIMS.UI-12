import { getIndex } from '../../services/helpers';
import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function TaskTrackTable() {
  return (
    <MainContext>
      {({ userTasks, userIndex, track, editTrack, deleteTrackHistory, selectItem }) => {
        const taskNames = userTasks[track].trackName[userIndex];
        const taskNotes = userTasks[track].note[userIndex];
        const taskDates = userTasks[track].date[userIndex];

        return (
          <tbody className='table-body'>
            {taskNames.map((item, i) => (
              <tr key={item} className='row'>
                <td>{item}</td>
                <td>{taskNotes[i]}</td>
                <td>{taskDates[i]}</td>
                <td>
                  <Button
                    action={(e) => {
                      selectItem(e, 'subtask');
                      editTrack();
                    }}
                    styles='button edit'
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    action={(e) => {
                      deleteTrackHistory(getIndex(e));
                    }}
                    styles='button danger'
                  >
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
