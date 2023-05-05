import React from "react";
import AddFavoriteModalView from "./AddFavoriteModalView";

export function AddFavoriteModalContainer(props) {
    return (
        <AddFavoriteModalView
            isOpen={props.isOpen}
            toggle={props.toggle}
            contentType={props.contentType}
        />);
}
