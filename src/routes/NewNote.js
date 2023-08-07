import {Form, redirect, useFetcher} from "react-router-dom";
import { createNote } from "../notes";
import {FormField, TextArea, TextInput} from "grommet";
import {useState} from "react";

////////////////////////////////////////////////////////////////////////////////
export default function NewNote() {
    const fetcher = useFetcher()
    const [value, setValue] = useState({name: "", text: ""})
    function onChange(event) {
        setValue({...value, [event.target.name]: event.target.value})
    }

    return (
        <fetcher.Form method={"post"} >
                <FormField name="name" label="Name" htmlFor="name-input-id" validateOn={"submit"} validate={(value) => console.log(value)}>
                    <TextInput
                        id="name-input-id"
                        placeholder="Name..."
                        value={value.name}
                        onChange={onChange}
                        name={'name'}
                    />
                </FormField>

            <FormField name="text" htmlFor="text-input-id" label="Text" validateOn={"submit"} validate={(value) => console.log(value)}>
                <TextArea
                    id={"text-input-id"}
                    placeholder="Description..."
                    value={value.text}
                    onChange={onChange}
                    name={"text"}
                />
            </FormField>
            <p>
                <button type="submit">Save</button>
            </p>
        </fetcher.Form>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const note = await createNote({
        title: formData.get("name"),
        content: formData.get("text"),
    });
    return redirect(`/note/${note.id}`);
}