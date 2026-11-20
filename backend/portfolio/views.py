from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle


@api_view(['GET'])
def home(request):
    return Response({
        "success": True,
        "message": "Welcome to Ezhilan Portfolio API",
        "developer": "Ezhilan",
        "backend": "Django REST Framework",
        "database": "SQLite",
        "status": "Running"
    })


from .models import (
    Profile,
    Skill,
    Project,
    Experience,
    Education,
    Certification,
)

from .serializers import (
    ProfileSerializer,
    SkillSerializer,
    ProjectSerializer,
    ExperienceSerializer,
    EducationSerializer,
    CertificationSerializer,
    ContactMessageSerializer,
)


# PROFILE API
class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        profile = Profile.objects.first()

        if not profile:
            return Response(
                {"message": "Profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProfileSerializer(
            profile,
            context={"request": request}
        )

        return Response(serializer.data)


# SKILLS API
class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]


# PROJECTS API
class ProjectListView(generics.ListAPIView):
    queryset = (
        Project.objects
        .filter(featured=True)
        .prefetch_related("technologies")
    )
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]


# EXPERIENCE API
class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]


# EDUCATION API
class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [AllowAny]


# CERTIFICATIONS API
class CertificationListView(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [AllowAny]


# CONTACT API
class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]
