(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{28:function(e,t,a){e.exports=a(45)},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(24),l=a.n(c),s=a(8),o=(a(33),a(13)),i=a(14),u=a(16),m=a(15),h=a(6),f=a(17),v=a(7);var p=function(e){var t=e.handler,a=e.value;return r.a.createElement("form",null,r.a.createElement("label",{htmlFor:"filter"},"Search pokemon:"),r.a.createElement("input",{className:"Filter__input",name:"filter",id:"filter",type:"text",onChange:t,value:a,placeholder:"Bulbasaur"}))};a(34),a(35);var E=function(e){var t=e.id,a=e.types,n=e.name,c=e.img,l=e.evolves;return r.a.createElement("div",{className:"Pokemon"},r.a.createElement("div",{className:"PkmImg",style:{backgroundImage:"url(".concat(c,")")},alt:n},r.a.createElement("p",{className:"Id"},"ID/",t)),r.a.createElement("h2",{className:"Name"},n),r.a.createElement("ul",{className:"ListType"},a.map(function(e,t){return r.a.createElement("li",{className:"Type",key:t},e.type.name)})),"none"!==l?r.a.createElement("p",{className:"Evolves"},"Evolves from: ",r.a.createElement("span",{className:"Evolution"},l)):r.a.createElement("div",{className:"NoEvol"}," "))};var d=function(e){var t=e.pokemons;return r.a.createElement("ul",{className:"PokemonUl"},0===t.length?"No matching results found.":t.map(function(e){var t=e.id,a=e.name,n=e.types,c=e.sprites,l=e.evolvesFrom;return r.a.createElement("li",{key:t},r.a.createElement(s.b,{to:"/".concat(t),className:"List__link"},r.a.createElement(E,{id:t,name:a,types:n,img:c.front_default,evolves:l})))}))},g=a(27),k=a(11),b=a(12),N=(a(43),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={evolutions:"",evolutionsImgs:[],fetchError:"",fetchImgError:"",isLoading:!0},a.fetchEvols=a.fetchEvols.bind(Object(h.a)(a)),a.checkEvs=a.checkEvs.bind(Object(h.a)(a)),a.fetchImg=a.fetchImg.bind(Object(h.a)(a)),a}return Object(f.a)(t,e),Object(i.a)(t,[{key:"fetchEvols",value:function(e){var t=this;fetch(this.props.data.evsUrl).then(function(e){return e.json()}).then(function(e){var a=[],n=[];t.checkEvs(a,n,e.chain),t.setState({evolutions:a,evolutionsImgs:n})}).catch(function(e){return t.setState({fetchError:e})})}},{key:"checkEvs",value:function(e,t,a){a&&(e.push(a.species.name),this.checkEvs(e,t,a.evolves_to[0]),this.fetchImg(t,a))}},{key:"fetchImg",value:function(e,t){var a=this,n=t.species.url.split("/"),r=n[n.length-2],c="https://pokeapi.co/api/v2/pokemon/".concat(r,"/");fetch(c).then(function(e){return e.json()}).then(function(t){e.push(t.sprites.front_default),a.setState({isLoading:!1})}).catch(function(e){return a.setState({fetchImgError:e})})}},{key:"render",value:function(){var e=this.props.data;if(e){var t=e.name,a=e.sprites,n=e.abilities,c=e.height,l=e.weight,o=this.state,i=o.evolutions,u=o.evolutionsImgs,m=o.fetchError,h=o.fetchImgError,f=o.isLoading;return this.state.evolutions||this.fetchEvols(e),r.a.createElement("div",{className:"Details_card"},r.a.createElement(s.b,{className:"Back",to:"/"},r.a.createElement(k.a,{icon:b.a})),r.a.createElement("img",{className:"Space",src:a.front_default,alt:t}),r.a.createElement("img",{src:a.back_default,alt:t}),r.a.createElement("h1",null,t),r.a.createElement("span",{className:"Space"},r.a.createElement(k.a,{className:"Icon",icon:b.c})," ",c," "),r.a.createElement("span",{className:"Space"},r.a.createElement(k.a,{className:"Icon",icon:b.d})," ",l),r.a.createElement("p",{className:"Title"},"Abilities"),r.a.createElement("ul",{className:"Abilities_list"},n.map(function(e,t){return r.a.createElement("li",{key:t+1,className:"Ability"},e.ability.name)})),r.a.createElement("p",{className:"Title"},"Evolution chain:"),r.a.createElement("p",null,m?"An error occured.":i.length?i.reduce(function(e,t,a){return[].concat(Object(g.a)(e),[r.a.createElement("span",{key:a+1},r.a.createElement(k.a,{className:"Icon",icon:b.b}),t)])}):"Loading..."),r.a.createElement("ul",{className:"Evolutions_list"},h?"An error occured.":f?"Loading...":u.sort().map(function(e,a){return r.a.createElement("li",{key:a+1,className:"Space"},r.a.createElement("img",{src:e,alt:t}))})))}return"Loading..."}}]),t}(r.a.Component)),y=(a(44),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={allPokemons:[],isLoading:!0,filter:"",fetchError:""},a.handlerFilter=a.handlerFilter.bind(Object(h.a)(a)),a}return Object(f.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://pokeapi.co/api/v2/pokemon/?limit=25").then(function(e){return e.json()}).then(function(t){var a=t.results.map(function(e){var t={};return fetch(e.url).then(function(e){return e.json()}).then(function(e){return t=e,fetch(e.species.url)}).then(function(e){return e.json()}).then(function(e){var a=e.evolves_from_species;t.evolvesFrom=a?a.name:"none";var n=e.evolution_chain.url;return t.evsUrl=n||"none",t})});Promise.all(a).then(function(t){e.setState({allPokemons:t,isLoading:!1})})}).catch(function(t){return e.setState({fetchError:t})})}},{key:"handlerFilter",value:function(e){this.setState({filter:e.target.value})}},{key:"render",value:function(){var e=this,t=this.state,a=t.allPokemons,n=t.isLoading,c=t.filter,l=t.fetchError;return r.a.createElement("div",{className:"App"},r.a.createElement(v.c,null,r.a.createElement(v.a,{exact:!0,path:"/",render:function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,{handler:e.handlerFilter,value:c}),l?"An error occured.":n?r.a.createElement("p",null,"Loading..."):r.a.createElement(d,{pokemons:a.filter(function(e){return e.name.toUpperCase().includes(c.toUpperCase())})}))}}),r.a.createElement(v.a,{path:"/:id",render:function(e){return r.a.createElement(N,{data:a.find(function(t){return t.id===parseInt(e.match.params.id)})})}})))}}]),t}(r.a.Component));l.a.render(r.a.createElement(s.a,null,r.a.createElement(y,null)),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.f3255028.chunk.js.map