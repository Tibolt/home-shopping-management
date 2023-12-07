<script>
    let inputHistory = [];
    let inputValue = "";
    let suggestions = [];
  
    function handleInput(event) {
      inputValue = event.target.value;
      suggestions = getSuggestions(inputValue);
      console.log(inputHistory)
    }
  
    function getSuggestions(input) {
      return inputHistory.filter((item) => item.includes(input));
    }
  
    function handleSuggestionClick(suggestion) {
      inputValue = suggestion;
      inputHistory.unshift(suggestion);
  
      if (inputHistory.length > 10) {
        inputHistory.pop();
      }
      console.log(inputHistory)
    }
</script>

<div class="grid">
        <input
        type="text"
        bind:value={inputValue}
        placeholder="Type here..."
        on:input={handleInput}
        />
        
        <div class="suggestion-container">
        {#each suggestions as suggestion (suggestion)}
            <div
            class="suggestion"
            on:click={() => handleSuggestionClick(suggestion)}
            >
            {suggestion}
            </div>
        {/each}
        </div>
</div>


<style>
    .grid {
        display: grid;
        padding: 5em;
    }
    .suggestion-container {
        border: 1px solid #ccc;
        background-color: white;
    }

    .suggestion {
        padding: 8px;
        cursor: pointer;
    }
</style>
