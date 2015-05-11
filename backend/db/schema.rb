# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150510120155) do

  create_table "comments", force: :cascade do |t|
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "post_id"
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id"
  add_index "comments", ["user_id"], name: "index_comments_on_user_id"

  create_table "notifications", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "comment_id"
    t.boolean  "read",                   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "user_name",  limit: 255
    t.boolean  "atwho",                  default: false
    t.string   "post_name",  limit: 255
  end

  add_index "notifications", ["comment_id"], name: "index_notifications_on_comment_id"
  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id"

  create_table "posts", force: :cascade do |t|
    t.string   "title",           limit: 255
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "tag",             limit: 255
    t.integer  "user_id"
    t.boolean  "essence",                     default: false
    t.boolean  "top",                         default: false
    t.datetime "last_reply_time"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id"

  create_table "session_tokens", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "access_token"
    t.datetime "expired_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.string   "email",           limit: 255
    t.string   "password_digest", limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                       default: false
    t.string   "city",            limit: 255
    t.text     "info"
    t.string   "avatar",          limit: 255
    t.string   "fake",            limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["name"], name: "index_users_on_name", unique: true

end
