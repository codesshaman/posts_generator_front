from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Fake migrate command for projects without a database."

    def handle(self, *args, **kwargs):
        self.stdout.write("Migrations are not applicable; database is disabled.")
