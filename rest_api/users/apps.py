from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'


    # we need to register the signals we just created 
    def ready(self):
        import users.signals