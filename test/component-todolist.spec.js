// test/component-todo.spec.js
var Vue = require('vue')
var todoList = require('../components/todoList.vue')
var App = require('../components/App.vue')
var todoTag =require('../components/todoTag.vue')


describe('app.vue', function () {
  var datacontext;
  // asserting init component options
  it('should have correct title', function () {
    expect(todoList.data().title).toBe('This is a todo list')
  })
  it('todoList should have 5 methods', function () {
    expect(Object.keys(todoList.methods).length).toBe(5)
  })
  //asserting rendered result by actually rendering the component
  it('should render correct message', function () {
    // var vm = new Vue({
    //   template: '<div><app></app></div>',
    //   components: {
    //     'app':App
    //   }
    // }).$mount()
    //expect(vm.$el.querySelector('.filter').textContent).toBe('Tag Filter:')
  })
})