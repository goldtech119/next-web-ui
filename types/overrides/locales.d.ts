type Commons = typeof import('../../locales/en/commons.json');
type Forms = typeof import('../../locales/en/form.json');
type Dashboard = typeof import('../../locales/en/dashboard.json');
type WelcomeModule = typeof import('../../locales/en/module_welcome.json');
type StarboardModule = typeof import('../../locales/en/module_starboard.json');
type Modules = typeof import('../../locales/en/modules.json');
type Categories = typeof import('../../locales/en/categories.json');
type AutoresponderModule =
  typeof import('../../locales/en/module_autoresponder.json');
type AutobanModule = typeof import('../../locales/en/module_autoban.json');
type AutoRolesModule = typeof import('../../locales/en/module_autoroles.json');
type AutomessageModule =
  typeof import('../../locales/en/module_automessage.json');
type AutoDeleteModule = typeof import('../../locales/en/module_autodelete.json');
type AnnouncementsModule =
  typeof import('../../locales/en/module_announcements.json');

type Messages = {
  commons: Commons;
  form: Forms;
  dashboard: Dashboard;
  module_welcome: WelcomeModule;
  module_starboard: StarboardModule;
  module_autoroles: AutoRolesModule;
  module_autoresponder: AutoresponderModule;
  module_automessage: AutomessageModule;
  modules: Modules;
  categories: Categories;
  module_manage: ManageModule;
  module_autodelete: AutoDeleteModule;
  module_announcements: AnnouncementsModule;
  module_autoban: AutobanModule;
};

declare interface IntlMessages extends Messages {}
