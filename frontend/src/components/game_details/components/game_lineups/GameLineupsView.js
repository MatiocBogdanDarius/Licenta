import * as React from 'react';
import style from "./GameLineups.module.css";
import FormationsTable from "./components/formations_table";

function GameLineupsView(props) {
    return (
        <div className={style.container}>
            <div className={style.formations_info}>
                <p>{props.lineups[0].formation}</p>
                <p>FORMATION</p>
                <p>{props.lineups[1].formation}</p>
            </div>
            <FormationsTable lineups={props.lineups}/>
            {/*<div className={style}></div>*/}
        </div>
    );
}

export default GameLineupsView;