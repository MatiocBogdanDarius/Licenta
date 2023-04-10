import * as React from 'react';
import {Container} from 'reactstrap';
import style from './Copyright.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopyright} from "@fortawesome/free-solid-svg-icons";


function CopyrightView() {
    return (
        <div className={style.copyright_section}>
            <Container maxWidth="xl" className={style.copyright_content}>
                <FontAwesomeIcon icon={faCopyright} className={style.icon} />
               <p><span className={style.light_green_text_color}>mb-sports-events</span> 2023 | All Rights Reserved</p>
            </Container>
        </div>
    );
}

export default CopyrightView;