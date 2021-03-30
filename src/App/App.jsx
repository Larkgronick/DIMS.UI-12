import { PureComponent } from 'react';
import { Main } from '../pages/Main';
import { DrawerProvider } from '../contexts/DrawerProvider';
import { MainDataProvider } from '../contexts/MainDataProvider';
import { UserTasksProvider } from '../contexts/UserTasksProvider';
import { ModalProvider } from '../contexts/ModalProvider';

export class App extends PureComponent {
  render() {
    return (
      <MainDataProvider>
        <UserTasksProvider>
          <ModalProvider>
            <DrawerProvider>
              <Main />
            </DrawerProvider>
          </ModalProvider>
        </UserTasksProvider>
      </MainDataProvider>
    );
  }
}
