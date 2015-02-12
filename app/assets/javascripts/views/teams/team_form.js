TeamRun.Views.TeamForm = Backbone.CompositeView.extend({
  template: JST['teams/form'],
  tagName: 'form',
  className: 'team-form form-horizontal col-md-6 col-md-offset-3',

  events: {
    'click #create-team' : 'submitTeam',
    'click .my-cloudinary-button' : 'openWidget'
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
        Backbone.history.navigate('teams/' + team.id, {trigger: true});
      }
    });
  },

  openWidget: function(event) {
    var that = this;
    event.preventDefault();
    cloudinary.openUploadWidget({
        upload_preset: 'iwepl581',
        cropping: 'server',
        cropping_aspect_ratio: 1.3,
        button_class: 'my-cloudinary-button',
      },
      function(error, result) {
        that.picsUploaded(error, result);
        console.log(result);
      });
  },

  picsUploaded: function(error, result) {
    if(error) {
      alert(error);
    } else {
      this.$(".uploaded-image").attr('src', result[0].url);
      this.$("[name='team[logo]']").val(result[0].url);
    }
  }



})
