# Helper methods defined here can be accessed in any controller or view in the application

module Backend
  class App
    module AuthHelper
      def generate_jwt(user)
        @token = JWT.encode({data: user.email}, ENV['AUTH_SECRET_KEY'], 'HS256')
      end
    end

    helpers AuthHelper
  end
end
