Bokeh.Views.AddPhotoView = Backbone.CompositeView.extend({
  id: "add-photo-form",

  template: JST["photos/add_photo"],

  events: {
    "click .photo-submit" : "submit"
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    this.remove()
    event.preventDefault();
    var file = this.$("#input-photo-image")[0].files[0];
    debugger
    var formData = new FormData();
    formData.append("photo[image]", file);

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        that.collection.add(that.model);
        Backbone.history.navigate("/users/" + Bokeh.currentUser.id, { trigger: true });
      }
    });
  }
})
