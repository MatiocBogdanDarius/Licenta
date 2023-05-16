import * as React from 'react';
import style from './Profile.module.css'
import {Container} from "reactstrap";
import Calendar from 'components/calendar'
import Navbar from "components/navbar";
import AddFavoriteModal from "components/modals/favorite_modal";
import GameDetailsModal from "components/modals/game_details_modal";

function ProfileView(props) {
    return (
        <div className={style.profile_page}>
            <Navbar/>
            <div className={style.scrollable_area}>
                <Container sx="lg" className={style.container}>
                    <div className={style.calendar_container}>
                        <Calendar viewGameDetails={props.viewGameDetails}/>
                    </div>
                </Container>
            </div>
            <GameDetailsModal
                isOpen={props.isOpenGameDetailsModal}
                sport={props.sport}
                gameId={props.selectedGameId}
                toggle={props.toggleGameDetailsModal}
                favoriteButtonHandle={props.favoriteButtonHandle}
                checkIfItemIsFavorite={props.checkIfItemIsFavorite}
            />
            <AddFavoriteModal
                wishlist={props.wishlist}
                isOpen={props.isOpenAddFavoriteModal}
                itemId={props.addFavoriteModalContent}
                contentType={props.addFavoriteModalContentType}
                season={props.addFavoriteModalContentSeason}
                sport={props.sport}
                updateWishlist={props.updateWishlist}
                toggle={props.toggleAddFavoriteModal}
            />
        </div>
    );
}

export default ProfileView;