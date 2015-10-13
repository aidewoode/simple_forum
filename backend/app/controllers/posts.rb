Backend::App.controllers :posts do
  get :index do
    @posts = Post.all
    render "posts/index"
  end

  get :show, map: "/posts/:id" do
    @post = Post[params[:id]]
    if @post
      render "posts/show"
    else
      halt 404
    end
  end

  post :new, map: "/posts" do
    @post = create_source :post
    if @post
      status 201
      render "posts/show"
    else
      halt 403
    end
  end

  patch :update, map: "/posts/:id" do
    post = Post[params[:id]]
    halt 404 unless post

    if update_source post
      status 200
    else
      halt 403
    end
  end

  delete :destroy, map: "/posts/:id" do
    post = Post[params[:id]]
    halt 404 unless post

    if post.destroy
      status 200
    else
      halt 403
    end
  end

end
