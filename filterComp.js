const sorter = {
    data() {
        return {
            selectedTask: 'All',
        }
    },
    methods: {
        filterByCategory() {
            if (this.selectedTask !== 'All') {
                this.$root.getfavoritesHeroes();
                this.$parent.favoritesHeroes = this.$parent.favoritesHeroes.filter(el => {
                    return el.gender === this.selectedTask.toLowerCase();
                });
            } else {
                this.$root.getfavoritesHeroes();
            }
        }
    },
    template: `
    <div class="sort_by">
        <div class="sort_by-text">
            <span>Sort by gender</span>
        </div>
        <select class="sort_by-select" v-model="selectedTask" @change="filterByCategory">
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
            <option>N/a</option>
        </select>
    </div>
    `
}