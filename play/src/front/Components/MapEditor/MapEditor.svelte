<script lang="ts">
    import AreaPreviewWindow from "./AreaPreviewWindow.svelte";

    // function close() {
    //     mapEditorModeStore.switchMode(false);
    // }
</script>

<div class="map-editor tw-bg-dark-blue/95">
    <div class="sidebar">
        <AreaPreviewWindow />
    </div>
</div>

<style lang="scss">
    .map-editor {
        position: absolute !important;
        top: 0;
        right: 0;
        width: fit-content !important;
        z-index: 425;

        pointer-events: auto;
        color: whitesmoke;

        .sidebar {
            position: relative !important;
            display: flex;
            flex-direction: row;
            gap: 10px;
        }
    }
</style>
