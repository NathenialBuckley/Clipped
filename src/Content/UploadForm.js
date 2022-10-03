import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const UploadForm = () => {
    const localClippedUser = localStorage.getItem("clipped_user")
    const ClippedUserObject = JSON.parse(localClippedUser)
    const [genres, updateGenres] = useState([])
    const navigate = useNavigate()

    const [userInput, updateUserInput] = useState({
        title: "",
        media: "",
        genreId: 0,
        userId: ClippedUserObject.id,
    })

    const handleSaveButtonClick = (evt) => {
        evt.preventDefault()
        window.alert("Your image has been uploaded!")

        return fetch(`http://localhost:8088/contents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInput)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/")
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/genres`)
                .then(response => response.json())
                .then((genres) => {
                    updateGenres(genres)
                })
        }, []
    )

    const showWidget = (evt) => {
        evt.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dm8zhvlrs`,
            uploadPreset: `pp1nvieo`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url);
                    const copy = { ...userInput }
                    copy.media = result.info.url
                    updateUserInput(copy)
                }
            });
        widget.open()
    }

    return (
        <form className="uploadForm">
            <h2 className="uploadForm_title">Upload Image</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={userInput.title}
                        onChange={
                            (evt) => {
                                const copy = { ...userInput }
                                copy.title = evt.target.value
                                updateUserInput(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genre">Genre: </label>
                    <select
                        onChange={
                            (evt) => {
                                const copy = { ...userInput }
                                copy.genreId = parseInt(evt.target.value)
                                updateUserInput(copy)
                            }
                        }>
                        <option value={0}>
                            Select Genre
                        </option>
                        {
                            genres.map(
                                genre => <option
                                    keys={genre.id}
                                    value={genre.id}>
                                    {genre.genreName}
                                </option>
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <img src={userInput.media}></img>
                    <button
                        onClick={
                            (evt) => {
                                showWidget(evt)
                            }}
                        className="btn btn-primary">
                        Add Image
                    </button>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Upload
            </button>
        </form>
    )
}