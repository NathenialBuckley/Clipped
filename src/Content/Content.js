import { useEffect, useState } from "react";
import "./content.css"
import pfp from "./profile_1.jpg"
import pfp2 from "./profile_2.jpg"
import pfp3 from "./profile_3.jpg"
import pfp4 from "./profile_4.jpg"
import pfp5 from "./profile_5.jpg"
import pfp6 from "./profile_6.jpg"
import pfp7 from "./profile_7.jpg"
import pfp8 from "./profile_8.jpg"
import pfp9 from "./profile_9.jpg"
import pfp10 from "./profile_10.jpg"
import pfp11 from "./profile_11.jpg"
import pfp12 from "./profile_12.jpg"
import pfp13 from "./profile_13.jpg"
import story1 from "./story_1.jpg"
import story2 from "./story_2.jpg"
import feed1 from "./feed_1.jpg"
import feed2 from "./feed_2.jpg"
import feed3 from "./feed_3.jpg"


export const AddContent = () => {
    const [contents, setContent] = useState([{}])
    const [users, setUsers] = useState([])
    const menuItems = document.querySelectorAll(`.menu-item`)


    const theme = document.querySelector(`#theme`)
    const themeModal = document.querySelector(`.customize-theme`)
    const fontSizes = document.querySelectorAll(`.choose-size span`)
    var root = document.querySelector(`:root`)
    const colorPalette = document.querySelectorAll(`.choose-color span`)
    const Bg1 = document.querySelector(`.bg-1`)
    const Bg2 = document.querySelector(`.bg-2`)
    const Bg3 = document.querySelector(`.bg-3`)
    const localClippedUser = localStorage.getItem("clipped_user")
    const clippedUserObject = JSON.parse(localClippedUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/contents?_expand=user`)
                .then(response => response.json())
                .then((contents) => {
                    setContent(contents)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((users) => {
                    setUsers(users)
                })
        },
        []
    )

    const CanDelete = (content) => {
        if (clippedUserObject?.id === content.userId) {
            return <>
                <div className="acton-buttons">
                    <i className="uil uil-image-slash" onClick={() => WillDelete(content)}></i>
                </div>
            </>
        }
    }

    const WillDelete = (content) => {
        const copy = {
            title: content.title,
            media: content.media,
            genreId: content.genreId,
            userId: content.userId,
            mediaTypeId: content.mediaTypeId
        }
        return fetch(`http://localhost:8088/contents/${content.id}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8088/contents`)
                    .then(response => response.json())
                    .then((contents) => {
                        setContent(contents)
                    })
            })
    }

    const CanFavorite = (content) => {
        if (clippedUserObject?.id !== content.userId) {
            return <>
                <div className="action-buttons">
                    <i className="uil uil-heart" onClick={() => WillFavorite(content)}></i>
                </div>
            </>
        }
    }

    const WillFavorite = (content) => {
        const copy = {
            contentId: content.id,
            userId: clippedUserObject.id,
        }
        return fetch(`http://localhost:8088/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:8088/contents`)
                    .then(response => response.json())
                    .then((contents) => {
                        setContent(contents)
                    })
            })
    }

    const changeActiveItem = () => {
        menuItems.forEach(item => {
            item.classList.remove(`active`);
        })
    }

    menuItems.forEach(item => {
        item.addEventListener(`click`, () => {
            changeActiveItem();
            item.classList.add(`active`);
            if (item.id !== `notifications`) {
                document.querySelector(`.notification-popup`).
                    style.display = `none`;
            } else {
                document.querySelector(`.notification-popup`).
                    style.display = `block`;
            }
        })
    })

    return <>
        {/* ------------------ MAIN ---------------------- */}
        <main>
            <div className="container">
                {/* -------- LEFT ------- */}
                <div className="left">
                    <a className="profile">
                        <div className="profile-photo">
                            <img src={pfp} />
                        </div>
                        <div className="handle">
                            <h4>Awesomesauce</h4>
                            <p className="text-muted">
                                @dayi
                            </p>
                        </div>
                    </a>
                    {/* -------- SIDEBAR -------- */}
                    <div class="sidebar">
                        <a class="menu-item active">
                            <span><i class="uil uil-home"></i></span>
                            <h3>Home</h3>
                        </a>
                        <a class="menu-item" id="notifications">
                            <span><i class="uil uil-bell"></i></span>
                            <h3>Notifications</h3>
                        </a>
                        <a class="menu-item" id="messages-notifications">
                            <span><i class="uil uil-envelope-alt"></i></span>
                            <h3>Messages</h3>
                        </a>
                        <a class="menu-item" id="theme">
                            <span><i class="uil uil-palette"></i></span>
                            <h3>Theme</h3>
                        </a>
                        <a class="menu-item">
                            <span><i class="uil uil-setting"></i></span>
                            <h3>Settings</h3>
                        </a>
                    </div>
                    {/* -------- END OF SIDEBAR -------- */}
                    <label for="create-post" className="btn btn-primary">Create Post</label>
                </div>
                {/* -------- Middle -------- */}
                <div className="middle">
                    {/* -------- STORIES ------- */}
                    <div className="stories">
                        <div className="story">
                            <div className="profile-photo">
                                <img src={pfp8} />
                            </div>
                            <p className="name">Your Story</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={pfp9} />
                            </div>
                            <p className="name">Lilia James</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={pfp10} />
                            </div>
                            <p className="name">Winnie Hale</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={pfp11} />
                            </div>
                            <p className="name">Daniel Bale</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={pfp12} />
                            </div>
                            <p className="name">Jane Doe</p>
                        </div>
                        <div className="story">
                            <div className="profile-photo">
                                <img src={pfp13} />
                            </div>
                            <p className="name">Tina White</p>
                        </div>
                    </div>
                    {/* -------- END OF STORIES -------- */}
                    <form class="create-post">
                        <div class="profile-photo">
                            <img src={pfp} />
                        </div>
                        <input type="text" placeholder="What's on your mind?" id="create-post" />
                        <input type="submit" value="Post" class="btn btn-primary" />
                    </form>
                    {/* -------- FEEDS -------- */}
                    <div className="feeds">

                        {contents.map(
                            (content) => {
                                return <div className="feed">
                                    <div className="head">
                                        {/* <header>{content.title}</header> */}
                                        <div className="user">
                                            <div className="profile-photo">
                                                <img src={content?.user?.userProfilePicture} />
                                            </div>
                                            <div className="ingo">
                                                <h3>{content?.user?.userName}</h3>

                                            </div>
                                        </div>
                                        <span className="edit">
                                            <i class="uil uil-ellipsis-h"></i>
                                        </span>
                                    </div>
                                    <div className="photo">
                                        <img className="photo" src={content.media} />
                                        {CanDelete(content)}{CanFavorite(content)}
                                    </div>
                                    <div className="action-buttons">
                                        <div className="interaction-buttons"></div>
                                        <div className="bookmark"></div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                {/* -------- RIGHT -------- */}
                <div className="right">
                    <div className="messages">
                        <div className="heading">
                            <h4>Messages</h4><i class="uil uil-edit"></i>
                        </div>
                        {/* -------- SEARCH BAR -------- */}
                        <div className="search-bar">
                            <i class="uil uil-search"></i>
                            <input type="search" placeholder="Search messages" id="message-search" />
                        </div>
                        <div className="category">
                            {/* <h6 className="active">Primary</h6> */}
                            <h6>COMING SOON!</h6>
                        </div>
                    </div>
                    {/* -------- END OF MESSAGES -------- */}

                    <div className="friend-requests">
                        <h4>Requests</h4>
                        <div className="requests">
                            <div className="info"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* =================================== THEME CUSTOMIZATION ======================================= */}
        <div className="customize-theme">
            <div className="card">
                <h2>Customize your view</h2>
                <p className="active">Manage your font size, color, and background.</p>

                {/* ======== FONT SIZE ======== */}
                <div className="font-size">
                    <h4>Font Size</h4>
                    <div>
                        <h6>Aa</h6>
                        <div className="choose-size">
                            <span className="font-size-1"></span>
                            <span className="font-size-2"></span>
                            <span className="font-size-3"></span>
                            <span className="font-size-4"></span>
                            <span className="font-size-5"></span>
                        </div>
                        <h3>Aa</h3>
                    </div>
                </div>

                {/* ======== PRIMARY COLORS ========= */}
                <div className="color">
                    <h4>Color</h4>
                    <div className="choose-color">
                        <span className="color-1 active"></span>
                        <span className="color-2"></span>
                        <span className="color-3"></span>
                        <span className="color-4"></span>
                        <span className="color-5"></span>
                    </div>
                </div>

                {/* ======== BACKGROUND COLORS ======== */}
                <div className="background">
                    <h4>Background</h4>
                    <div className="choose-bg">
                        <div className="bg-1">
                            <span></span>
                            <h5 for="bg-1">Light</h5>
                        </div>
                        <div className="bg-2">
                            <span></span>
                            <h5>Dim</h5>
                        </div>
                        <div className="bg-3">
                            <span></span>
                            <h5 for="bg-3">Lights Out</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>


}