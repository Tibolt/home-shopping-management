<script lang="ts">


    export let showAddModal = false;

    
</script>


<style>

.backdrop {
    width: 100%;
    height: 100vh;
    position: fixed;
    background: rgba(0,0,0,0.8);
    z-index: 10;
    top: 0;
    left: 0;
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