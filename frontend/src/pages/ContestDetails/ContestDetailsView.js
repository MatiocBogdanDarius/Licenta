import React from 'react';
import style from "./ContestDetails.module.css";
import {Container} from "reactstrap";
import Navbar from "components/navbar";
import AddFavoriteModal from "components/modals/add_favorite_modal";
import Footer from "components/footer";
import Copyright from "components/copyright";
import ContestsList from "components/contests_list_component"

const ContestDetailsView = (props) => {
    return (
        <div className={style.contest_details}>
            <Navbar/>
            <div className={style.scrollable_area}>
                <div className={style.content}>
                    <Container sx="lg" className={style.container}>
                        <div className={style.contests_list}>
                            <ContestsList
                                favoriteButtonHandle={props.favoriteButtonHandle}
                                checkIfItemIsFavorite={props.checkIfItemIsFavorite}
                            />
                        </div>
                    </Container>
                </div>
                <Footer/>
                <Copyright/>
            </div>
            <AddFavoriteModal
                isOpen={props.isOpenAddFavoriteModal}
                toggle={props.toggleAddFavoriteModal}
                contentType={props.addFavoriteModalContentType}
            />
        </div>
    )
}

export default ContestDetailsView