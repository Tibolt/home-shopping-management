<script>
    import Card from './Card.svelte'

    export let name = "";
    export let amount = 0;
</script>


<Card width={"100%"}>
    <div class="flex">
        <h3>{name}</h3>
        <button on:click|self>X</button>
    </div>
    <p>Amount: {amount}</p>
</Card>

<style>
    button {
        color: var(--red);
        font-size: 20px;
        border-radius: 5px;
        border-width: 0px;
        background-color: unset;
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>