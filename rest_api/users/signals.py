from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from .models import Profile


User = get_user_model()

# In a nutshell, when a user is saved,
# the user model sends a post_save signal
# to the receiver which performs a task.
# And the task is the create user profile function.

# The arguments inside the create user
# profile function are coming from the 
# post_save signal.

# The sender is the user model.
# The instance, is the instance of 
# the user model.

# The instance of the user is stored in 
# the seller variable.

# If a new user is created, create a new
# profile object for the newly created user.

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(seller=instance)



# When a new user is created, send a post_save
# signal to a receiver.
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()