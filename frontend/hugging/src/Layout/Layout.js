import { Fragment } from "react";
import Header from './Header';
import FooterNavigation from './FooterNavigation';

const Layout = (props) => {
  return <Fragment>
    <Header />
    <main>{props.children}</main>
    <FooterNavigation />
  </Fragment>;
};

export default Layout;
