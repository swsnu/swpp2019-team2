# Generated by Django 2.2.6 on 2019-11-11 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lip', '0006_auto_20191108_1920'),
    ]

    operations = [
        migrations.AddField(
            model_name='lip',
            name='form',
            field=models.CharField(choices=[('M', 'Matte'), ('G', 'Glossy'), ('N', 'None')], default='N', max_length=1),
        ),
        migrations.AlterField(
            model_name='lipoption',
            name='color',
            field=models.CharField(choices=[('RD', 'Red'), ('PK', 'Pink'), ('OR', 'Orange')], max_length=2),
        ),
    ]
