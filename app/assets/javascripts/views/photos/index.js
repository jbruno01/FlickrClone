Bokeh.Views.IndexPhotoView = Backbone.CompositeView.extend({
  template: JST["photos/index"],

  initialize: function(){
    this.addPhotos()
    this.listenTo(this.model.photos(), "add", this.addPhotoView);
    // this.listenTo(this.model.photos(), "sync", this.addPhotos);
    this.listenTo(this.model.photos(), "remove", this.removePhotoView)
  },

  events: {
    "click .new-photo" : "newPhoto",
  },

  addPhotoView: function (photo) {
    var subview = new Bokeh.Views.PhotoIndexItem({ model: photo });
    this.addSubview('.photo-index', subview);
    if(this.newPhotoView){
      this.removePhotoForm();
    };
  },

  removePhotoForm: function () {
    this.removeSubview(".add-photo-form", this.newPhotoView);
    var $button = $("<button></button>");
    $button.html("Delete");
    $button.addClass("new-photo");
    $(".add-photo-form").append($button);
  },

  addPhotos: function() {
    this.model.photos().forEach(function (pic) {
      var subView = new Bokeh.Views.PhotoIndexItem({ model: pic });
      this.addSubview(".photo-index", subView)
    }.bind(this))
  },

  removePhotoView: function (model) {
    this.removeModelSubview(".photo-index", model)
  },

  newPhoto: function(event) {
    event.preventDefault();
    $(".new-photo").remove();
    var newPhoto = new Bokeh.Models.Photo();
    this.newPhotoView = new Bokeh.Views.AddPhotoView({ model: newPhoto, collection: this.model.photos() })
    this.addSubview(".add-photo-form", this.newPhotoView)
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    this.attachSubviews()
    return this;
  }
})
