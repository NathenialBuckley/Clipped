import { Outlet, Route, Routes } from "react-router-dom";
import { AddContent } from "../../Content/Content";
import { UploadForm } from "../../Content/UploadForm";
import { Profile } from "../profile/Profiles";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>


                    <Outlet />

                </>
            }>
                <Route path="profile" element={<Profile />} />
                <Route path="content/uploads" element={<UploadForm />} />
            </Route>
            <Route index element={<AddContent />} />
        </Routes>
    )
}