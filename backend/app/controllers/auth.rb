Backend::App.controllers :auth do
  post :index do
    user = User.where('email = ?', params[:email]).first
    halt 404 unless user
    halt 401 unless user.authenticate(params[:password])
    generate_jwt user

    render 'auth/index'
  end
end
