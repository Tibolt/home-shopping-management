<script>
    import { enhance, applyAction } from "$app/forms";
	import { redirect } from "@sveltejs/kit";
    import ItemDetails from "./ItemDetails.svelte";

    export let items = []

    const deleteHandle = () => {
        
    }
</script>

<div class="grid">
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
            <ItemDetails name={item.name} amount={item.amount}/>
        </form>
    </div>
    {/each}
</div> 

<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        column-gap: 20%;
        row-gap: 10%;
        padding-top: 2em;
        justify-content: center;
        width: 50%;
    }
</style>
