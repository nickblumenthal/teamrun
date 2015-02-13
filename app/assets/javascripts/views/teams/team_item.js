TeamRun.Views.TeamItem = Backbone.CompositeView.extend({
  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['teams/item'],
  className: 'team no-gutters',

  events: {
    'click .delete' : 'destroyTeam',
    'click #join' : 'joinTeam',
    'click #leave' : 'leaveTeam',
    'mouseover' : 'showInfo',
    'mouseleave' : 'hideInfo',
    'click .team-info' : 'showTeam'
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  },

  destroyTeam: function(event) {
    event.preventDefault();
    this.model.destroy();
    event.stopPropagation();
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
        // that.model.fetch();
      });
    });
  },

  showInfo: function(event) {
    event.preventDefault();
    this.$('.team-info').removeClass('fadeOutRight').addClass('animated fadeInLeft');
  },

  hideInfo: function(event) {
    event.preventDefault();
    this.$('.team-info').addClass('animated fadeOutRight').removeClass('fadeInLeft');
  },

  showTeam: function(event) {
    event.preventDefault();
    Backbone.history.navigate('teams/' + this.model.id, { trigger: true });
  },

  hideView: function() {
    // If not already hidden, animate out and then hide it
    if(!this.$el.hasClass('hidden-team-item')) {
      this.$el.addClass('animated fadeOut');
      var that = this;
      this.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        that.$el.addClass('hidden-team-item');
      });
    }
  },

  showView: function() {
    this.$el.removeClass('fadeOut hidden-team-item');
    this.$el.addClass('fadeIn')
  }
});
