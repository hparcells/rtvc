import classes from './Footer.module.scss';

function Footer() {
  return (
    <div className={classes.root}>
      <span>
        <a href='https://github.com/hparcells/rtvc' target='_blank'>
          View Source Code on GitHub
        </a>
      </span>
    </div>
  );
}

export default Footer;
