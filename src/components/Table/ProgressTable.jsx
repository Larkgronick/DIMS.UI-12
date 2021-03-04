import { MainContext } from '../../services/context';

export function ProgressTable() {
  return (
    <MainContext>
      {({ userTasks, userIndex }) => (
        <tbody className='table-body'>
          {userTasks.map((item, i) => (
            <tr key={item} className='row'>
              <td className='progress'>{item.name}</td>
              <td>
                {userTasks[i].trackName[userIndex].map((el) => (
                  <p>{el}</p>
                ))}
              </td>
              <td>
                {userTasks[i].note[userIndex].map((el) => (
                  <p>{el}</p>
                ))}
              </td>
              <td>
                {userTasks[i].date[userIndex].map((el) => (
                  <p>{el}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </MainContext>
  );
}
