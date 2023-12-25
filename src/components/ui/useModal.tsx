import {
    Modal,
    ModalProps,
} from "antd";
import React, {useState} from "react";

export default function useModal(props: ModalProps & { children?: React.ReactNode }): any {

    const [open, setOpen] = useState(props.open);

    return <Modal footer={''} closable={false} {...props} open={open}>
        {props.children}
    </Modal>
}
