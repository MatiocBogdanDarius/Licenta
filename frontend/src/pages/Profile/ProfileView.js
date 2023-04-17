import * as React from 'react';
import style from './Profile.module.css'
import {Container} from "reactstrap";
import Calendar from 'components/calendar'
import Navbar from "../../components/navbar";

function ProfileView(props) {
    return (
        <div className={style.profile_page}>
            <Navbar/>
            <div className={style.scrollable_area}>
                <Container sx="lg" className={style.container}>
                    <div className={style.calendar_container}>
                        <Calendar />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default ProfileView;