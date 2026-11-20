
from rest_framework import serializers

from .models import (
    Profile,
    Skill,
    Project,
    Experience,
    Education,
    Certification,
    ContactMessage,
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(
        source="get_category_display",
        read_only=True
    )

    class Meta:
        model = Skill
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    technologies = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "subject",
            "message",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Name cannot be empty."
            )

        return value

    def validate_subject(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Subject cannot be empty."
            )

        return value

    def validate_message(self, value):
        value = value.strip()

        if len(value) < 10:
            raise serializers.ValidationError(
                "Message must contain at least 10 characters."
            )

        return value
