<script lang="ts">
	import Card from "./Card.svelte";
    import { createEventDispatcher } from "svelte";
    import AddIcon from "~icons/gg/add"
    import { _ } from 'svelte-i18n'

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
        <div class="center">
            <slot></slot>
        </div>
        <div class="grid">
            <h2 >{$_('add')}</h2>
            <button class="float"><AddIcon/></button>
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
        margin: 10% auto;
        grid-template-rows: 2fr; 
        grid-template-columns: 1fr 1fr; 
    }

    .center {
        display: grid;
        place-items: center;
        margin: 10% auto;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr;
        
    }

    .float {
        float: left;
    }

    label, input {
        display:block;
    }

    input {
        height: 25px;
        border-radius: 10px;
    }

    input::placeholder {
        padding-left: 2px;
    }

    button {
        all: unset;
        border-radius: 5 px;
        height: 25px;
        padding: 0 10px;
    }

    .btn {
        display: inline-block;
        text-align: center;
        line-height: normal;
        border: 1px solid;
        border-radius: 5px;
        border-style: outset;
        height: 25px;
        padding: 0 10px;
        background-color: buttonface;
        color: buttontext;
        padding-top: 4px;
    }

</style>