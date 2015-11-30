# Helper methods defined here can be accessed in any controller or view in the application

module Backend
  class App
    module AuthHelper
      def generate_jwt(user)
        exp_time = Time.now.to_i + 24 * 3600
        @token = JWT.encode({ data: user.email, exp: exp_time }, ENV['AUTH_SECRET_KEY'], 'HS256')
      end
    end

    helpers AuthHelper
  end
end
