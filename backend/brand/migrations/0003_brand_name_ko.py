# Generated by Django 2.2.6 on 2019-11-06 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brand', '0002_auto_20191102_1642'),
    ]

    operations = [
        migrations.AddField(
            model_name='brand',
            name='name_ko',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
    ]
