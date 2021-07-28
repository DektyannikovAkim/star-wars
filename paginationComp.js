const pagination = {
    props: ['pagination'],
    template: `
    <div class="btn-toolbar">
        <div class="btn-wrapper">
            <button class="scroll-button" 
            v-if="pagination.previousPages"
            @click.prevent="$root.setPage(pagination.currentPage-1)">
            </button>
            <span class="current-page">
                {{ pagination.currentPage }}
            </span>
            <button class="scroll-button right" 
            v-if="pagination.nextPages"
            @click.prevent="$root.setPage(pagination.currentPage+1)">
            </button>
        </div>
    </div>
    `
        // :class="{ page_active: pagination.currentPage===p}" 
        // @click.prevent="$root.setPage(p)">
}