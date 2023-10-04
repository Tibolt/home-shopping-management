<script lang="ts">


    export let showAddModal = false;

    
</script>


<style>

.backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.8);
}

.modal {
    padding: 10px;
    max-width: 400px;
    margin: 20% auto;
    text-align: center;
    border-radius: 10px;
}

</style>

{#if showAddModal}
<!-- event forwarding, dont use ={} to use event from parent  -->
    <div class="backdrop" on:click|self>
        <div class="modal">
            <slot></slot>
        </div>
    </div>
{/if}