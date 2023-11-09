<script>

    export let width = "auto"
    export let marked = false
</script>

<style>
    .card {
        background-color: var(--card-bg);
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        /* margin-bottom: 10em; */
    }

</style>

{#if marked}
<div class="card" style="width: {width}; background-color: gray">
    <slot></slot>
</div>
{:else}
<div class="card" style="width: {width};">
    <slot></slot>
</div>
{/if}