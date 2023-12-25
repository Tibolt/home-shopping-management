<script lang="ts">
	import Page from '../routes/+page.svelte';
    import Card from './Card.svelte'
    import { createEventDispatcher, tick } from 'svelte';
    import DeleteIcon from "~icons/octicon/trash-16"
    import CheckIcon from "~icons/mdi/circle-outline"
    // import CheckedIcon from "~icons/mdi/circle"
    import CheckedIcon from "~icons/icons8/checked"
    import { applyAction, enhance } from '$app/forms';
    import { _, locale } from 'svelte-i18n'

    let dispatch = createEventDispatcher()
    export let name = ""
    export let amount = 0
    export let unit = ""
    export let prize = 0.0
    export let itemId: number
    export let ticked: boolean

    const handleEdit = () => {
        console.log("clicked edit")
        dispatch("editItem")
    }
    const handleDelete = () => {
        console.log("clicked delete")
        dispatch("deleteItem")
    }
    const handleTicked= () => {
        ticked = !ticked
    }
    function handleEnhanceTicked({ formElement, formData, action, cancel }) {
        return async ({ result, update }) => {
            if(result.type === "success") {
                handleTicked()
            }
            update();
            applyAction(result, formElement, formData);
        }
    }
    function handleEnhanceDelete({ formElement, formData, action, cancel }) {
        return async ({ result, update }) => {
            if(result.type === "success") {
                handleDelete()
            }

            update();
            applyAction(result, formElement, formData);
        }
    }
</script>


<div class="border" on:click|stopPropagation={handleEdit}>
    <Card width={"100%"} ticked={ticked}>
        <div class="flex" >
            <div class="flex">
                <form method="POST" action="?/ticked" 	use:enhance={handleEnhanceTicked}>
                    <input type="hidden" hidden value={itemId} name="id">
                    <input type="hidden" hidden value={ticked} name="ticked">
                    <div class="check-icon">
                        {#if ticked}
                            <button type="submit" style="padding: 5px;" on:click|stopPropagation class="mark"><CheckedIcon/></button>
                        {:else}
                            <button type="submit" style="padding: 5px;" on:click|stopPropagation class="mark"><CheckIcon/></button>
                        {/if}
                    </div>
                </form>
                <h3>{name}</h3>
            </div>
            <form method="POST" action="?/delete" use:enhance={handleEnhanceDelete}>
                <input type="hidden" hidden value={itemId} name="id">
                <button type="submit" on:click|stopPropagation><DeleteIcon/></button>
            </form>
        </div>
        <div class="description">
            <p>{$_('amount')}: {amount} {unit}</p>
            {#if prize != 0.0}
                <p>{prize} {$_('currency')}</p>
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