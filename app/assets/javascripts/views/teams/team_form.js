TeamRun.Views.TeamForm = Backbone.CompositeView.extend({
  template: JST['teams/form'],
  tagName: 'form',
  className: 'team-form form-horizontal col-md-6 col-md-offset-3',

  events: {
    'click [name=submit]' : 'submitTeam'
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  },

  submitTeam: function(event) {
    event.preventDefault();
    var data = this.$el.serializeJSON();
    var team = new TeamRun.Models.Team(data);
    if(this.model.id) {
      team.set('id', this.model.id);
    }
    var view = this;
    team.save({}, {
      success: function() {
        view.collection.add(team, {merge: true});
        Backbone.history.navigate('', {trigger: true});
      }
    });
  }
})
