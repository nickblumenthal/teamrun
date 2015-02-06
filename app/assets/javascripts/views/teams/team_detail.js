TeamRun.Views.TeamDetail = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync change', this.render)
  },

  template: JST['teams/detail'],

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);

    return this;
  }
});
