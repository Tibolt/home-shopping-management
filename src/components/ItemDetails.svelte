<script>
    import Card from './Card.svelte'

    export let name = "";
    export let amount = 0;
</script>

<style>
    button {
        color: var(--red);
        position: relative;
        left: 80px;
        bottom: 40px;
        font-size: 20px;
        border-radius: 5px;
        border-width: 0px;
        background-color: unset;
    }
</style>

<Card width={"100px"}>
    <h3>{name}</h3>
    <p>Amount: {amount}</p>
    <button on:click|self>X</button>
</Card>