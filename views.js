var PokemonModel = Backbone.Model.extend({
    name: null,
    url: null
});

var PokemonCollection = Backbone.Collection.extend({
    model: PokemonModel,
    url: "http://pokeapi.co/api/v2/pokemon",
    parse: function (data) {
        return data.results;
    }
});

var PokemonView = Backbone.View.extend({
    tagName: 'li',
    template: _.template("<h1><%= name %></h1>"),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'dblclick': 'destroy'
    },
    destroy: function(){
        this.model.destroy();
    }
});

var PokemonListView = Backbone.View.extend({
    el: '#pokemon_list',
    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
        this.listenTo(this.collection, 'remove', this.whatHappened);
    },
    render: function () {
        this.$el.empty();
        this.collection.each(function (pokemon) {
            var pokemonView = new PokemonView({ model: pokemon });
            this.$el.append(pokemonView.render().$el);
        }, this);
    },
    whatHappened: function(){
        console.log('A pokemon got ejected!');
    }
});

var pc = new PokemonCollection();
var myPokemonList = new PokemonListView({collection: pc});
pc.fetch();
// var pc = new PokemonCollection();
// pc.fetch().then(function(){
//     var myPokemonList = new PokemonListView({collection: pc})
// });
