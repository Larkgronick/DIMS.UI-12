import { MainContext } from '../../services/context';
import { ErrorRow } from './ErrorRow';

export function ProgressTable() {
  return (
    <MainContext.Consumer>
      {(context) => {
        const { error, userTasks, userIndex } = context;
        if (error) {
          return <ErrorRow page='progress' />;
        }
        return (
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
                  {context.userTasks[i].date[context.userIndex].items.map((el) => (
                    <p>{el}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        );
      }}
    </MainContext.Consumer>
  );
}
