const search = {
    data() {
        return {
            userSearch: ''
        }
    },
    methods: {
        searchHeroes(userSearch) {
            this.$parent.heroes.length = 0;
            this.$parent.getJson('https://swapi.dev/api/people/?page=' + this.$parent.pagination.currentPage + '&format=json').then(data => {
                this.enumOfValues(data, userSearch);
                if (this.$parent.heroes.length === 0 && data.next) {
                    this.searchNextPage(data.next, userSearch);
                }
            })
        },
        searchNextPage(nextURL, userSearch) {
            this.$parent.getJson(nextURL).then(data => {
                this.enumOfValues(data, userSearch);
                if (this.$parent.heroes.length === 0 && data.next) {
                    this.searchNextPage(data.next, userSearch);
                }
            })
        },
        enumOfValues(data, userSearch) {
            data.results.forEach(item => {
                if (item.name.toLowerCase().includes(userSearch.toLowerCase())) {
                    item.id = this.$parent.getIdFromUrl(item.url);
                    item.characterPhoto = 'https://starwars-visualguide.com/assets/img/characters/' + item.id + '.jpg';
                    item.favorite = this.$parent.favoritesHeroes.find(el => el.id === item.id);
                    this.$parent.getJson(item.homeworld).then(data => {
                        item.homeworld = data.name;
                    });
                    this.$parent.heroes.push(item);
                }
            });
        }
    },
    template: `
    <form class="search" @submit.prevent="searchHeroes(userSearch)">
        <input type="text" class="search-text" v-model='userSearch'>
        <button class="search-button"></button>
    </form>
    `
}