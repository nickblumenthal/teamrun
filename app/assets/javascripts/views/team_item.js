TeamRun.Views.TeamItem = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['teams/item'],
  className: 'team',

  events: {
    'click .delete' : 'destroyTeam'
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  },

  destroyTeam: function(event) {
    event.preventDefault();
    this.model.destroy();
  }
});
