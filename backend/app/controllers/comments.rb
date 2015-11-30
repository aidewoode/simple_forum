Backend::App.controllers :comments, map: '/comments' do
  get :show, map: ':id' do
    @comment = Comment[params[:id]]
    halt 404 unless @comment

    render 'comments/show'
  end

  post :new, map: '' do
    @comment = create_source :comment
    halt 403 unless @comment

    status 201
    render 'comments/show'
  end

  patch :update, map: ':id' do
    comment = Comment[params[:id]]
    halt 404 unless comment
    halt 403 unless update_source comment

    status 200
  end

  delete :destroy, map: ':id' do
    comment = Comment[params[:id]]
    halt 404 unless comment
    halt 403 unless comment.destroy

    status 200
  end
end
