# Generated by Django 2.2.6 on 2019-11-26 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ml', '0016_auto_20191126_1350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ml',
            name='base',
            field=models.CharField(default='NONE', max_length=100),
        ),
    ]