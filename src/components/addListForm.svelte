<script lang="ts">
	import Card from "./Card.svelte";
    import { createEventDispatcher } from "svelte";
    import AddIcon from "~icons/gg/add"
    import { _ } from 'svelte-i18n'
    import Bubble from "./Bubble.svelte";
    import CloseIcon from "~icons/ep/back"


    export let action = "deafult"

    let dispatch = createEventDispatcher();

    let name: String;
    let amount: Int16Array;
    const handleSumbit = () => {
        const item = {
            name,
            amount,
            id: Math.random()
        }
        dispatch("addItem", item);
    }
</script>

<form method="POST" action={action}>
    <Card>
        <Bubble><button on:click><CloseIcon/></button></Bubble>
        <div class="center">
            <slot></slot>
        </div>
        <div class="grid">
            <!-- <h2 >{$_('add')}</h2> -->
            <button type="submit" class="add-btn">{$_('submit')}</button>
        </div>
    </Card>
</form>


<style>
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100%;
        margin-top: -50px;
    }

    .grid {
        display: grid;
        place-items: center;
        margin-bottom: 5%;
        grid-template-rows: 2fr; 
        grid-template-columns: 1fr; 
    }

    .center {
        display: grid;
        place-items: center;
        margin: 10% auto;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr;
        
    }

    button {
        all: unset;
    }

    .add-btn {
        all: unset;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        border: 1px solid;
        border-radius: 5px;
        border-style: outset;
        height: 30px;
        padding: 0 10px;
        background-color: buttonface;
        color: buttontext;
    }
</style>