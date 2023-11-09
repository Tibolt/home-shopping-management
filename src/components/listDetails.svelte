<script lang="ts">
    import Card from './Card.svelte'
    import { createEventDispatcher } from 'svelte';
    import EditIcon from "~icons/nimbus/edit"

    let dispatch = createEventDispatcher()

    export let name = "";
    export let listName = "items"
    export let itemCount = 0
    export let tickedCount = 0

    const handleEdit = () => {
        dispatch("editList")
    }

    const handleClick = () => {
        dispatch("route")
    }
</script>


<div class="border" on:click={handleClick}>
    <Card width={"100%"}>
        <div class="flex">
            <h3>{name}</h3>
            <button on:click|stopPropagation={handleEdit}><EditIcon/></button>
        </div>
        <p>{tickedCount}/{itemCount}</p>
    </Card>
</div>

<style>
    
    .border {
        width: 100%;
        height: 100%;
    }
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    button {
        all: unset;
        border: 1em;
        background-color: var(--btn-text);
        padding: 5px;
        border-radius: 60px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
    
</style> 