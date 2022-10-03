import { useEffect, useState } from "react"

export const Profile = () => {
    const [users, updateUsers] = useState({
        userName: "",
        email: ""
    })

    const [favorites, updateFavorites] = useState([])

    const localClippedUser = localStorage.getItem("clipped_user")
    const clippedUserObject = JSON.parse(localClippedUser)

    useEffect(() => {
        fetch(`http://localhost:8088/users?userId=${clippedUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const userObject = data[0]
                updateUsers(userObject)
            })
        fetch(`http://localhost:8088/favorites?userId=${clippedUserObject.id}&_expand=content&_expand=user&`)
            .then(response => response.json())
            .then((favorites) => {
                updateFavorites(favorites)
            })
    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/users/${users.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(users)
        })
            .then(response => response.json())
            .then(() => {

            })
    }

    return (
        <>
            <form className="profile">
                <h2 className="profile_title">Edit Profile</h2>
                <fieldset>
                    <div className="form_group">
                        <label htmlFor="username">Username</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={users.userName}
                            onChange={
                                (evt) => {
                                    const copy = { ...users }
                                    copy.userName = evt.target.value
                                    updateUsers(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" value={users.email}
                            onChange={
                                (evt) => {
                                    const copy = { ...users }
                                    copy.email = evt.target.value
                                    updateUsers(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>

            <h2>Your Favorites</h2>

            <article className="favorites">
                {favorites.map(
                    (favorite) => {
                        return <section className="favorite" key={`favorite--${favorite.id}`}>
                            <header>{favorite.content.title}</header>
                            <img className="content-image" src={favorite.content.media} />
                        </section>
                    }
                )}
            </article>
        </>
    )
}