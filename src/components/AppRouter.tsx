import React from "react";
import GWGame from "../screens/MakeLinkGameScreen";
import { Routes, Route, Navigate } from "react-router-dom";
import GWCouplesListView from "../screens/CouplesListScreen"
import SectionsScreen from "../screens/SectionsScreen";
import StorageScreen from "../screens/StorageScreen";

const AppRouter = () => {

    const privateRoutes = [
        { path: '/', element: GWGame },
        { path: '/sections', element: SectionsScreen },
        { path: '/coupleslist', element: GWCouplesListView },
        { path: '/storage', element: StorageScreen },
    ]

    return (
        <Routes>
            {privateRoutes.map(route =>
                <Route
                    element={route.element()}
                    path={route.path}
                    key={route.path}
                />
            )}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
}

export default AppRouter;