<script lang="ts">
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
    import EditStorage from '../../../components/editStorage.svelte';
    import { enhance } from '$app/forms';
    import EditStorageResuply from '../../../components/editStorageResuply.svelte';
    // import { swipe } from 'svelte-gestures';
    let count = 0;

    export let data
    export let form

    let storageId: number = data.storageId
    let storageName: string = data.name
    let itemId: number
    let resuplyNumber: number

    let showAddModal = false
    let showEditForm = false
    let showEditResuply = false


    const toggleAddModal = () => {
        showAddModal = !showAddModal;
    }

    const toggleEditModal = () => {
        showEditForm = !showEditForm;
    }

    const toggleEditResuply = () => {
        showEditResuply = !showEditResuply;
    }

    const handleResuplyEdit = (id, number) => {
        itemId = id
        resuplyNumber = number
        toggleEditResuply()
    }


</script>
<AddModal showAddModal={showAddModal} on:click={toggleAddModal}>
    <Card>
        <AddItemForm on:click={toggleAddModal} listId={data.storageId} isStorage={true}></AddItemForm>
    </Card>
</AddModal>

<AddModal showAddModal={showEditForm} on:click={toggleEditModal}>
    <EditStorage storageId={storageId} name={storageName} on:click={toggleEditModal}></EditStorage>
</AddModal>

<AddModal showAddModal={showEditResuply} on:click={toggleEditResuply}>
    <EditStorageResuply itemId={itemId} resuplyNumber={resuplyNumber} on:click={toggleEditResuply}></EditStorageResuply>
</AddModal>
<div class="center">
    {form?.message || ""}
    <h1>{$_('storage')} {data.name}</h1>
    <div class="stores-list">
        {#each data.stores as store}
            <Card><a href="/store/{store.id}">{store.name}</a></Card>
        {/each}
    </div>
    <div class="list">
        <table>
            <tr>
                <th>{$_('name')}</th>
                <th>{$_('amount')}</th>
                <th>{$_('purchased')}</th>
                <th>{$_('edit')}</th>
            </tr>
            {#each data.items as item }
                <tr>
                    <td><button class="resuply-btn" on:click={() => handleResuplyEdit(item.id, item.restock_number)}><h3>{item.name}</h3></button></td>
                    <td>{item.amount_in_storage} {item.unit}</td>
                    <td>{item.purchased_date}</td>
                    <td>
                        <div class="flex">
                            <form method="POST" action="?/addOne" use:enhance>
                                <input type="hidden" hidden value={item.id} name="id">
                                <button class="options" style="color: var(--dark-green);"><AddIcon/></button>
                            </form>
                            <form method="POST" action="?/minusOne" use:enhance>
                                <input type="hidden" hidden value={item.id} name="id">
                                <button class="options" style="color: var(--red);"><MinusIcon/></button>
                            </form>
                            <form method="POST" action="?/delete" use:enhance>
                                <input type="hidden" hidden value={item.id} name="id">
                                <button class="options" style="color: var(--red);"><DeleteIcon/></button>
                            </form>
                        </div>

                    </td>
                </tr>
            {/each}
        </table>
    </div>
    <FixedFooter>
        <Bubble><a href="/list/{data.listId}" class="a-list">{$_('list')}</a></Bubble>
        <Bubble on:click={toggleEditModal}>{$_('edit')}</Bubble>
        <Bubble on:click={toggleAddModal}><AddIconBubble/></Bubble>
    </FixedFooter>
</div>
<div class="end"></div>

<style>

.center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5em;
    /* width: 100%; */
}

h1 {
    text-align: center;
}

.end {
    height: 40vh;
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
    border-collapse: collapse;
    /* border-spacing: 20px 0; */
}

.flex {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
button {
    all:unset;
}

a {
    padding: 10px;
    color: var(--dark-blue);
}

.a-list {
    color: var(--btn-text)
}

th {
    background-color: #4287f5;
    color: white;
    border: 1px solid black;
}

td {
    text-align: center;
    border: 1px solid black;
    padding: 5px;
}

.stores-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 25px;
    width: 80%;
    align-items: center;
    justify-content: fkex-start;
    padding: 10px 0;
}

.options {
    padding: 10px;
}

.resuply-btn {
    all: unset;
    cursor: pointer;
    padding: 5px;
}

</style>

