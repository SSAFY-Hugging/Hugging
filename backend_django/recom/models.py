# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Counsel(models.Model):
    reservation_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    counselor = models.ForeignKey('Counselor', models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey('Member', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'counsel'


class Counselor(models.Model):
    available_time = models.CharField(max_length=255, blank=True, null=True)
    career = models.CharField(max_length=1000, blank=True, null=True)
    certificate = models.CharField(max_length=1000, blank=True, null=True)
    email = models.CharField(unique=True, max_length=255)
    explanation = models.CharField(max_length=1000, blank=True, null=True)
    gender = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    subject = models.CharField(max_length=255, blank=True, null=True)
    profile_image = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'counselor'

    def __str__(self):
        return str(self.id)


class CounselorReview(models.Model):
    content = models.CharField(max_length=255, blank=True, null=True)
    reg_date = models.DateTimeField(blank=True, null=True)
    score = models.IntegerField()
    counselor = models.ForeignKey(Counselor, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey('Member', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'counselor_review'


class FavoriteCounselor(models.Model):
    counselor = models.ForeignKey(Counselor, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey('Member', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'favorite_counselor'


class FavoriteMusic(models.Model):
    member = models.ForeignKey('Member', models.DO_NOTHING, blank=True, null=True)
    music = models.ForeignKey('Music', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'favorite_music'


class Member(models.Model):
    age = models.IntegerField(blank=True, null=True)
    email = models.CharField(unique=True, max_length=255)
    gender = models.CharField(max_length=255, blank=True, null=True)
    nickname = models.CharField(unique=True, max_length=255)
    profile_image = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member'

    def __str__(self):
        return str(self.id)


class MemberMentalCategory(models.Model):
    category = models.CharField(max_length=255, blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member_mental_category'


class Mission(models.Model):
    explanation = models.CharField(max_length=255, blank=True, null=True)
    mission_subject = models.CharField(max_length=255, blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mission'


class Music(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    hits = models.IntegerField(blank=True, null=True)
    thumbnail_url = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey('MusicCategory', models.DO_NOTHING, blank=True, null=True)
    music_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'music'

    def __str__(self):
        return str(self.id)


class MusicCategory(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'music_category'


class MusicReview(models.Model):
    score = models.IntegerField(blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    music = models.ForeignKey(Music, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'music_review'


class ProceedingMission(models.Model):
    create_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    misson = models.ForeignKey(Mission, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'proceeding_mission'


class PsychologicalTestCategory(models.Model):
    category = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'psychological_test_category'


class PsychologicalTestQuestion(models.Model):
    question = models.CharField(max_length=255)
    score = models.IntegerField()
    psychological_test_category = models.ForeignKey(PsychologicalTestCategory, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'psychological_test_question'


class PsychologicalTestResult(models.Model):
    score = models.IntegerField()
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    psychological_test_category = models.ForeignKey(PsychologicalTestCategory, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'psychological_test_result'
