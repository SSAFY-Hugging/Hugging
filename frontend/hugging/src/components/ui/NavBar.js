import styled from "styled-components";
import styles from './NavBar.module.css'
import '../../App.css';

function Navbar() {

    return (
        <div className={styles.app}>
        <div className={styles.header}>
            <div className={styles.header_title}>
            <h4 className={styles.header_title1}>Hug</h4><h4 className={styles.header_title2}>ging</h4>
            </div>
            <div className={styles.header_icons}>
                <button className={styles.icon_btn}> <i className="xi-search xi-2x" style={{color:'grey'}}></i></button>
                <button className={styles.icon_btn}><i className="xi-ellipsis-h xi-2x" style={{color:'grey'}}></i>
                    </button>               
            </div>
        </div>        
        </div>
    )
}

export default Navbar;