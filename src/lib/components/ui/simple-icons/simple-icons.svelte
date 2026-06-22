<script lang="ts" module>
    import {
        icons,
        type SimpleIconsProps,
    } from "./simple-icons.ts";

    export { RenderIcon };
</script>



{#snippet RenderIcon(d: SimpleIconsProps)}
<svg
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    class={d.className}
    {...d}
    viewBox="0 0 {icons[d.name].box} {icons[d.name].box}">{@html icons[d.name].svg}
</svg>
{/snippet}