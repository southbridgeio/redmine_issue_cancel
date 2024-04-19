require_dependency './plugins/redmine_issue_cancel/lib/redmine_close_button/hooks'

Rails.application.config.eager_load_paths += Dir.glob("#{Rails.application.config.root}/plugins/redmine_issue_cancel/{app/controllers}")

Redmine::Plugin.register :redmine_issue_cancel do
  name 'Redmine Cancel Issue Button Plugin'
  author 'Southbridge'
  description 'This plugins enables you to cancel issues quickly using the Cancel Issue button.'
  version '0.0.1'
  url 'https://github.com/southbridgeio/redmine_issue_cancel' if respond_to?(:url)
  author_url 'https://github.com/southbridgeio'
  requires_redmine :version_or_higher => '0.9.0'

  settings(default: {
            
           },partial: 'settings/issue_cancel')

  project_module :issue_cancel do
    permission :create_issue_cancel,  issue_cancel: :create
  end  
end

