<script lang="ts">
    import Card from "./Card.svelte";
    import DeleteIcon from "~icons/octicon/trash-16"
    import EditIcon from "~icons/fe/edit"
    import ShareIcon from "~icons/mdi/share"
    import { _ } from 'svelte-i18n'
    import Bubble from "./Bubble.svelte";
    import CloseIcon from "~icons/ep/back"

    export let itemId: number
    export let resuplyNumber: number

</script>

<div>
    <Card>
        <Bubble><button on:click><CloseIcon/></button></Bubble>
        <div class="flex-row">
            <h1>{$_('editRestock')}</h1>
        </div>
        <div class="flex-column">

            <form method="POST" action="?/editRestock" class="left-side">
                <p>{$_('minNumber')}</p>
                <input type="hidden" hidden value={itemId} name="itemId">
                <input type="number" value={resuplyNumber} name="resuplyNumber" placeholder={resuplyNumber}>
                <button type="submit"><EditIcon/></button>
            </form>
        </div>
    </Card>
</div>


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




