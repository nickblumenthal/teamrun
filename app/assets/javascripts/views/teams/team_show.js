TeamRun.Views.TeamShow = Backbone.CompositeView.extend({

  template: JST['teams/show'],
  className: 'show-team',

  events: {
    'click .new-event-button': 'newEvent',
    'click #join': 'joinTeam',
    'click #leave': 'leaveTeam'
  },

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);

    // Add team description subview
    var detailView = new TeamRun.Views.TeamDetail({
      model: this.model
    });
    this.addSubview('.team-detail', detailView);

    // Add event index subview
    var eventIndexView = new TeamRun.Views.EventIndex({
      collection: this.model.events()
    });
    this.addSubview('.events-list', eventIndexView);

    // Add calendar subview
    var calendarView = new TeamRun.Views.CalendarShow({
      model: this.model
    });
    this.addSubview('.calendar-container', calendarView);

    return this;
  },

  newEvent: function(event) {
    event.preventDefault();
    Backbone.history.navigate("#/teams/" + this.model.id + "/events/new", { trigger: true });
  },

  joinTeam: function(event) {
    event.preventDefault();
    var membership = new TeamRun.Models.Membership({
      membership: { team_id: this.model.id }
    });
    membership.save();
    this.toggleMembership('leave', 'Leave Team');
    event.stopPropagation();
  },

  leaveTeam: function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/memberships/" + this.model.id,
      type: 'DELETE',
      data: {'membership': {'team_id': this.model.id}}
    });
    this.toggleMembership('join', 'Join Team');
    event.stopPropagation();
  },

  toggleMembership: function(newId, newText) {
    var that = this;
    var membershipButton = this.$('.membership');
    membershipButton.addClass('animated flipOutX');
    membershipButton.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      membershipButton.addClass('animated flipInX').removeClass('flipOutX');
      membershipButton.attr('id', newId).text(newText);
      membershipButton.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        membershipButton.removeClass('animated flipInX');

        // Update views by refetching model with updated membership info
        that.model.fetch();
      });
    });
  },

})
