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
    import FixedFooter from '../../../components/fixedFooter.svelte';
    import AddIcon from "~icons/material-symbols/add"

    let showAddModal = false

    let edit = false

    export let data
    export let form

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
</script>

<AddModal showAddModal={showAddModal} on:click={toggleAddModal}>
    <Card>
        <AddItemForm on:click={toggleAddModal} listId={data.listId}></AddItemForm>
    </Card>
</AddModal>


<div class="parent">
    <div class="error">
        <p>{form?.message || ""}</p>
    </div>
    <ItemsGrid items={itemCount} listName={data.listName}/>
    <FixedFooter>
            <Bubble on:click={toggleAddModal}><AddIcon/></Bubble>
    </FixedFooter>
</div>

<style>
    .parent {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        width: 100%;
        height: 100%;
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

    .error {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        color: var(--red)
    }

    @media screen and (max-width: 600px) {

        .bottom {
            padding: 20px;
            bottom: 3%;
            border-top: 2px solid #ddd;
        }
    }

</style>