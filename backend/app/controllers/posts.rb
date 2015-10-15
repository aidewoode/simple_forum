Backend::App.controllers :posts, map: '/posts' do
  get :index do
    @posts = Post.all
    render 'posts/index'
  end

  get :show, map: ':id' do
    @post = Post[params[:id]]
    halt 404 unless @post

    status 200
    render 'posts/show'
  end

  post :new, map: '' do
    @post = create_source :post
    halt 403 unless @post

    status 201
    render 'posts/show'
  end

  patch :update, map: ':id' do
    post = Post[params[:id]]
    halt 404 unless post
    halt 403 unless update_source post

    status 200
  end

  delete :destroy, map: ':id' do
    post = Post[params[:id]]
    halt 404 unless post
    halt 403 unless post.destroy

    status 200
  end
end
