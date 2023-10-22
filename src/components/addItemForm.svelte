<script lang="ts">
    import Sugestion from "./Sugestion.svelte";
    import Bubble from "./Bubble.svelte";

    let inputHistory = ["chleb", "mleko", "ser", "piwo", "pietruszka"]
    let suggestions = inputHistory
    let tempItems: { name: String, amount: Number }[] = [];

    let inputValue = ""
    
    const handleInput = (event) => {
        inputValue = event.target.value;
        suggestions = getSuggestions(inputValue);
    }

    function getSuggestions(input: String) {
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
        const name: String = e.detail.name
        const amount: Number = e.detail.amount
        if(amount === 0) {
            tempItems = tempItems.filter((item) => item.name != name)
            return tempItems
        }
        if(tempItems.some(item => item.name === name)) {
            let idx = tempItems.findIndex(item => item.name === name)
            tempItems[idx].amount = amount
            console.log(tempItems)
            return tempItems
        }
        const newItem = name && !tempItems.includes(name) ? {name, amount} : [];
        tempItems = [...tempItems, newItem]
        return tempItems
    }
    
</script>

<div class="addItem">
    <h1 >Add New Item </h1>
    <input type="text" name="name" id="name" placeholder="type name of item" bind:value={inputValue} on:input={handleInput}/>
    <div class="suggestions">
        {#each suggestions as suggestion (suggestion)}
            <Sugestion name={suggestion} on:click={() => handleSuggestionClick(suggestion)} on:addItem={trackItems} on:deleteItem={trackItems} on:increaseItem={trackItems} on:subItem={trackItems}/>
        {/each}
    </div>
    <form method="POST" action="?/create">
        <Bubble><button on:click>+</button></Bubble>
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
        width: 100%;
        padding-top: 50px;
    }
    .suggestions {
        display: flex;
        flex-direction: column;
    }
    button {
        all: unset
    }
</style>