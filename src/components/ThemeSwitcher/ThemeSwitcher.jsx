import './ThemeSwitcher.scss';
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from '../../store/actions/mainDataAction';

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const {
    main: { theme },
  } = useSelector((state) => state);

  const move = (e) => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    return dispatch(switchTheme(e.target.checked));
  };

  return (
    <label htmlFor='slider' id='switch' className='switch'>
      <input type='checkbox' onChange={move} id='slider' checked={theme === 'light'} />
      <span className='slider round' />
    </label>
  );
}
