set :application,     "<%= project_name %>"

# load custom recipes
load 'config/recipes.rb'

# Relative path to thedrupal path
set :app_path,        "drupal"
set :shared_children, ['drupal/sites/default/files','private-files']
set :shared_files,    ['drupal/sites/default/settings.php']
set :stages,          %w(staging production)

set :scm,            "git"
set :repository,     "git@github.com:<%= github_user %>/<%= project_name %>.git"

set :domain,         "<%= project_name %>-server.net"

set :user,           "<%= project_name %>"
set :group,          "<%= project_name %>"
set :runner_group,   "<%= project_name %>"

set :use_sudo,       false
default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :download_drush, true

role :app,           domain
role :db,            domain

set  :keep_releases,   3
after "deploy:update", "deploy:cleanup"

after "deploy:update_code", "styleguide:update"
after "deploy:update_code", "styleguide:build"
after "deploy:update_code", "styleguide:copy_build"

# Be more verbose by uncommenting the following line
#logger.level = Logger::MAX_LEVEL
