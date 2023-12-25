import {app__ui, app__hooks, appFetch} from "#app/components/_app";
import {Table, message, Card} from "antd";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import EForm from "#app/pages/employee/EForm";

let fields = {
    id: {label: 'ID'},
    first_name: {label: 'Имя'},
    last_name: {label: 'Фамилия'},
    function: {label: 'Должность'},
    email: {label: 'Почта'},
    phone: {label: 'Телефон'},
    note: {label: 'Заметка'},
    parent_id: {label: 'Начальник'},
    action: {label: 'Действия'},
}

const columns: { title: string, dataIndex: string, key: string }[] = Object.keys(fields).map((key) => {
    return {title: Object(fields)[key].label, key: key, dataIndex: key}
})

function List() {

    const {Drawer, Button} = app__ui

    const [data, setData] = app__hooks.useState<any[]>([]);
    const [total, setTotal] = app__hooks.useState<number>(0);
    const [page, setPage] = app__hooks.useState<number>(1);
    const [pageSize, setPageSize] = app__hooks.useState<number>(10);
    const [updateData, setUpdateData] = app__hooks.useState<any>();

    const getData = () => appFetch('list', {page: (page)}, 'POST').then((res) => {
        setTotal(res.response.total)
        setPage((res.response.data.length === 0 && page >= 1) ? (page - 1) : res.response.page)
        setPageSize(res.response.pageSize)
        setData(res.response.data.map((rec: any) => {
            return {
                ...{key: rec.id}, ...rec, ...{
                    parent_id: <>
                        {rec.parent ?
                            <Card>
                                <div>
                                    <b>ФИО :</b> {rec.parent.first_name} &nbsp; {rec.parent.last_name}
                                </div>
                                <div>
                                    <b>EMAIL :</b> {rec.parent.email}
                                </div>
                                <b>PHONE :</b> {rec.parent.phone}
                            </Card>
                            : <i className={'text-center'}>-</i>}
                    </>,
                    action: <>
                        <Button icon={<EditFilled/>} onClick={() => setUpdateData(rec)}/> &nbsp;
                        <Button danger icon={<DeleteFilled/>} onClick={() => {
                            appFetch('delete', {id: rec.id}).then((r) => {
                                message.info(r.response.status)
                                getData()
                            })
                        }}/>
                    </>
                }
            }
        }))
    })

    app__hooks.useEffect(() => {
        getData()
    }, [page, updateData?.id])

    return <>
        <Drawer width={'100%'} open={updateData?.id > 0} onClose={() => setUpdateData(undefined)}
                footer={<div style={{textAlign: 'right'}}>
                    <Button danger onClick={() => setUpdateData(undefined)}>
                        Готово
                    </Button>
                </div>}
        >
            <EForm key={updateData?.id} initialValues={updateData} actionName={'update'} id={updateData?.id}/>
        </Drawer>
        <div>
            Всего записей : {total}
        </div>
        <Table
            pagination={{
                total: total,
                pageSize: pageSize,
                current: page,
                onChange: (pg) => setPage(pg),
                showSizeChanger: false
            }}
            dataSource={data} columns={columns}/>
    </>
}

export default List;
