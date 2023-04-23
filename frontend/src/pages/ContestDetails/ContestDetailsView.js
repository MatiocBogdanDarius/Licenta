import React from 'react';
import style from "./ContestDetails.module.css";
import {Container} from "reactstrap";
import Navbar from "components/navbar";
import AddFavoriteModal from "components/modals/add_favorite_modal";
import Footer from "components/footer";
import Copyright from "components/copyright";
import ContestsList from "components/contests_list_component"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faArrowLeft, faStar} from "@fortawesome/free-solid-svg-icons";
import {WISHLIST_ITEM_TYPE} from "../../assets/constants/Data";

const ContestDetailsView = (props) => {
    return (
        <div className={style.contest_details}>
            <Navbar/>
            <div className={style.scrollable_area}>
                <div className={style.content}>
                    <Container sx="lg" className={style.container}>
                        <div className={style.back_button}>
                            <FontAwesomeIcon icon={faArrowLeft} className={style.back_button_icon}/>
                        </div>
                        {props.contest &&
                            <div className={style.header}>
                                <div className={style.path_container}>
                                    <FontAwesomeIcon icon={props.selectedSport.icon} className={style.icon}/>
                                    <p className={style.sport_link}>{props.selectedSport.name}</p>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    {props.contest.country.flag &&
                                        <div className={style.contest_country_flag_container}>
                                            <img src={props.contest.country.flag} className={style.flag_image} alt=""/>
                                        </div>
                                    }
                                    <p className={style.country_link}>{props.contest.country.name}</p>
                                </div>
                                <div className={style.info_container}>
                                    {props.contest.league.logo &&
                                        <div className={style.contest_league_flag_container}>
                                            <img src={props.contest.league.logo} className={style.flag_image} alt=""/>
                                        </div>
                                    }
                                    <p className={style.league_title}>{props.contest.league.name}</p>
                                    <div
                                        className={style.star_icon_container}
                                        onClick={(event) => props.favoriteButtonHandle(event, props.contest.league.id, WISHLIST_ITEM_TYPE.CONTEST)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={`${style.star_icon} ${props.checkIfItemIsFavorite(props.contest.league.id, WISHLIST_ITEM_TYPE.CONTEST) ? style.is_favorite : ""}`}
                                        />
                                    </div>
                                </div>
                                <div className={style.menu_container}></div>
                            </div>
                        }
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