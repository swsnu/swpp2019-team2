# Generated by Django 2.2.6 on 2019-11-26 13:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20191116_1921'),
        ('ml', '0005_auto_20191123_1907'),
    ]

    operations = [
        migrations.AddField(
            model_name='ml',
            name='base',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.Base'),
        ),
    ]
