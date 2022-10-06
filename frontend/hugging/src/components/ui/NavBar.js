import styled from "styled-components";
import styles from "./NavBar.module.css";
import "../../App.css";

function Navbar() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header_title}>
          <h4 className={styles.header_title1}>Hug</h4>
          <h4 className={styles.header_title2}>ging</h4>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
