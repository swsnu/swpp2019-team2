# Generated by Django 2.2.6 on 2019-11-02 10:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cosmos', '0006_auto_20191102_1847'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lip',
            old_name='name',
            new_name='lip_name',
        ),
    ]
