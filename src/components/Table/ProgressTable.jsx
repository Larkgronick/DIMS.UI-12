import { UserTasksContext } from '../../contexts/UserTasksContext';

export function ProgressTable() {
  return (
    <UserTasksContext.Consumer>
      {({ userTasks, userTracks }) => {
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
                      <p key={el}>{el}</p>
                    ))}
                  </td>
                  <td>
                    {date.map((el) => (
                      <p key={el}>{el}</p>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        );
      }}
    </UserTasksContext.Consumer>
  );
}
