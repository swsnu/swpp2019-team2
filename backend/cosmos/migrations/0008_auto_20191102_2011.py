# Generated by Django 2.2.6 on 2019-11-02 11:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cosmos', '0007_auto_20191102_1911'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lip',
            old_name='lip_name',
            new_name='name',
        ),
    ]
