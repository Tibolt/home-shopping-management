<script lang="ts">
    import Bubble from "./Bubble.svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher()

    export let name: String
    export let amount = 0

    export let clicked = false

    const handleAdd = () => {
        clicked = true
        amount = 1
        dispatch("addItem", { name, amount })
    }

    const handleAddAmount = () => {
        amount++ 
        dispatch("increaseItem", { name, amount })
    }

    const handleSubAmount = () => {
        if(amount === 1) {
            clicked = false
            amount = 0
            dispatch("deleteItem", { name, amount })
        }
        else {
            amount--
            dispatch("subItem", { name, amount })
        }
    }
</script>

<div class="inline-sugestion">
    <div class="left-side" on:click>
        {#if clicked}
            <Bubble><button style="background-color: blue;" on:click={() => {handleAddAmount()}}>+</button></Bubble>
        {:else}
            <Bubble><button style="color: greenyellow;" on:click={() => {handleAdd()}}>+</button></Bubble>
        {/if}
        <p>{name}</p>
        {#if amount != 0}
            <p>{amount}</p>
        {/if}
    </div>
    {#if clicked}
    <Bubble><button style="color: red;" on:click={() => {handleSubAmount()}}>-</button></Bubble>
    {/if}
</div>

<style>
    .inline-sugestion {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;

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
        all: unset
    }
</style>