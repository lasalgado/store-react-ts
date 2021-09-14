import { useEffect, useState, SyntheticEvent } from "react";

type ValidatorFn = {
    (value: string): { valid: boolean, msg: string | null }
}

type Shape = {
    id: string,
    value: string,
    error: string | null,
    required: boolean,
    validator: ValidatorFn | null
}

export type FormProps = {
    [key: string]: Shape
};

type InitialForm = {
    [key: string]: string
}

export const useForm = (formInitial: FormProps, initData: InitialForm | undefined | null = null) => {
    const [form, setForm] = useState<FormProps>(formInitial);
    const [isValidForm, setIsValidForm] = useState(false);

    const setInitialData = () => {
        if (initData !== null && typeof initData !== 'undefined') {
            let intiForm = { ...formInitial };

            for (var [key, value] of Object.entries(initData)) {
                intiForm[key].value = value;
            }

            setForm(intiForm);
            validForm(intiForm);
        }
    };

    useEffect(() => {
        setInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputValue = (event: SyntheticEvent) => {
        const { name, value } = event.target as HTMLInputElement;
        let { msg: error } = form[name].validator ? form[name].validator!(value) : { msg: null };

        const setNewForm = (newForm: FormProps) => {
            setForm(newForm);
            validForm(newForm);
        }

        setNewForm({
            ...form,
            [name]: {
                ...form[name],
                error,
                value
            }
        });
    };

    const validForm = (newForm: FormProps) => {
        let ret = true;

        if (newForm) {
            for (var [, value] of Object.entries(newForm)) {
                ret = value.error === null;

                ret = value.required ? ret && value.value !== "" : ret;

                if (!ret)
                    break;
            }
        } else {
            ret = false;
        }

        setIsValidForm(ret);
    }

    const getFormData = () => {
        let ret: InitialForm = {};

        for (var [key, value] of Object.entries(form)) {
            ret[key] = value.value;
        }

        return ret;
    };

    return {
        form,
        handleInputValue,
        isValidForm,
        getFormData
    };
};