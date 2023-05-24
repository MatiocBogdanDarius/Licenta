import React from "react";
import FormationsTableView from "./FormationsTableView";

export function FormationsTableContainer(props) {
    return (<FormationsTableView lineups={props.lineups}/>);
}
