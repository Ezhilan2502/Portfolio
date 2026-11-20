from django.urls import path
from . import views
from .views import (
    ProfileView,
    SkillListView,
    ProjectListView,
    ExperienceListView,
    EducationListView,
    CertificationListView,
    ContactCreateView,
)
urlpatterns = [
    path('', views.home, name='portfolio-home'),
    path("profile/", ProfileView.as_view(), name="profile"),

    path("skills/", SkillListView.as_view(), name="skills"),

    path("projects/", ProjectListView.as_view(), name="projects"),

    path("experience/", ExperienceListView.as_view(), name="experience"),

    path("education/", EducationListView.as_view(), name="education"),

    path(
        "certifications/",
        CertificationListView.as_view(),
        name="certifications"
    ),

    path("contact/", ContactCreateView.as_view(), name="contact"),
]