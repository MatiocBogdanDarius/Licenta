import * as React from 'react';
import style from './Navbar.module.css'
import {Container} from "reactstrap";

function ProfileView(props) {
    return (
        <div className={style.navbar} >
            <Container sx="lg" className={style.container}>

            </Container>
        </div>
    );
}

export default ProfileView;