set :stages,    "staging"

set :branch,    "dev"

set :deploy_to, "/home/<%= project_name %>/www/staging.<%= project_name %>.ch"

set :linked_dirs, %w{sites/all/themes/<%= project_name %>/build}
