set :styleguide_repository,     "git@github.com:<%= github_user %>/<%= styleguide_name %>.git"

# Require to have on the server
# - node + npm
# - bower
namespace :styleguide do
  desc "install styleguide"
  task :install do
    run "cd #{shared_path} && git clone #{styleguide_repository} styleguide"
  end

  desc "update styleguide"
  task :update do
    run "cd #{shared_path}/styleguide && git pull"
  end

  desc "build styleguide"
  task :build do
    run "cd #{shared_path}/styleguide && npm install --silent"
    run "cd #{shared_path}/styleguide && bower install"
    run "cd #{shared_path}/styleguide && ./node_modules/.bin/gulp production"
  end

  desc "copy assets into drupal"
  task :copy_build do
    # this is our usual path on our server. Edit at your will.
    run "cp -r #{shared_path}/styleguide/build #{latest_release}/drupal/sites/all/themes/<%= theme_name %>/build"
  end
end