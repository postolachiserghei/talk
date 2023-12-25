import {
    Drawer,
    DrawerProps,
} from "antd";
import React from "react";

export default function useDrawer(props: DrawerProps & { children?: React.ReactNode }): any {

    return <Drawer {...props}>
        {props.children}
    </Drawer>
}
