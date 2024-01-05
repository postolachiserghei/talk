import useInput from "#app/components/ui/useInput";
import useForm,{FormUse} from "#app/components/ui/useForm";
import useRow from "#app/components/ui/useRow";
import useCol from "#app/components/ui/useCol";
import useButton from "#app/components/ui/useButton";
import useDrawer from "#app/components/ui/useDrawer";
import useModal from "#app/components/ui/useModal";
import useSelect from "#app/components/ui/useSelect";
import HooksReact from "#app/components/hooks/HooksReact";
import appFetch from "#app/components/helpers/appFetch";

export const app__ui = {
    Row: useRow,
    Col: useCol,
    InputText: useInput,
    Form: useForm,
    FormUse: FormUse,
    Button: useButton,
    Drawer: useDrawer,
    Modal: useModal,
    Select: useSelect,
}
export {appFetch}
export const app__hooks = HooksReact



