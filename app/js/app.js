jQuery(function ($) {
  'use strict';

  var ENTER_KEY = 13;

  var util = {
    createGuid: function () {
      //http://byronsalau.com/blog/how-to-create-a-guid-uuid-in-javascript/
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    },
    getTodos: function (namespace) {
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    },
    setTodo: function (namespace, data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }
  };

  var App = {
    init: function () {
      this.todos = util.getTodos('todos-jquery');
      this.todoTemplate = Handlebars.compile($('#todo-template').html());
      this.counterTemplate = Handlebars.compile($('#counter-template').html());
      this.bindEvents();
      this.render();
    },

    bindEvents: function () {
      $('#new-todo').on('keyup', this.add.bind(this));
      $('#add-todo').on('click', function(){
        var e = $.Event('keyup');
        e.which = ENTER_KEY;
        $('#new-todo').trigger(e);
      });
      $('#complete-all').on('click', this.completeAll.bind(this));
      $('#clear-completed').on('click', this.deleteAllCompleted.bind(this));
      $('#todo-list')
        .on('click', '.toggle', this.complete.bind(this))
        .on('click', '.delete', this.delete.bind(this));

    },
    render: function () {
      var todos = this.todos;
      $('#todo-list').html(this.todoTemplate(todos));
      $('#new-todo').focus();
      this.renderCounter();
      util.setTodo('todos-jquery', this.todos);
    },

    renderCounter: function(){
      var todoCount = this.todos.length;
      var activeTodoCount = this.todos.filter(function (todo) {
        return !todo.completed;
      }).length;
      var template = this.counterTemplate({
        empty: todoCount === 0,
        activeTodoCount: activeTodoCount,
        itemsWord: todoCount > 1 ? 'items' : 'item',
        todoCount: todoCount
      });
      $('#counter').html(template);
    },

    complete: function(e) {
      var i = this.indexFromEl(e.target);
      this.todos[i].completed = !this.todos[i].completed;
      this.render();
    },

    completeAll: function () {
      this.todos.forEach(function (todo) {
        todo.completed = true;
      });
      this.render();
    },

    delete : function (e) {
      this.todos.splice(this.indexFromEl(e.target), 1);
      this.render();
    },

    deleteAllCompleted: function () {
      this.todos = this.todos.filter(function (todo) {
        return !todo.completed;
      });
      this.render();
    },

    indexFromEl: function (el) {
      var id = $(el).closest('li').data('id');
      var todos = this.todos;
      var i = todos.length;
      while (i--) {
        if (todos[i].id === id) {
          return i;
        }
      }
    },

    add: function (e) {
      var $input = $(e.target);
      var val = $input.val().trim();
      if (e.which !== ENTER_KEY || !val) {
        return;
      }
      this.todos.push({
        id: util.createGuid(),
        title: val,
        completed: false
      });
      $input.val('');
      this.render();
    }
  };

  App.init();
});
