import {
    Form,
    FormProps,
} from "antd";
import React from "react";

export default function useForm(props: FormProps & { children?: React.ReactNode }): any {

    return <Form {...props} layout={'vertical'}>
        {props.children}
    </Form>
}
