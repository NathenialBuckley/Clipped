import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "./profile_1.jpg"



export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <body className="overview">
            <nav>
                <div className="container">
                    <h2 className="logo">
                        <Link className="Link" to="/">Clipped</Link>
                    </h2>
                    <div className="search-bar">
                        <i className="uil uil-search"></i>
                        <input type="search" placeholder="Search for creators, inspirations, and projects" />
                    </div>
                    <div className="create">
                        <Link to="/content/uploads"><label className="btn btn-primary" for="create-post">Create</label></Link>
                        <div className="profile-photo">
                            <Link to="/profile"><img src={logo} /></Link>
                        </div>
                    </div>
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("clipped_user")
                        navigate("/", { replace: true })
                    }}>Logout</Link>
                </div>
            </nav>
        </body>
    )

    // return (
    //     <ul className="navbar">
    //         <li className="navbar__item navbar__home">
    //             <Link className="navbar__link" to="/">Home</Link>
    //         </li>
    //         <li className="navbar__item navbar__upload">
    //             <Link className="navbar__link" to="/content/uploads">Upload</Link>
    //         </li>
    //         <li className="navbar__item navbar__profile">
    //             <Link className="navbar__link" to="/profile">Profile</Link>
    //         </li>
    //         <li className="navbar__item navbar__logout">
    //             <Link className="navbar__link" to="" onClick={() => {
    //                 localStorage.removeItem("clipped_user")
    //                 navigate("/", { replace: true })
    //             }}>Logout</Link>
    //         </li>
    //     </ul>
    // )
}

// class Home extends React.Component {
//     render() {
//         return (
//             <div>

//                 <nav>
//                     <div class="container">
//                         <h2 class="logo">
//                             Clipped
//                         </h2>
//                         <div class="search-bar">
//                             <i class="uil uil-search"></i>
//                             <input type="search" placeholder="Search for creators, inspirations, and projects" />
//                         </div>
//                         <div class="create">
//                             <label class="btn btn-primary" for="create-post">Create</label>
//                             <div class="profile-photo">
//                                 <img src="images/profile-1.jpg" />
//                             </div>
//                         </div>
//                     </div>
//                 </nav>

//             </div>
//         )
//     }
// }

// export default Home;