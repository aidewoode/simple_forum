Backend::App.controllers :users, map: '/users' do
  get :show, map: ':id' do
    @user = User[params[:id]]
    halt 404 unless @user

    render 'users/show'
  end

  post :new, map: '' do
    @user = create_source :user
    halt 403 unless @user

    status 201
    render 'users/show'
  end

  patch :update, map: ':id' do
    user = User[params[:id]]
    halt 404 unless user
    halt 403 unless update_source user

    status 200
  end

  delete :destroy, map: ':id' do
    user = User[params[:id]]
    halt 404 unless user
    halt 403 unless user.destroy

    status 200
  end
end
