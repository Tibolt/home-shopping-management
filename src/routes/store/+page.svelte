<script>
    import FixedFooter from '../../components/fixedFooter.svelte';
    import AddIcon from "~icons/ph/plus-fill"
    import MinusIcon from "~icons/ph/minus-fill"
    import DeleteIcon from "~icons/octicon/trash-16"
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

    export let data


</script>
    

<div class="center">
    <div class="list">
        <h1>{data.name}</h1>
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
                        <AddIcon/>
                    </button>
                    <button on:click={() => subtractOne(item.id)}>
                        <MinusIcon/>
                    </button>
                </td>
            </tr>
            {/each}
            {#each data.items as item }
                <tr>
                    <td><h3>{item.name}</h3></td>
                    <td>{item.amount} {item.unit}</td>
                    {#if item.unit == ""}
                        <td>{item.prize} $</td>
                    {:else}
                    <td>{item.prize} $ per {item.unit}</td>
                    {/if}
                    <td>
                        <div class="flex">
                            <form method="POST" action="?/addOne">
                                <input type="hidden" hidden value={item.id} name="id">
                                <button style="color: var(--dark-green);"><AddIcon/></button>
                            </form>
                            <form method="POST" action="?/minusOne">
                                <input type="hidden" hidden value={item.id} name="id">
                                <button style="color: var(--red);"><MinusIcon/></button>
                            </form>
                            <form method="POST" action="?/delete">
                                <input type="hidden" hidden value={item.id} name="id">
                                <button style="color: var(--red);"><DeleteIcon/></button>
                            </form>
                        </div>

                    </td>
                </tr>
            {/each}
        </table>
    </div>
    <FixedFooter>
        <a href="/list/{data.listId}">Go to {data.name}</a>
    </FixedFooter>
</div>

<style>

.center {
    display: grid;
    place-items: center;
    padding-top: 5em;
}

.list {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    justify-content: center;
}
table {
    width: 100%;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
button {
    all:unset;
}

</style>

