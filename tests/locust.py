import time
from locust import HttpUser, task

class QuickstartUser(HttpUser):
    @task
    def on_start(self):
        self.client.get("/")