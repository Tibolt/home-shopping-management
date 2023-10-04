<script>
    let count = 0;

    function addOne() {
        count += 1;
    }
</script>
    
<style>

.center {
    display: grid;
    place-items: center;
}

</style>

<div class="center">
    <h1>About Page</h1>
    <p>which is interactive</p>

    <button on:click={addOne}>
        Clicked {count} Times
    </button>
</div>