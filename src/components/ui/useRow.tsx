import {
    Row,
    RowProps,
} from "antd";
import React from "react";

export default function useForm(props: RowProps & { children?: React.ReactNode }): any {

    return <Row {...props}>
        {props.children}
    </Row>
}
