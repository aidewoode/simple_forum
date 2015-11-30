Sequel::Model.plugin(:schema)
Sequel::Model.plugin(:timestamps, update_on_create: true)
Sequel::Model.raise_on_save_failure = false # Do not throw exceptions on failure
Sequel::Model.db = case Padrino.env
                   when :development
                     Sequel.connect('postgres:///simple_forum_backend_development', loggers: [logger])
                   when :production
                     Sequel.connect(ENV['DATABASE_URL'], loggers: [logger])
                   when :test
                     Sequel.connect('postgres:///simple_forum_backend_test', loggers: [logger])
                   end
