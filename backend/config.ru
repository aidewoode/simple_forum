#!/usr/bin/env rackup
# encoding: utf-8

# This file can be used to start Padrino,
# just execute it from the command line.

require File.expand_path('../config/boot.rb', __FILE__)

run Padrino.application

use Rack::Cors do
  allow do
    origins 'localhost:4200' # Ember CLI
    resource '*', methods: [:get, :post, :patch, :delete]
  end
end
