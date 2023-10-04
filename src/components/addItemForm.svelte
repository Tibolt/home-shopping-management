<script lang="ts">
	import Card from "./Card.svelte";

    let name: String;
    let amount: Int16Array;
    const handleSumbit = () => {
        console.log(name, amount)
    }
</script>


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
        grid-template-rows: 1fr 1fr 1fr;
        
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

<form method="post" on:submit|preventDefault={handleSumbit}>
    <Card>
        <div class="center">   
            <h1 >Add New Item </h1>
            <div class="float">
                <label for="name">name</label>
                <input type="text" id="name" placeholder="type name of item" bind:value={name}>
            </div>
            <div class="float">
                <label for="amount">amount</label>
                <input type="number" id="amount" placeholder="type amount" bind:value={amount}>
            </div>
        </div>
        <div class="grid">
            <h2 >Add</h2>
            <button class="float">+</button>
        </div>
    </Card>
</form>