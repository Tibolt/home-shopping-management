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
            <p on:click={() => {handleAddAmount()}}>{name}</p>
        {:else}
            <Bubble><button style="color: greenyellow;" on:click={() => {handleAdd()}}>+</button></Bubble>
            <p on:click={() => {handleAdd()}}>{name}</p>
        {/if}
        {#if amount != 0}
            <p>{amount}</p>
        {/if}
    </div>
    {#if clicked && amount > 1}
        <button class="deleteBtn" on:click={() => {handleSubAmount()}}>-</button>
    {/if}
    {#if clicked && amount == 1}
        <button class="deleteBtn" on:click={() => {handleSubAmount()}}>x</button>
    {/if}
</div>

<style>
    .inline-sugestion {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid var(--btn-bg);

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
        padding: 0 3px;
    }

    .deleteBtn {
        color: red;
        margin-right: 20px;
        padding: 10px;
        font-size: 16px;
    }
</style>