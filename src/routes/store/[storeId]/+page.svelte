<script>
    import FixedFooter from '../../../components/fixedFooter.svelte';
    import AddIcon from "~icons/ph/plus-fill"
    import AddIconBubble from "~icons/material-symbols/add"
    import MinusIcon from "~icons/ph/minus-fill"
    import DeleteIcon from "~icons/octicon/trash-16"
    import AddModal from '../../../components/addModal.svelte';
    import Card from '../../../components/Card.svelte';
    import AddItemForm from '../../../components/addItemForm.svelte';
    import Bubble from '../../../components/Bubble.svelte';
    import { _ } from 'svelte-i18n'
    // import { swipe } from 'svelte-gestures';
    let count = 0;

    function addOne(id) {
        let index = items.findIndex((item) => item.id == id)
        items[index].amount += 1
    }

    function subtractOne(id) {
        let index = items.findIndex((item) => item.id == id)
        items[index].amount -= 1
    }

    export let data

    let items = []


    let showAddModal = false


    const toggleAddModal = () => {
        showAddModal = !showAddModal;
    }


</script>
<AddModal showAddModal={showAddModal} on:click={toggleAddModal}>
    <Card>
        <AddItemForm on:click={toggleAddModal} listId={data.storageId} isStorage={true}></AddItemForm>
    </Card>
</AddModal>

<div class="center">
    <div class="list">
        <h1>{data.name}</h1>
        <table>
            <tr>
                <th>{$_('name')}</th>
                <th>{$_('amount')}</th>
                <th>{$_('purchased')}</th>
                <th>{$_('edit')}</th>
            </tr>
            {#each data.items as item }
                <tr>
                    <td><h3>{item.name}</h3></td>
                    <td>{item.amount_in_storage} {item.unit}</td>
                    <td>{item.purchased_date}</td>
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
        <a href="/list/{data.listId}">{$_('goTo')} {data.name}</a>
        <Bubble on:click={toggleAddModal}><AddIconBubble/></Bubble>
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

td {
    text-align: center;
}

</style>

