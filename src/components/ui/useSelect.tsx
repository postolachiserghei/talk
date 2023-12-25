import {
    Form,
    FormItemProps,
    Select,
    SelectProps,
} from "antd";
import React from "react";

export default function useInput({
                                     selectProps,
                                     itemProps
                                 }: { selectProps?: SelectProps, itemProps?: FormItemProps }): any {

    return <Form.Item  style={{
        width: '100%',
        display: 'block'
    }} {...itemProps}>
        <Select
            style={{
                width: '100%',
                display: 'block'
            }}
            showSearch placeholder={String(itemProps?.label) + ' ...'} {...selectProps} allowClear={true}/>
    </Form.Item>
}
