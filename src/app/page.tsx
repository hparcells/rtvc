import Footer from '../components/Footer/Footer';
import 'regenerator-runtime';

import Body from '../components/Body/Body';
import Header from '../components/Header/Header';

import classes from './page.module.scss';

function IndexPage() {
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage;
