<script lang="ts">
    import Sugestion from "./Sugestion.svelte";
    import Bubble from "./Bubble.svelte";
	import { goto } from "$app/navigation";
    import CloseIcon from "~icons/ep/back"
    import AddIcon from "~icons/gg/add"
    import { _ } from 'svelte-i18n'
    import { locale } from 'svelte-i18n'

    console.log($locale)

    let inputHistory = []

    if($locale === "pl") {
        inputHistory = ["wędliny","jabłka","pomarancze","czekolada","mąka","drożdże","pieczywo","makaron","papier toaletowy","koncentrat pomidorowy","ketchup","ryż","ziemniaki","cebula","czosnek","mięso", "mleko", "piwo", "pietruszka","szczypiorek", "pomidory", "sałata", "arbuz","melon", "ser biały", "ser zółty", "papryka", "pieczarki", "sok", "woda"]
    }
    else {
        inputHistory = ["sausages","apples","oranges","chocolate","flour","yeast","bread","pasta","toilet paper","tomato concentrate","ketchup","rice","potatoes","onion","garlic","meat", "milk", "beer", "parsley","chives", "tomatoes", "lettuce", "watermelon","melon", "white cheese", "yellow cheese", "pepper", "mushrooms", "juice", "water"]
    }


    let suggestions = inputHistory
    let tempItems: { name: string, amount: number }[] = [];
    let names: string
    let amounts: number

    export let listId = 0
    export let isStorage = false

    let inputValue = ""
    
    const handleInput = (event) => {
        inputValue = event.target.value;
        suggestions = getSuggestions(inputValue);
    }

    function getSuggestions(input: string) {
        const typedTextSuggestion = input && !inputHistory.includes(input) ? [input] : [];
        const filteredSuggestions = inputHistory.filter((item) => item.includes(input));

        // Remove duplicates from suggestions
        const uniqueSuggestions = [...new Set(filteredSuggestions)];

        return [...typedTextSuggestion, ...uniqueSuggestions];
    }

    function handleSuggestionClick(suggestion) {
        inputHistory.unshift(suggestion);
    }
    
    function trackItems(e) {
        const name: string = e.detail.name
        const amount: number = e.detail.amount
        if(amount === 0) {
            tempItems = tempItems.filter((item) => item.name != name)
            return tempItems
        }
        if(tempItems.some(item => item.name === name)) {
            let idx = tempItems.findIndex(item => item.name === name)
            tempItems[idx].amount = amount
            return tempItems
        }
        const newItem = name && !tempItems.includes(name) ? {name, amount} : [];
        tempItems = [...tempItems, newItem]
        return tempItems
    }

    let submit

    function reloadPage() {
        const thisPage = window.location.pathname;


        goto('/').then(
            () => goto(thisPage)
        );
    }

    async function handleSubmit() {
        // Send a POST request to endpoint
        if(isStorage){
            submit = await fetch(`/api/create/${listId}`, {
            method: 'POST',
            body: JSON.stringify(tempItems),
            headers: { 'content-type': 'application/json', "Authorization": "333", "isStorage": "true"},
            })
            .then((resp) => resp.json())
            reloadPage()
        }
        else {
            submit = await fetch(`/api/create/${listId}`, {
            method: 'POST',
            body: JSON.stringify(tempItems),
            headers: { 'content-type': 'application/json', "Authorization": "333" },
            })
            .then((resp) => resp.json())
            reloadPage()
        }

    }
    
</script>

<div class="addItem">
    <Bubble><button on:click><CloseIcon/></button></Bubble>
    <h1 >{$_('addNewItem')} </h1>
    <input type="text" name="name" id="name" placeholder={$_('typeItemName')} bind:value={inputValue} on:input={handleInput}/>
    <div class="suggestions">
        {#each suggestions as suggestion (suggestion)}
            <Sugestion name={suggestion} on:click={() => handleSuggestionClick(suggestion)} on:addItem={trackItems} on:deleteItem={trackItems} on:increaseItem={trackItems} on:subItem={trackItems}/>
        {/each}
    </div>
    <!-- <form method="POST" on:submit|preventDefault={handleSubmit}> -->
    <form method="POST" action="?/create" on:submit|preventDefault>
        <input type="hidden" hidden value={tempItems} name="tempItems">
        <!-- <Bubble><button type="submit">add</button></Bubble> -->
        <!-- <button type="submit" on:click={handleSubmit} class="add-btn"><AddIcon/></button> -->
        <button type="submit" class="add-btn" on:click={handleSubmit}>{$_('submit')}</button>
    </form>
</div>

<style>
    .addItem {
        width: 100%;
    }
    
    .addItem input, p{
        width: 100%;
    }
    form {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 20px 0
    }
    .suggestions {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        height: 300px;
        /* display: grid;
        grid-template-columns: 1fr; */
        overflow: auto;
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