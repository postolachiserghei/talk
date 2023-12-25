import {
    Col,
    ColProps,
} from "antd";
import React from "react";

export default function useCol(props: ColProps & { children?: React.ReactNode }): any {

    return <Col {...props}>
        {props.children}
    </Col>
}
