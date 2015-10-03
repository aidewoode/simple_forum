import Ember from "ember";

export default Ember.Component.extend({
  selectContent: ["test1", "test2", "test3", "test4"],

  isCreateComment: false,
  hasError: false,

  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce("afterRender", this, this.afterRenderEvent);
  },

  afterRenderEvent: function() {
    var self = this;
    Ember.$("#editor").on("shown.bs.modal", function() {
      switch(self.get("createMode")) {
        case "createPost":
          self.set("isCreateComment", false);
          self.set("modalTitle", "Create your new post");
          self.set("buttonContent", "Create");
          self.set("buttonLoadContent", "Creating");
          self.set("tag", null);
          self.set("title", null);
          Ember.$("textarea.post-editor").val("");
          break;
        case "createComment":
          self.set("isCreateComment", true);
          self.set("modalTitle", "Create your new comment");
          self.set("buttonContent", "Create");
          self.set("buttonLoadContent", "Creating");
          var atWho = $(this).data("commentUser");
          var applicationController = self.get("applicationController");
          if (Ember.isEmpty(atWho)) {
            //reset editor's input
            Ember.$("textarea.comment-editor").val("");
          } else {
            Ember.$("textarea.comment-editor").val("@" + atWho + " ");
          }
          var atwhoUserId = [];
          var atwhoUserName = [];
          var atwhoItems = [];
          applicationController.get("postCommentsController.commentArray").forEach(function(item) {
            atwhoUserId.push(item.get("user_id"));
            atwhoUserName.push(item.get("commentUserName"));
          });

          atwhoUserId = atwhoUserId.uniq();
          atwhoUserName = atwhoUserName.uniq();


          for (var i = 0; i < atwhoUserId.length; i++) {
            atwhoItems.push({name: atwhoUserName[i], id: atwhoUserId[i] });
          }

          self.set("atwhoItems", atwhoItems);

          Ember.$("textarea.comment-editor").atwho({
            at: "@",
            data: atwhoItems
          });
          break;
        case "updatePost":
          self.set("isCreateComment", false);
          self.set("modalTitle", "Update your post");
          self.set("buttonContent", "Update");
          self.set("buttonLoadContent", "Updating");
          self.set("title",self.get("createItem").get("title"));
          self.set("tag", self.get("createItem").get("tag"));
          Ember.$("textarea.post-editor").val(self.get("createItem").get("body"));
          break;
      }

      // reset error message
      self.set("hasError", false);

    });
  },

  actions: {
    mdPreview: function() {
      var inputContent = Ember.$("textarea.editor").val();
      var position = inputContent.indexOf("@");
      var atwhoItems = Ember.$(".custom-editor form").data("atwhoItems");
      this.set("atwhoItems", atwhoItems);

      // replace atWho string to a link.
      while (position > -1 ) {
        var preChar = inputContent.charAt(position-1);
        if (preChar === "" || preChar === " "){
          var lastIndex = inputContent.indexOf(" ", position);
          var matchString = inputContent.slice(position+1, lastIndex);
          for (var i = 0; i < atwhoItems.length; i++) {
            if (matchString === atwhoItems[i]["name"]) {
              inputContent = inputContent.replace("@"+ matchString, "<a data-userid=\"" +
                                                   atwhoItems[i]["id"] +
                                                   "\"class=\"atwho\"href=\"/user/" +
                                                   atwhoItems[i]["id"] +
                                                   "/posts\">@<span>" +
                                                   matchString +
                                                   "</span></a>"
                                                 );
            }
          }
        }
        position = inputContent.indexOf("@", position + 1);
      }

      var outputContent = marked(inputContent);
      Ember.$("div.editor-preview").html(outputContent);
    },

    createResource: function() {
      this.send(this.get("createMode"));
    },

    createPost: function() {
      this.send("mdPreview");

      var applicationController = this.get("applicationController");
      var self = this;
      var btn = Ember.$("#createButton").button("loading");
      var post = applicationController.store.createRecord("post", {
        title: this.get("title") ,
        body: Ember.$("div.editor-preview").html(),
        tag: this.get("tag")
      });

     post.save().then(function(record) {
       btn.button("reset");
       Ember.$("#editor").modal("hide");
       applicationController.get("indexController.postArray").unshiftObject(record);
        // when the the number of posts is less than 10,
        // don't need to remove the last comment
        // to insure have current pagination for the backend.
        if (applicationController.get("indexController.postArray.length") > 10) {

          applicationController.get("indexController.postArray").popObject();

          //when the number of posts is 11 and the totalPages didn't change.
          //set the index's totalPages to 2, let the user can load next page.
          if (applicationController.get("indexController.totalPages") === 1) {
            applicationController.set("indexController.totalPages", 2);
          }
        }

     }, function(error) {
       post.deleteRecord();
       self.set("errorMessage", error.responseJSON.errors);
       self.set("hasError", true);
       btn.button("reset");
     });
    },

    // createComment action need improve.
    createComment: function() {

      //to be sure the div.editor-preview element
      //have content.
      this.send("mdPreview");

      var atwhoElements = document.querySelectorAll(".editor-preview a.atwho");

      var atwhoIds = [];

      for (var i = 0; i < atwhoElements.length; i++) {
        var id = atwhoElements[i].dataset.userid;
        atwhoIds.push(id);
      }
      var self = this;
      var applicationController = this.get("applicationController");
      var btn = Ember.$("#createButton").button("loading");
      var comment = applicationController.store.createRecord("comment", {
        body: Ember.$("div.editor-preview").html(),
        post: self.get("createItem"),
      });

      var data = {
        post: self.get("createItem").id,
        comment: {
          body: Ember.$("div.editor-preview").html()
        },
        atwhoList: atwhoIds.uniq()
      };

      Ember.$.post("/comments", data).then(function(response) {

        btn.button("reset");
        Ember.$("#editor").modal("hide");
        response.comment.created_at = comment.get("created_at");

        var commentObject = Ember.Object.create(response.comment);

        // have some problem here, need to fixed
        applicationController.get("postCommentsController.commentArray").unshiftObject(commentObject);


        //increase commentsCount's value
        applicationController.set("postController.model.commentsCount", self.get("controllers.post.model.commentsCount") + 1);

        // when a post's commentsCount less than 10,
        // don't need to remove the last comment
        // to insure have current pagination for the backend.
        if (applicationController.get("postController.model.commentsCount") > 10) {

          applicationController.get("postCommentsController.commentArray").popObject();

          //when a post's commentsCount is 11 and the totalPages didn't change.
          //set the comments's totalPages to 2, let the user can load next page.
          if (applicationController.get("postCommentsController.totalPages") === 1) {
            applicationController.set("postCommentsController.totalPages", 2);
          }
        }

        // because of didn't use save() to persist
        // the comment, so there will be have a useless
        // comment record , so have to delete it.
        comment.deleteRecord();

      },function(error) {
        comment.deleteRecord();
        self.set("errorMessage",error.responseJSON.errors );
        self.set("hasError", true);
        btn.button("reset");
      });
    },

    updatePost: function() {
      this.send("mdPreview");

      var self = this;
      var btn = Ember.$("#createButton").button("loading");

      var post = this.get("createItem");
      post.set("tag", this.get("tag"));
      post.set("title", this.get("title"));
      post.set("body", Ember.$("div.editor-preview").html());

      post.save().then(function(){
        btn.button("reset");
        Ember.$("#editor").modal("hide");
      },function(error){
        post.rollback();
        self.set("errorMessage", error.responseJSON.errors);
        self.set("hasError", true);
        btn.button("reset");
      } );
    }
  }
});
