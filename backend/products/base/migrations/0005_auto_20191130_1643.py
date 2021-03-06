# Generated by Django 2.2.6 on 2019-11-30 16:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_auto_20191129_0751'),
    ]

    operations = [
        migrations.AddField(
            model_name='base',
            name='product_url',
            field=models.CharField(default='//:0', max_length=255),
        ),
        migrations.AlterField(
            model_name='baseoption',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='color', to='base.Base'),
        ),
    ]
