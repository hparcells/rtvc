import packageJson from '../../../package.json';

import classes from './Header.module.scss';

function Header() {
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>RTVC</h1>
      <p>v{packageJson.version}</p>
    </div>
  );
}

export default Header;
