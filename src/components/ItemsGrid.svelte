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
        console.log("delete")
    }

    const toggleEditForm = () => {
        showEditForm = !showEditForm;
    }

    const editItem = (id: number, name: string, amount: number, unit: string, prize: number) => {
        console.log(id)
        itemId = id
        itemName = name
        amountI = amount
        unitI = unit
        prizeI = prize
        toggleEditForm()
    }
</script>

<AddModal showAddModal={showEditForm} on:click={toggleEditForm}>
    <EditItemForm id={itemId} name={itemName} amount={amountI} unit={unitI} prize={prizeI}/>
</AddModal>
<div class="grid">
    <h2>{listName}</h2>
    {#each items as item}
    <div class="item">
        <form method="POST" action="?/delete" use:enhance={({ formElement, formData, action, cancel, submitter }) => {
            // `formElement` is this `<form>` element
            // `formData` is its `FormData` object that's about to be submitted
            // `action` is the URL to which the form is posted
            // calling `cancel()` will prevent the submission
            // `submitter` is the `HTMLElement` that caused the form to be submitted
    
            return async ({ result, update }) => {
                // `result` is an `ActionResult` object
                // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
                if(result.type === "success") {
                    items = items.filter((it) => it.id != item.id);
                }
                update();
            };
        }}>
            <input type="hidden" hidden value={item.id} name="id">
        </form>
        <ItemDetails name={item.name} amount={item.amount} itemId={item.id} prize={item.prize} unit={item.unit} marked={false} on:deleteItem={() => deleteHandle(item.id)} on:editItem={() => editItem(item.id, item.name, item.amount, item.unit, item.prize)}/>
    </div>
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
    h2 {
        align-self: center;
    }

    @media screen and (max-width: 600px) {

        .grid {
           width: 90%;
        }
    }
</style>
