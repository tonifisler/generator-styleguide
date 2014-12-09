set :stages,    "staging"

set :branch,    "dev"

# This is our usual setup. Edit at your will.
set :deploy_to, "/home/<%= project_name %>/www/staging.<%= project_name %>"
