<script>
    import Card from './Card.svelte'

    export let name = "";
    export let amount = 0;
</script>

<style>
    h3 {
        color: blue;
    }
</style>

<Card width={"100px"}>
    <h3>{name}</h3>
    <p>Amount: {amount}</p>
</Card>