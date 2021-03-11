import { useContext } from 'react';
import { getIndex } from '../../services/helpers';
import { Button } from '../Buttons/Button/Button';
import { MainContext } from '../../services/context';

export function TaskTrackTable() {
  const context = useContext(MainContext);

  const editSelected = (e) => {
    context.selectItem(e, 'subtask');
    context.editTrack();
  };

  const deleteTrack = (e) => {
    context.deleteTrackHistory(getIndex(e));
  };

  return (
    <MainContext>
      {({ userTasks, userIndex, track }) => {
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
                  <Button action={editSelected} styles='button edit'>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button action={(e) => deleteTrack(e)} styles='button danger'>
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
