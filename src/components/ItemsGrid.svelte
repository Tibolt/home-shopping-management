<script lang="ts">
    import { enhance, applyAction } from "$app/forms";
	import { redirect } from "@sveltejs/kit";
    import ItemDetails from "./ItemDetails.svelte";
    import AddModal from "./addModal.svelte";
    import EditItemForm from "./editItemForm.svelte";

    export let items = []
    export let listName: string = "lista"
    
    let itemId: number
    let itemName: string
    let amountI: number
    let prizeI: number
    let unitI: string

    let showEditForm = false

    const deleteHandle = (id: number) => {
        items = items.filter((it) => it.id != id);
    }

    const toggleEditForm = () => {
        showEditForm = !showEditForm;
    }

    const editItem = (id: number, name: string, amount: number, unit: string, prize: number) => {
        itemId = id
        itemName = name
        amountI = amount
        unitI = unit
        prizeI = prize
        toggleEditForm()
    }
</script>

<AddModal showAddModal={showEditForm} on:click={toggleEditForm}>
    <EditItemForm id={itemId} name={itemName} amount={amountI} unit={unitI} prize={prizeI} on:click={toggleEditForm}/>
</AddModal>
<div class="grid">
    <h1>{listName}</h1>
    {#each items as item}
        {#if item.show_in_list}
            <div class="item">
                <ItemDetails name={item.name} amount={item.amount} itemId={item.id} prize={item.prize} unit={item.unit} ticked={item.ticked} on:deleteItem={() => deleteHandle(item.id)} on:editItem={() => editItem(item.id, item.name, item.amount, item.unit, item.prize)}/>
            </div>
        {/if}
    {/each}
</div> 

<style>
    .grid {
        display: flex;
        /* grid-template-columns: 1fr; */
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: stretch;
        width: 70%;
        height: 85%;
        /* padding-bottom: 10em; */
        overflow-y: auto;
        overflow-x: hidden;
        padding-top: 5em;
    }
    ::-webkit-scrollbar {

    }
    .item {
        padding-bottom: 1em;
        padding-right: 2em;
    }
    h1 {
        align-self: center;
    }

    @media screen and (max-width: 600px) {

        .grid {
           width: 90%;
        }
    }
</style>
