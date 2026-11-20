
from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    professional_title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    about = models.TextField(blank=True)

    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=150, blank=True)

    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    resume_url = models.URLField(blank=True)

    profile_image = models.ImageField(
        upload_to="profile/",
        blank=True,
        null=True
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name



class Skill(models.Model):

    CATEGORY_CHOICES = [
        ("machine_learning", "AI & Machine Learning"),
        ("programming", "Programming Language"),
        ("backend", "Backend Development"),
        ("database", "Databases"),
        ("nosql", "NoSQL Database"),
        ("frontend", "Frontend Development"),
        ("apis", "APIs & Authentication"),
        ("cloud", "Cloud"),
        ("api_testing", "API Testing"),
        ("version_control", "Version Control"),
        ("core_concepts", "Core Concepts"),
        ("tools", "Tools & Platforms"),  # Retained for existing records
    ]

    name = models.CharField(max_length=100)

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )

    description = models.CharField(max_length=250, blank=True)

    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "name"]
        unique_together = ("name", "category")

    def __str__(self):
        return f"{self.name} - {self.get_category_display()}"



class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100, blank=True)

    technologies = models.ManyToManyField(
        Skill,
        blank=True,
        related_name="projects"
    )

    github_url = models.URLField(blank=True)
    live_demo_url = models.URLField(blank=True)

    image = models.ImageField(
        upload_to="projects/",
        blank=True,
        null=True
    )

    featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title


class Experience(models.Model):
    role = models.CharField(max_length=150)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=150, blank=True)

    employment_type = models.CharField(
        max_length=100,
        blank=True
    )

    start_date = models.DateField()
    end_date = models.DateField(
        blank=True,
        null=True
    )

    currently_working = models.BooleanField(default=False)

    description = models.TextField(blank=True)
    responsibilities = models.TextField(blank=True)
    technologies = models.CharField(max_length=500, blank=True)

    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return f"{self.role} - {self.company}"


class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=150, blank=True)
    cgpa = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        null=True,
        blank=True
    )

    start_year = models.PositiveIntegerField(
        blank=True,
        null=True
    )
    end_year = models.PositiveIntegerField(
        blank=True,
        null=True
    )
    achievement = models.CharField(
    max_length=200,
    blank=True,
    default=""
)

    description = models.TextField(blank=True)

    class Meta:
        ordering = ["-end_year", "-start_year"]

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Certification(models.Model):
    name = models.CharField(max_length=200)
    provider = models.CharField(max_length=150, blank=True, default="")
    issue_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=200, blank=True, default="")
    credential_url = models.URLField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    is_completed = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-issue_date", "name"]

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=150)
    message = models.TextField()

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.subject}"
