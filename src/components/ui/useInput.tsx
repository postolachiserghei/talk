import {
    Input,
    InputProps,
    Form,
    FormItemProps,
} from "antd";

export default function useInput({inputProps, itemProps}: { inputProps?: InputProps, itemProps?: FormItemProps }): any {

    return <label>
        <Form.Item {...itemProps}>
            <Input onChange={(e) => {
                console.log(e.target.value)
            }} {...inputProps} placeholder={String(itemProps?.label) + ' ...'} allowClear={true}/>
        </Form.Item>
    </label>
}
