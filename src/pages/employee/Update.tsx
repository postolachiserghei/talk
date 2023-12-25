import EForm from "#app/pages/employee/EForm";

function Update({id}: { id: number }) {
    return <EForm actionName={'update'} id={id} />
}

export default Update;
