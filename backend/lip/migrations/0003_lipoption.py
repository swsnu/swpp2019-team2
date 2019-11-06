# Generated by Django 2.2.6 on 2019-11-01 13:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lip', '0002_auto_20191101_1303'),
    ]

    operations = [
        migrations.CreateModel(
            name='LipOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(choices=[('RD', 'Red'), ('CR', 'Coral'), ('PK', 'Pink'), ('OR', 'Orange')], max_length=2)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lip.Lip')),
            ],
        ),
    ]
