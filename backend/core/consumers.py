from channels.consumer import SyncConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class MyWorkerConsumer(SyncConsumer):
    def do_work(self, message):
        print("Doing background work:", message)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"message": "WebSocket connected"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data=None, bytes_data=None):
        try:
            data = json.loads(text_data)
            message = data.get("message", "")
            await self.send(text_data=json.dumps({
                "message": f"Echo: {message}"
            }))
        except Exception as e:
            await self.close(code=1011)