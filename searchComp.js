const search = {
    data() {
        return {
            userSearch: ''
        }
    },
    methods: {
        searchHeroes(userSearch) {
            this.$parent.heroes.length = 0;
            this.$parent.getJson(this.$parent.API).then(data => {
                data.results.forEach(item => {
                    if (item.name.toLowerCase().includes(userSearch.toLowerCase())) {
                        item.id = this.$parent.getIdFromUrl(item.url);
                        item.characterPhoto = 'https://starwars-visualguide.com/assets/img/characters/' + item.id + '.jpg';
                        item.favorite = this.$parent.favoritesHeroes.find(el => el.id === item.id);
                        this.$parent.heroes.push(item);
                    }
                })
            })
        }
    },
    template: `
    <form class="search" @submit.prevent="searchHeroes(userSearch)">
        <input type="text" class="search-text" v-model='userSearch'>
        <button class="search-button"></button>
    </form>
    `
}