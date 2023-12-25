import React, {useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import {Link, useLocation} from "react-router-dom";
import {app__hooks, app__ui} from "#app/components/_app";
import AppContext from "#app/components/hooks/app_context/AppContext";
import {BulbFilled} from "@ant-design/icons";

function MainLayout({children}: { children?: React.ReactNode }) {

    let location = useLocation()

    const {Button} = app__ui

    let appContext = app__hooks.useContext(AppContext)

    const [items] = useState<MenuProps['items']>([
        {
            label: (<Button type={'text'} href={'/'}>Главная</Button>),
            key: '/',
        },
        {
            label: (<Button type={'text'} href={'/create'}>Добавить</Button>),
            key: '/create',
        }
    ]);

    const [currentMenuItem, setCurrentMenuItem] = useState(location.pathname);

    const onClick: MenuProps['onClick'] = (e) => console.log('menu item clicked ', e)

    useEffect(() => {
        setCurrentMenuItem(location.pathname)
    }, [location.pathname])

    return <>
        <Menu tabIndex={-1} onClick={onClick} selectedKeys={[currentMenuItem]} mode="horizontal"
              items={
                  items?.concat({
                      style: {position: 'absolute', right: '0'},
                      label: <Button icon={<BulbFilled/>} onClick={appContext.toggleTheme}/>,
                      key: 'theme',
                  })
              }
        />
        {children}
    </>
}

export default MainLayout;
