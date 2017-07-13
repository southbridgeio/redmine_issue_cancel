require 'redmine'

require_dependency 'redmine_close_button/hooks'

Redmine::Plugin.register :redmine_issue_cancel do
  name 'Redmine Cancel Issue Button Plugin'
  author 'Southbridge'
  description 'This plugins enables you to cancel issues quickly using the Cancel Issue button.'
  version '0.0.1'
  url 'https://github.com/centosadmin/redmine_issue_cancel' if respond_to?(:url)
  author_url 'https://github.com/centosadmin'
  requires_redmine :version_or_higher => '0.9.0'

  settings(default: {
            
           },partial: 'settings/issue_cancel')

  project_module :issue_cancel do
    permission :create_issue_cancel,  issue_cancel: :create
  end  
end

