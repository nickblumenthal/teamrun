TeamRun.Views.TeamItem = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['teams/item'],
  className: 'team',

  events: {
    'click .delete' : 'destroyTeam',
    'click .join' : 'joinTeam'
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  },

  destroyTeam: function(event) {
    event.preventDefault();
    this.model.destroy();
  },

  joinTeam: function(event) {
    event.preventDefault();
    var membership = new TeamRun.Models.Membership({
      membership: { team_id: this.model.id }
    });
    membership.save();
  }
});
