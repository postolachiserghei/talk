import {
    Form,
    FormProps,
    FormInstance
} from "antd";
import React from "react";

export const FormUse:()=> FormInstance = ()=>Form.useForm()[0]

export default function useForm(props: FormProps & { children?: React.ReactNode }): any {

    return <Form {...props} layout={'vertical'}>
        {props.children}
    </Form>
}
