
from django.contrib import admin

from .models import (
    Profile,
    Skill,
    Project,
    Experience,
    Education,
    Certification,
    ContactMessage,
)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "professional_title", "email")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "display_order")
    list_filter = ("category",)
    search_fields = ("name",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "featured", "display_order")
    list_filter = ("featured", "category")
    search_fields = ("title", "description")
    filter_horizontal = ("technologies",)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        "role",
        "company",
        "start_date",
        "end_date",
        "currently_working",
    )
    list_filter = ("currently_working",)
    search_fields = ("role", "company")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "start_year", "end_year")
    search_fields = ("degree", "institution")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("name", "provider", "is_completed")
    list_filter = ("is_completed",)
    search_fields = ("name", "provider")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject")
    readonly_fields = ("created_at",)
