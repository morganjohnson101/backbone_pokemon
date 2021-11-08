var PokemonModel = Backbone.Model.extend({
    defaults: {
        name: null,
        url: null
    }
});
var PokemonCollection = Backbone.Collection.extend({
    model: PokemonModel,
    url: "http://pokeapi.co/api/v2/pokemon",
    parse: function(data){
        return data.results;
    }
});



var pc = new PokemonCollection();
pc.fetch().then(function(){
    console.log(pc);
});