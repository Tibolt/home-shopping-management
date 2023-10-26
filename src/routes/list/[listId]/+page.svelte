<script lang="ts">
    import Bubble from '../../../components/Bubble.svelte';
    import AddModal from '../../../components/addModal.svelte';
    import AddItemForm from '../../../components/addItemForm.svelte';
    import ItemsGrid from '../../../components/ItemsGrid.svelte';
    import Sugestion from '../../../components/Sugestion.svelte';
    import TextAutocomplete from '../../../components/TextAutocomplete.svelte';
    import type { PageData } from '../$types';
    import { enhance } from '$app/forms';
    import Card from '../../../components/Card.svelte';

    let showAddModal = false

    let edit = false

    export let data

    const toggleAddModal = () => {
        showAddModal = !showAddModal;
    }

    const toggleEdit = () => {
        edit = !edit;
    }

    const deleteItem = (id) => {
        // itemCount = itemCount.filter((item) => item.id != id);
        
    }

    const addItem = (e) => {
        // const item = e.detail;
        // itemCount = [...itemCount, item]
        toggleAddModal()
    }

    let itemCount = data.items;

    let sugestions = ["chleb", "mleko", "ser", "piwo"]
    let tempItems = []
</script>

<AddModal showAddModal={showAddModal} on:click={toggleAddModal}>
    <Card>
        <AddItemForm on:click={toggleAddModal} listId={data.listId}></AddItemForm>
    </Card>
</AddModal>

<div class="parent">
    <h2>lista</h2>
    <ItemsGrid items={itemCount}/>
    <div class="bottom">
        <div class="corners">
            <Bubble on:click={toggleEdit}>Edit</Bubble>
            <Bubble width="30px" on:click={toggleAddModal}>+</Bubble>
        </div>
    </div>
</div>

<style>
    .parent {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        width: 100%;
        height: 95%;
        padding-top: 5em;
    }
    .bottom {
        position: fixed;
        bottom: 8%;
        width: 100%;
    }
    .corners {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        gap: 50px;
        padding: 0 1em;
    }
    .btnUnset {
        all: unset;
    }
    @media screen and (max-width: 600px) {

        .bottom {
            padding: 20px;
            bottom: 3%;
            border-top: 2px solid #ddd;
        }
    }

</style>