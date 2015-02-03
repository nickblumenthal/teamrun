TeamRun.Views.TeamShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST['teams/show'],
  className: 'show-team',

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);

    return this;
  }
})
