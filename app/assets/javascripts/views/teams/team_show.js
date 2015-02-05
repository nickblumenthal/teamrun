TeamRun.Views.TeamShow = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST['teams/show'],
  className: 'show-team',

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);
    var eventIndexView = new TeamRun.Views.EventIndex({
      collection: this.model.events()
    });
    this.addSubview('.events-list', eventIndexView);
    return this;
  },

})
