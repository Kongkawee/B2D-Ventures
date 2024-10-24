from rest_framework.permissions import BasePermission


class IsInvestor(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'investor')
    