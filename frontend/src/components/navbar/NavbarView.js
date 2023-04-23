import * as React from 'react';
import style from './Navbar.module.css'
import {Container} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBell, faMagnifyingGlass, faRightToBracket, faUser} from "@fortawesome/free-solid-svg-icons";

function NavbarView(props) {

    return (
        <div position="static" className={style.navbar}>
            <Container sx="lg" className={style.container}>
                <div className={style.logo_container}>
                    <div className={style.logo}/>
                </div>
                <div className={style.buttons}>
                    <div className={style.search_button} onClick={props.searchButtonHandle}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon}/>
                    </div>
                    {props.user ?
                        <div className={style.profile_button} onClick={props.profileButtonHandle}>
                            <FontAwesomeIcon icon={faUser} className={style.icon}/>
                            <p className={style.button_text}>{`${props.user.firstname} ${props.user.lastname}`}</p>
                        </div> :
                        <div className={style.login_button} onClick={props.loginButtonHandle}>
                            <FontAwesomeIcon icon={faRightToBracket} className={style.icon}/>
                            <p className={style.button_text}>Login</p>
                        </div>
                    }
                    {props.user &&
                        <div className={style.notification_button} onClick={props.notificationButtonHandle}>
                            <FontAwesomeIcon icon={faBell} className={style.icon}/>
                            {props.notifications?.length &&
                                <div className={style.notification_number}>
                                    <p>{props.notifications.length}</p>
                                </div>
                            }
                        </div>
                    }
                    <div className={style.settings_button} onClick={props.settingsButtonHandle}>
                        <FontAwesomeIcon icon={faBars} className={style.icon}/>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default NavbarView;