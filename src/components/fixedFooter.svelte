<script>
    
</script>

<div class="bottom">
    <div class="corners">
        <slot></slot>
    </div>
</div>


<style>
    .bottom {
        position: fixed;
        bottom: 8%;
        width: 100%;
    }
    .corners {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        gap: 50px;
        padding: 0 1em;
    }

    @media screen and (max-width: 600px) {

        .bottom {
            padding: 20px;
            bottom: 3%;
            border-top: 2px solid #ddd;
        }
    }

</style>