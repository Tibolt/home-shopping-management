<script lang="ts">
    import Card from "./Card.svelte";
    import DeleteIcon from "~icons/octicon/trash-16"
    import EditIcon from "~icons/fe/edit"
    import ShareIcon from "~icons/mdi/share"
    import { _ } from 'svelte-i18n'
    import Bubble from "./Bubble.svelte";
    import CloseIcon from "~icons/ep/back"

    export let listId: number
    export let name: string
    export let isMain: boolean
    export let email: string = ""

    let isEditable = false

    const handleEditName = () => {
        isEditable = !isEditable
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
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        align-items: center;
        justify-items: start;
        gap: 20px;
    }

    .left-side-delete {
        display: grid;
        grid-template-columns: 7fr 1fr;
        align-items: center;
        justify-items: start;
        width: 100%;
    }

    button {
        all: unset;
    }
</style>

<div>
    <Card>
        <Bubble><button on:click><CloseIcon/></button></Bubble>
        <div class="flex-row">
            <h1>{$_('editList')}</h1>
        </div>
        <div class="flex-column">

            <form method="POST" action="?/edit" class="left-side">
                <p>{$_('name')}</p>
                <input type="hidden" hidden value={listId} name="listId">
                <input type="text" hidden value={name} name="name" placeholder={name} required>
                <Bubble><button type="submit"><EditIcon/></button></Bubble>
            </form>

            <form method="POST" action="?/share" class="left-side">
                <p>{$_('share')}</p>
                <input type="hidden" hidden value={listId} name="listId">
                <input type="hidden" hidden value={isMain} name="isMain">
                <input type="text" hidden value={email} name="email" placeholder="test@example.com" required>
                <Bubble><button type="submit"><ShareIcon/></button></Bubble>
            </form>
            {#if isMain}
            {:else}
                <form method="POST" action="?/delete" class="left-side-delete">
                    <p>Delete</p>
                    <input type="hidden" hidden value={listId} name="listId">
                    <input type="hidden" hidden value={isMain} name="isMain">
                    <Bubble><button type="submit" style="color: var(--red);"><DeleteIcon/></button></Bubble>
                </form>
            {/if}

        </div>
    </Card>
</div>




