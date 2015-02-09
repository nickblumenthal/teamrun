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

ActiveRecord::Schema.define(version: 20150209054003) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.integer  "team_id",     null: false
    t.integer  "route_id"
    t.text     "description", null: false
    t.integer  "user_id",     null: false
    t.date     "date",        null: false
    t.time     "time",        null: false
    t.string   "location"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name",        null: false
  end

  add_index "events", ["date"], name: "index_events_on_date", using: :btree
  add_index "events", ["location"], name: "index_events_on_location", using: :btree
  add_index "events", ["name"], name: "index_events_on_name", using: :btree
  add_index "events", ["team_id"], name: "index_events_on_team_id", using: :btree
  add_index "events", ["time"], name: "index_events_on_time", using: :btree
  add_index "events", ["user_id"], name: "index_events_on_user_id", using: :btree

  create_table "memberships", force: :cascade do |t|
    t.integer  "team_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "memberships", ["team_id", "user_id"], name: "index_memberships_on_team_id_and_user_id", unique: true, using: :btree
  add_index "memberships", ["team_id"], name: "index_memberships_on_team_id", using: :btree
  add_index "memberships", ["user_id"], name: "index_memberships_on_user_id", using: :btree

  create_table "routes", force: :cascade do |t|
    t.string   "name",        null: false
    t.integer  "ua_id"
    t.integer  "user_id",     null: false
    t.text     "description"
    t.json     "data",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "routes", ["name"], name: "index_routes_on_name", using: :btree
  add_index "routes", ["ua_id"], name: "index_routes_on_ua_id", using: :btree
  add_index "routes", ["user_id"], name: "index_routes_on_user_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "captain_id",  null: false
    t.string   "logo"
  end

  add_index "teams", ["name"], name: "index_teams_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",         null: false
    t.string   "password_digest"
    t.string   "auth_provider",    null: false
    t.string   "email",            null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "session_token"
    t.string   "external_user_id"
    t.string   "auth_token"
    t.string   "refresh_token"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["external_user_id"], name: "index_users_on_external_user_id", using: :btree
  add_index "users", ["password_digest"], name: "index_users_on_password_digest", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
