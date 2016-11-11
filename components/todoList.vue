<template>
<div class="todolist">
	<h1>{{title}}</h1>
	<input v-model="newList" v-on:keyup.enter="addNew"></input>
	<ul>
	<li v-for="item in items" track-by="$index" v-bind:class="{finished: item.completed}" v-on:click="toggle(item)">
		<h2>{{item.name}}</h2>
		<span>Notes: {{item.note}}</span>
		<span>Last Modified: {{item.updated_at}}</span>
	</li>
	</ul>
	<div v-on:click="getAll">click me to get all todo list</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'This is a todo list',
      items:'',
      newList:""
    }
  },
  methods:{
  	toggle(item){
  		item.completed = !item.completed;
  	},
  	addNew(){
  		/*this.items.push({
  			label:this.newList,
  			completed:false
  		});*/
  		var obj = {
  			name:this.newList,
  			completed:false,
  			note:"Default",
  			updated_at:Date.now
  		}
  		this.newList="";
  	 	var xhr = new XMLHttpRequest();
    	xhr.open('POST', 'http://localhost:8888/list', true);
    	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	xhr.onreadystatechange = function () {
    	    if (xhr.readyState == 4) {
    	        if (xhr.status == 200) {
    	            getAll();
    	        }
    	    }
    	};
    	xhr.send(obj);
  	},
  	getAll(){
  		var self = this;
  	 	var xhr = new XMLHttpRequest();
    	xhr.open('GET', 'http://localhost:8888/list', false);
    	xhr.setRequestHeader("Content-Type", "application/json");
    	xhr.onreadystatechange = function () {
    	    if (xhr.readyState == 4) {
    	        if (xhr.status == 200) {
    	            self.$set("items",JSON.parse(xhr.response));
    	        }
    	    }
    	};
    	xhr.send(null);
  	}
  }
}
</script>

<style>
.completed{
	text-decoration: line-through;
}
</style>