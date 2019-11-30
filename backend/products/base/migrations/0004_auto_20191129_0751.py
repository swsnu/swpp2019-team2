# Generated by Django 2.2.6 on 2019-11-29 07:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20191116_1921'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseoption',
            name='color',
            field=models.CharField(choices=[('LT', 'under 21'), ('MD', '21'), ('DK', '23 and over'), (None, None)], default=None, max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='baseoption',
            name='sub_color',
            field=models.CharField(choices=[('WM', 'Warm Tone'), ('NT', 'Neutral Tone'), ('CL', 'Cool Tone'), (None, None)], default=None, max_length=2, null=True),
        ),
    ]