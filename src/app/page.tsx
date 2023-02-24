import 'regenerator-runtime';

import Body from '../components/Body/Body';
import Header from '../components/Header/Header';

import classes from './page.module.scss';

function IndexPage() {
  return (
    <>
      <Header />
      <div className={classes.content}>
        <div className={classes.bodyWrapper}>
          <Body />
        </div>
      </div>
    </>
  );
}

export default IndexPage;
