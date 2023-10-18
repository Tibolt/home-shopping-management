<script lang="ts">
    import Card from './Card.svelte'

    export let name = "";
    export let listName = "items"
</script>

<style>
    
.border {
    width: 100%;
    height: 100%;
    border: black;
    border-width: 2px;
    border-style: dotted;
}

</style>

<div class="border" on:click>
    <Card width={"300px"}>
        <h3>{name}</h3>
        <p>2/3</p>
        <slot></slot>
    </Card>
</div>