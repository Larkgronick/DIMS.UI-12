import { useContext } from 'react';
import { MainContext } from '../../services/context';
import { ErrorRow } from './ErrorRow';

export function ProgressTable() {
  const context = useContext(MainContext);
  const { error, userTasks, userIndex } = context;

  return (
    <MainContext>
      {error
        ? () => <ErrorRow page='progress' />
        : () => (
            <tbody className='table-body'>
              {userTasks.map((item, i) => (
                <tr key={item} className='row'>
                  <td className='progress'>{item.name}</td>
                  <td>
                    {userTasks[i].trackName[userIndex].items.map((el) => (
                      <p>{el}</p>
                    ))}
                  </td>
                  <td>
                    {userTasks[i].note[userIndex].items.map((el) => (
                      <p>{el}</p>
                    ))}
                  </td>
                  <td>
                    {userTasks[i].date[userIndex].items.map((el) => (
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
