<script>
	import Page from '../routes/+page.svelte';
    import Card from './Card.svelte'
    import { createEventDispatcher } from 'svelte';
    import DeleteIcon from "~icons/octicon/trash-16"
    import CheckIcon from "~icons/mdi/circle-outline"

    let dispatch = createEventDispatcher()
    export let name = ""
    export let amount = 0
    export let unit = ""
    export let prize = 0.0
    export let itemId
    export let marked = false

    const handleEdit = () => {
        console.log("clicked edit")
        dispatch("editItem")
    }
    const handleDelete = () => {
        console.log("clicked delete")
        dispatch("deleteItem")
    }
    const handleMarked = () => {
        marked = !marked
    }
</script>


<div class="border" on:click|stopPropagation={handleEdit}>
    <Card width={"100%"} marked={marked}>
        <div class="flex" >
            <div class="flex">
                <form method="POST" action="?/marked">
                    <input type="hidden" hidden value={itemId} name="id">
                    <div class="check-icon">
                        <button on:click|stopPropagation={handleMarked} class="mark"><CheckIcon/></button>
                    </div>
                </form>
                <h3>{name}</h3>
            </div>
            <form method="POST" action="?/delete">
                <input type="hidden" hidden value={itemId} name="id">
                <button on:click|stopPropagation={handleDelete}><DeleteIcon/></button>
            </form>
        </div>
        <div class="description">
            <p>Amount: {amount} {unit}</p>
            {#if prize != 0.0}
                <p>{prize} $</p>
            {/if}
        </div>
    </Card>
</div>

<style>
    .border {
        width: 100%;
        height: 100%;
        color: rgba(0,0,0,0.8);
        z-index: 100;

    }
    button {
        color: var(--red);
        font-size: 20px;
        border-radius: 5px;
        border-width: 0px;
        background-color: unset;
    }
    .mark {
        color: var(--blue);
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .description {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 30%;
        padding-left: 40px;
    }
    .check-icon {
        position: relative;
        top: 10px;
        padding-right: 10px;
    }
</style>