# Generated by Django 2.2.6 on 2019-11-26 18:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lip', '0010_auto_20191121_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lipoption',
            name='color',
            field=models.CharField(choices=[('RD', 'Red'), ('PK', 'Pink'), ('OR', 'Orange'), ('PU', 'Purple')], max_length=2),
        ),
    ]
