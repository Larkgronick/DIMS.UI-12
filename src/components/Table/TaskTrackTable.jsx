import { Button } from '../Buttons/Button/Button';
import { ModalContext } from '../../contexts/ModalContext';
import { UserTasksContext } from '../../contexts/UserTasksContext';
import { getIndex } from '../../services/helpers';

export function TaskTrackTable() {
  return (
    <UserTasksContext>
      {({ userTracks, saveTrackData }) => (
        <ModalContext.Consumer>
          {({ track, editTrack }) => {
            const { trackName, note, date } = userTracks[track];
            const deleteTrack = (e) => {
              saveTrackData({}, track, getIndex(e), 'delete');
            };
            return (
              <tbody className='table-body'>
                {trackName.map((el, i) => (
                  <tr className='row'>
                    <td>{trackName[i]}</td>
                    <td>{note[i]}</td>
                    <td>{date[i]}</td>
                    <td>
                      <Button onClick={editTrack} className='button edit'>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button onClick={deleteTrack} className='button danger'>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            );
          }}
        </ModalContext.Consumer>
      )}
    </UserTasksContext>
  );
}
