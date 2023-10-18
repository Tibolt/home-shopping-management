<script>
    let count = 0;

    function addOne(id) {
        let index = items.findIndex((item) => item.id == id)
        items[index].amount += 1
    }

    function subtractOne(id) {
        let index = items.findIndex((item) => item.id == id)
        items[index].amount -= 1
    }

    let items = [
        {id: 0, name: 'apple', amount: 2, unit: "kg", prize: 5},
        {id: 1, name: 'bannana', amount: 4, unit: "", prize: 2}
    ]
</script>
    
<style>

.center {
    display: grid;
    place-items: center;
    padding-top: 5em;
}

.list-table {

}

</style>

<div class="center">
    <div class="list">
        <table>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Prize</th>
                <th>Edit</th>
            </tr>
            {#each items as item}
            <tr>
                <td><h3>{item.name}</h3></td>
                <td>{item.amount} {item.unit}</td>
                {#if item.unit == ""}
                    <td>{item.prize} $</td>
                {:else}
                <td>{item.prize} $ per {item.unit}</td>
                {/if}
                <td>
                    <button on:click={() => addOne(item.id)}>
                        add
                    </button>
                    <button on:click={() => subtractOne(item.id)}>
                        minus
                    </button>
                </td>
            </tr>
            {/each}
        </table>
    </div>
</div>