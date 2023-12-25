import {
    Button,
    ButtonProps,
} from "antd";

import {Link} from "react-router-dom";

export default function useButton(props: ButtonProps): any {

    let defaultProps: any = {}

    if (!props.id) {
        defaultProps['id'] = `btn_id_${props?.children?.toString().length}`
    }

    if (!props.name && typeof props.children === 'string') {
        defaultProps['name'] = props.children
        defaultProps['title'] = props.children
    }

    if (props.href) {
        return <Link to={props.href}>
            <Button {...defaultProps} title={'button'} tabIndex={0}  {...props}
                    href={undefined}
                    type={(props.type !== undefined ? props.type : 'link')}
            />
        </Link>
    }

    return <Button {...defaultProps} tabIndex={0} {...props} />
}
