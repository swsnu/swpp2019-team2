# Generated by Django 2.2.6 on 2019-11-26 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ml', '0008_auto_20191126_1330'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ml',
            name='base',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='base.Base'),
        ),
    ]
