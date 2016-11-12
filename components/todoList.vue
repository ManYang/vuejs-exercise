<template>
<div class="todolist">
	<h1>{{title}}</h1>
	<input v-model="newList" v-on:keyup.enter="addNew"></input>
	<ul>
	<li v-for="item in items" track-by="$index" v-bind:class="{finished: item.completed}" v-on:click="toggle(item)">
		<h2>{{item.name}}-{{item._id}}</h2>
		<span>Notes: {{item.note}} <input v-model="item.note"></span>
		<span>Last Modified: {{item.updated_at}}</span>
    <div v-on:click="update(item)">update</div>
    <div v-on:click="delete(item)">delete</div>
	</li>
	</ul>
	<div v-on:click="getAll">get all todo list</div>
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
    },    
  	addNew(){
  		/*this.items.push({
  			label:this.newList,
  			completed:false
  		});*/
  		var obj = {
  			'name':this.newList,
  			'completed':false,
  			'note':"Default",
  			'updated_at':Date.now
  		}
      this.newList="";
  	 	var xhr = new XMLHttpRequest();
    	xhr.open('POST', 'http://localhost:8888/list', true);
    	xhr.setRequestHeader("Content-Type", "application/json");
    	xhr.onreadystatechange = function () {
    	    if (xhr.readyState == 4) {
    	        if (xhr.status == 200) {
    	            getAll();
    	        }
    	    }
    	};
    	xhr.send(JSON.stringify(obj));
  	},
    update(item){
      var obj = {
        'name':item.name,
        'completed':item.completed,
        'note':item.note,
        'updated_at':Date.now
      }
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8888/list/'+item._id, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  getAll();
              }
          }
      };
      xhr.send(JSON.stringify(obj));
    },
    delete(item){
      var xhr = new XMLHttpRequest();
      xhr.open('DELETE', 'http://localhost:8888/list/'+item._id, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  getAll();
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