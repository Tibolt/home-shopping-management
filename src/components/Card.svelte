<script>

    export let width = "auto"
</script>

<style>
    .card {
        background-color: var(--card-bg);
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        /* margin-bottom: 10em; */
    }

</style>


<div class="card" style="width: {width};">
    <slot></slot>
</div>