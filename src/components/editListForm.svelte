<script lang="ts">
    import Card from "./Card.svelte";
    import DeleteIcon from "~icons/octicon/trash-16"
    import EditIcon from "~icons/fe/edit"

    export let listId: number
    export let name: string

    let isEditable = false

    const handleEditName = () => {
        isEditable = !isEditable
        console.log(name)
    }
</script>


<style>
    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        padding: 20px 20px 0 20px;
        border-bottom: 2px solid var(--btn-bg);
    }
    .flex-column {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        width: 90%;
        gap: 10px;
        padding: 20px;
    }
    .left-side {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
        gap: 20px;
    }
    button {
        all: unset;
    }
</style>

<div>
    <Card>
        <div class="flex-row">
            <h1>Edit list</h1>
            <button>X</button>
        </div>
        <div class="flex-column">

            <form method="POST" action="?/edit" class="left-side">
                <p>Name</p>
                <input type="hidden" hidden value={listId} name="listId">
                <input type="text" hidden value={name} name="name" placeholder={name}>
                <button type="submit"><EditIcon/> Edit</button>
            </form>

            <div class="left-side">
                <p>Share</p>
            </div>
            <form method="POST" action="?/delete" class="left-side">
                <p>Delete</p>
                <input type="hidden" hidden value={listId} name="listId">
                <button type="submit" style="color: var(--red);"><DeleteIcon/></button>
            </form>

        </div>
    </Card>
</div>




