from channels.consumer import SyncConsumer

class MyWorkerConsumer(SyncConsumer):
    def do_work(self, message):
        print("Doing background work:", message)
