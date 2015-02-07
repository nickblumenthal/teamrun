TeamRun.Views.TeamItem = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['teams/item'],
  className: 'team',

  events: {
    'click .delete' : 'destroyTeam',
    'click #join' : 'joinTeam',
    'click #leave' : 'leaveTeam'
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
    this.toggleMembershipButton('leave', 'Leave Team');
  },

  leaveTeam: function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/memberships/" + this.model.id,
      type: 'DELETE',
      data: {'membership': {'team_id': this.model.id}}
    });
    this.toggleMembershipButton('join', 'Join Team');
  },

  toggleMembershipButton: function(newId, newText) {
    this.$('.membership').attr('id', newId).text(newText);
  }
});
