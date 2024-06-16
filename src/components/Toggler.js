import { useContext } from 'react';
import { AppContext } from '../App';
import { ReactComponent as IconSun } from '../icons/sun.svg';
import { ReactComponent as IconMoon } from '../icons/moon.svg';

function Toggler() {
  const {isDarkTheme, setIsDarkTheme} = useContext(AppContext);

  return (
    <div className="toggler-container">
      <input
        type="checkbox"
        id="dark-mode-toggle"
        onChange={() => setIsDarkTheme(!isDarkTheme)}
        checked={isDarkTheme}
      />
      <label className="toggle-label" htmlFor="dark-mode-toggle">
        <IconMoon />
        <IconSun />
      </label>
    </div>
  );
}

export default Toggler;