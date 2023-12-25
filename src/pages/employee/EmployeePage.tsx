import {Card} from "antd";
import {Route, Routes,useLocation} from "react-router-dom";
import List from "#app/pages/employee/List";
import NoPage from "#app/pages/NoPage";
import React from "react";
import View from "#app/pages/employee/View";
import Create from "#app/pages/employee/Create";

function EmployeePage({className}: { className: string }) {

    let location = useLocation()

    return <div className={className}>
        <Card
            title={`Сотрудники ${location.pathname.replace('/','').toUpperCase()}`}
            children={
                <Routes>
                    <Route  path="/">
                        <Route path={'/'} element={<List/>}/>
                        <Route path={'/view'} element={<View/>}/>
                        <Route path={'/create'} element={<Create/>}/>
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            }/>
    </div>
}

export default EmployeePage;
