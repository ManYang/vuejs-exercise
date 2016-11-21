// test/component-todo.spec.js
var Vue = require('vue')
var ComponentA = require('../components/todoList.vue')

describe('todoList.vue', function () {
  var datacontext;

  // asserting init component options
  it('should have correct title', function () {
    expect(ComponentA.data().title).toBe('This is a todo list')
  })
  it('should have 5 methods', function () {
    expect(Object.keys(ComponentA.methods).length).toBe(5)
  })
  //asserting rendered result by actually rendering the component
  it('should render correct message', function () {
    var vm = new Vue({
      template: '<div><todolist></todolist></div>',
      components: {
        'todolist':ComponentA
      }
    }).$mount()
    expect(vm.$el.querySelector('h1').textContent).toBe('This is a todo list')
  })
})