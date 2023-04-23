import React from "react";
import AddFavoriteModalView from "./AddFavoriteModalView";

export function AddFavoriteModalContainer(props) {
    const initOptions = () => {

    }

    return (
        <AddFavoriteModalView
            isOpen={props.isOpen}
            toggle={props.toggle}
            contentType={props.contentType}
        />);
}
