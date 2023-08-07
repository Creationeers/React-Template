import { useLoaderData, Form, redirect } from "react-router-dom";
import { deleteNote, getNote } from "../notes";
import {Button, Card, CardBody, CardFooter, CardHeader} from "grommet";
import {Trash, ShareOption, } from "grommet-icons"

export default function Note() {
    const note = useLoaderData();
    return (
        <Card  height="small" width="small" background="light-1">
            <CardHeader pad="medium">{note.title}</CardHeader>
            <CardBody pad="medium">{note.content}</CardBody>
            <CardFooter pad={{horizontal: "small"}} background="light-2">
                <Form method="post">
                <Button
                    type="submit"
                    icon={<Trash color="red" />}
                    hoverIndicator
                />
                </Form>
            </CardFooter>
        </Card>

    );
}

export async function loader({ params }) {
    const note = await getNote(params.noteId);
    if (!note) throw new Response("", { status: 404 });
    return note;
}

export async function action({ params }) {
    await deleteNote(params.noteId);
    return redirect("/new");
}