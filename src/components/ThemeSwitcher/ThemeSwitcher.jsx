import './ThemeSwitcher.scss';
import { MainDataContext } from '../../contexts/MainDataContext';

export function ThemeSwitcher() {
  return (
    <MainDataContext.Consumer>
      {({ switchTheme, theme }) => (
        <label htmlFor='slider' id='switch' className='switch'>
          <input
            type='checkbox'
            onChange={(e) => switchTheme(e.target.checked)}
            id='slider'
            checked={theme === 'light'}
          />
          <span className='slider round' />
        </label>
      )}
    </MainDataContext.Consumer>
  );
}
