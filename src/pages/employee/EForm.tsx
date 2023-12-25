import {app__ui, appFetch, app__hooks} from "#app/components/_app";
import {message} from "antd";

type EType = {
    first_name?: string,
    last_name?: string,
    function?: string,
    email?: string,
    phone?: string,
    note?: string,
    parent_id?: number,
}

function EForm({
                   initialValues,
                   actionName,
                   id
               }: { initialValues?: EType & { parent?: EType }, actionName: 'create' | 'update', id?: number }) {

    const {Form, InputText, Button, Col, Row, Select} = app__ui
    const [loading, setLoading] = app__hooks.useState<boolean>(false);
    const [loadingSelect, setLoadingSelect] = app__hooks.useState<boolean>(false);
    const [parentId, setParentId] = app__hooks.useState<any>(initialValues?.parent_id)
    const [parentOptions, setParentOptions] = app__hooks.useState<any>(initialValues?.parent_id ? [{
        value: initialValues?.parent_id,
        label: initialValues?.parent?.email,
    }] : []);

    const save = (data: EType) => {
        setLoading(true)
        appFetch(id ? 'update' : 'create', {...data, ...{id: id, parent_id: parentId}}).then((res) => {
            message.info(res.response.status)
            setLoading(false)
        })
    }

    const onParentChange = (value: number | undefined) => setParentId(value === undefined ? null : value)

    const onParentSearch = (value: string) => {
        setLoadingSelect(true)
        appFetch('search', {value: value}).then((r) => {
            setLoadingSelect(false)
            setParentOptions(r?.response?.data?.map((e: any) => {
                return {
                    value: e.id,
                    label: e.email,
                }
            }))
        })
    };

    const filterParentOption = (input: string, option?: any | { label: string; value: string }): boolean =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    let rules: any = [{required: true}]

    return <Form onFinish={save} initialValues={initialValues}>
        <h1>
            {actionName === 'update' ? 'Обновление' : 'Добавление'} записи
        </h1>

        <Row>
            <Col span={24}>
                <Select itemProps={{name: 'parent_id', label: 'Начальник'}} selectProps={{
                    loading: loadingSelect,
                    placeholder: "Введите почту начальника",
                    optionFilterProp: "children",
                    onChange: onParentChange,
                    onSearch: onParentSearch,
                    filterOption: filterParentOption,
                    options: parentOptions
                }}/>
            </Col>
        </Row>

        <Row gutter={[50, 10]}>
            <Col span={12}>
                <InputText itemProps={{name: 'first_name', label: 'Имя', rules: rules}}/>
                <InputText itemProps={{name: 'last_name', label: 'Фамилия', rules: rules}}/>
                <InputText itemProps={{name: 'function', label: 'Должность', rules: rules}}/>
            </Col>

            <Col span={12}>
                <InputText itemProps={{name: 'email', label: 'Почта', rules: rules.concat([{type: 'email'}])}}/>
                <InputText itemProps={{name: 'phone', label: 'Домашний телефон', rules: rules}}/>
                <InputText itemProps={{name: 'note', label: 'Заметки', rules: rules}}/>
            </Col>
        </Row>
        <br/>
        <Row gutter={100}>
            <Col span={12}>
                <Button loading={loading} htmlType={'submit'}>
                    Ок
                </Button>
                &nbsp;
                <Button htmlType={'reset'}>
                    Сброс
                </Button>
            </Col>
        </Row>
    </Form>
}

export default EForm;
